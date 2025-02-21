import os
import cv2
import numpy as np
import easyocr
import random
from flask import Flask, request, jsonify
from flask_cors import CORS
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

# Function to send email alert
def send_email_alert(plate_number, recipient_email):
    sender_email = "harikukh8@gmail.com"  # Replace with your email
    sender_password = "hbgt stbo fvux lvxg"  # Use App Password instead of the actual password
    subject = f"Vehicle Number Plate Detected: {plate_number}"

    body = f"""
    Alert! Your vehicle with number plate {plate_number} has been detected.

    If this was not you, please check immediately.

    Regards,
    Number Plate Recognition System
    """

    msg = MIMEMultipart()
    msg["From"] = sender_email
    msg["To"] = recipient_email
    msg["Subject"] = subject
    msg.attach(MIMEText(body, "plain"))

    try:
        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.starttls()
        server.login(sender_email, sender_password)
        server.send_message(msg)
        server.quit()
        print(f"📩 Email sent successfully to {recipient_email}!")
    except Exception as e:
        print("❌ Failed to send email:", str(e))

# Function to extract number plate from an image
def extract_number_plate(image_path):
    img = cv2.imread(image_path)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    bfilter = cv2.bilateralFilter(gray, 11, 17, 17)
    edged = cv2.Canny(bfilter, 30, 200)

    contours, _ = cv2.findContours(edged, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
    contours = sorted(contours, key=cv2.contourArea, reverse=True)[:10]

    location = None
    for contour in contours:
        approx = cv2.approxPolyDP(contour, 10, True)
        if len(approx) == 4:
            location = approx
            break

    if location is None:
        return None, None

    mask = np.zeros(gray.shape, np.uint8)
    cv2.drawContours(mask, [location], 0, 255, -1)
    new_image = cv2.bitwise_and(img, img, mask=mask)

    (x, y) = np.where(mask == 255)
    (x1, y1) = (np.min(x), np.min(y))
    (x2, y2) = (np.max(x), np.max(y))
    cropped_image = gray[x1:x2+1, y1:y2+1]

    reader = easyocr.Reader(["en"])
    result = reader.readtext(cropped_image)

    if not result:
        return None, None

    plate_text = result[0][-2]
    return plate_text, cropped_image

# Function to generate dummy insurance details
def generate_insurance_details(plate_number):
    return {
        "plate_number": plate_number,
        "policy_number": f"INS-{random.randint(100000, 999999)}",
        "owner": f"John Doe {random.randint(10, 99)}",
        "vehicle_model": "Unknown",
        "valid_until": f"{random.randint(2025, 2030)}-12-31"
    }

@app.route("/upload", methods=["POST"])
def upload():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    file_path = os.path.join(app.config["UPLOAD_FOLDER"], file.filename)
    file.save(file_path)

    plate_number, cropped_img = extract_number_plate(file_path)

    if plate_number:
        insurance_info = generate_insurance_details(plate_number)
        send_email_alert(plate_number, "recipient@example.com")  # Replace with the actual email
        return jsonify({"status": "Valid", "plate_number": plate_number, "insurance_details": insurance_info})

    return jsonify({"status": "Fraud", "message": "Number plate not recognized"}), 400

if __name__ == "__main__":
    app.run(debug=True)
