import json
import cv2
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
from pyzbar.pyzbar import decode

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend access

# ✅ Expected repair bill details
expected_details = {
    "Invoice Number": "12345",
    "Date": "2025-02-20",
    "Shop Name": "XYZ Car Service & Repairs",
    "Total Cost": "₹ 15,000"
}

# Function to scan and extract QR code data
def scan_qr_code(image_path):
    img = cv2.imread(image_path)
    detected_qr = decode(img)

    if not detected_qr:
        return None, "No QR code found in the image."

    qr_data = detected_qr[0].data.decode("utf-8")

    try:
        extracted_details = json.loads(qr_data)
        return extracted_details, None
    except json.JSONDecodeError:
        return None, "QR code contains invalid data."

# Function to validate the repair bill
def validate_repair_bill(image_path):
    extracted_data, error = scan_qr_code(image_path)

    if extracted_data is None:
        return {"status": "Fraud", "message": error}

    # Compare extracted data with expected data
    if extracted_data == expected_details:
        return {"status": "Valid", "details": extracted_data}
    else:
        return {"status": "Fraud", "message": "Repair bill details do not match!"}

# ✅ API endpoint to handle QR code validation
@app.route("/validate_qr", methods=["POST"])
def validate_qr():
    if "file" not in request.files:
        return jsonify({"status": "Error", "message": "No file uploaded"}), 400

    file = request.files["file"]
    file_path = f"uploads/{file.filename}"
    file.save(file_path)

    result = validate_repair_bill(file_path)
    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)
