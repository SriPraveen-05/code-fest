import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Camera, Upload, RefreshCw, Loader } from "lucide-react";
import { Button } from "../components/ui/button";
import Webcam from "react-webcam";
import axios from "axios";

const ImageUpload: React.FC = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"upload" | "capture" | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const webcamRef = useRef<Webcam>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCapture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setImage(imageSrc);
    }
  };

  const handleRetake = () => {
    setImage(null);
    setUploadSuccess(false);
  };

  const handleSubmit = async () => {
    if (!image) return;
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", dataURItoBlob(image), "damage-photo.jpg");

      const response = await axios.post("http://127.0.0.1:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.status === "success") {
        setUploadSuccess(true);
        setTimeout(() => navigate("/claim-review"), 1000);
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  // Convert Base64 Image to Blob
  function dataURItoBlob(dataURI: string) {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }
    return new Blob([arrayBuffer], { type: mimeString });
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Upload Damage Photos
        </h2>

        {!mode && !image && (
          <div className="grid gap-4 sm:grid-cols-2">
            <Button
              onClick={() => setMode("upload")}
              variant="outline"
              className="h-40 flex flex-col items-center justify-center space-y-2"
            >
              <Upload className="h-8 w-8" />
              <span>Upload from Gallery</span>
            </Button>
            <Button
              onClick={() => setMode("capture")}
              variant="outline"
              className="h-40 flex flex-col items-center justify-center space-y-2"
            >
              <Camera className="h-8 w-8" />
              <span>Capture with Camera</span>
            </Button>
          </div>
        )}

        {mode === "upload" && !image && (
          <div className="flex items-center justify-center h-96 border-2 border-dashed border-gray-300 rounded-lg">
            <label className="cursor-pointer">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
              />
              <div className="text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-1 text-sm text-gray-600">
                  Click to upload or drag and drop
                </p>
              </div>
            </label>
          </div>
        )}

        {mode === "capture" && !image && (
          <div className="relative h-96">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="w-full h-full object-cover rounded-lg"
            />
            <Button
              onClick={handleCapture}
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
            >
              <Camera className="h-5 w-5 mr-2" />
              Capture Photo
            </Button>
          </div>
        )}

        {image && (
          <div className="space-y-4">
            <div className="relative h-96">
              <img
                src={image}
                alt="Captured damage"
                className="w-full h-full object-cover rounded-lg"
              />
              <Button
                onClick={handleRetake}
                variant="outline"
                className="absolute bottom-4 right-4"
              >
                <RefreshCw className="h-5 w-5 mr-2" />
                Retake
              </Button>
            </div>
            <Button onClick={handleSubmit} className="w-full" disabled={uploading}>
              {uploading ? <Loader className="h-5 w-5 animate-spin mr-2" /> : "Continue with this photo"}
            </Button>
            {uploadSuccess && (
              <p className="text-green-600 text-center">Image uploaded successfully!</p>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ImageUpload;
