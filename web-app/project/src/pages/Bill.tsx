import React, { useState } from "react";
import axios from "axios";

const QrValidator: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [validationResult, setValidationResult] = useState<any>(null);
  const [error, setError] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post("http://127.0.0.1:5000/validate_qr", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      setValidationResult(response.data);
      setError("");
    } catch (err) {
      setError("Error processing QR code. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">QR Code Repair Bill Validator</h1>
      <input type="file" onChange={handleFileChange} className="mb-4" />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        Upload & Validate
      </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {validationResult && (
        <div className="mt-6 p-4 bg-white shadow-md rounded-lg">
          <h2 className={`text-lg font-semibold ${validationResult.status === "Valid" ? "text-green-600" : "text-red-600"}`}>
            {validationResult.status === "Valid" ? "✅ Repair Bill is VALID" : "❌ FRAUD DETECTED"}
          </h2>
          {validationResult.details && (
            <pre className="bg-gray-200 p-2 rounded mt-4">
              {JSON.stringify(validationResult.details, null, 2)}
            </pre>
          )}
          {validationResult.message && (
            <p className="text-red-500 mt-2">{validationResult.message}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default QrValidator;
