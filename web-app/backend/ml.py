from flask import Flask, request, jsonify
from flask_cors import CORS
import nbformat
import subprocess
import json

app = Flask(__name__)
CORS(app)  # Allow frontend to access backend

@app.route("/")
def home():
    return jsonify({"message": "Flask backend is running!"})

@app.route("/run-notebook", methods=["POST"])
def run_notebook():
    """Executes the Jupyter notebook and returns the output."""
    notebook_path = r"C:\Users\govag\AppData\Local\Microsoft\Windows\INetCache\IE\UBWX2HDO\everything[1].ipynb"

    try:
        # Run the Jupyter notebook as a script
        output = subprocess.run(["jupyter", "nbconvert", "--to", "json", "--execute", notebook_path],
                                capture_output=True, text=True)

        if output.returncode == 0:
            return jsonify({"status": "success", "output": output.stdout})
        else:
            return jsonify({"status": "error", "error": output.stderr})

    except Exception as e:
        return jsonify({"status": "error", "error": str(e)})

if __name__ == "__main__":
    app.run(debug=True, port=5000)
