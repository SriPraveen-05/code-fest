"use client"

import React, { useState } from "react"
import axios from "axios"
import { motion } from "framer-motion"
import { Upload, FileText, AlertCircle, Check } from 'lucide-react'

const Ocr: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [plateNumber, setPlateNumber] = useState<string>("")
  const [insuranceDetails, setInsuranceDetails] = useState<any>(null)
  const [error, setError] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0])
      setError("")
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select a file to upload.")
      return
    }

    setIsLoading(true)
    const formData = new FormData()
    formData.append("file", selectedFile)

    try {
      const response = await axios.post("http://127.0.0.1:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      })

      if (response.data.status === "Valid") {
        setPlateNumber(response.data.plate_number)
        setInsuranceDetails(response.data.insurance_details)
        setError("")
      } else {
        setError(response.data.message)
      }
    } catch (err) {
      setError("Error uploading file. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center p-6 bg-gradient-to-b from-blue-100 to-white min-h-screen">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-8 text-blue-800"
      >
        Number Plate Recognition
      </motion.h1>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white rounded-lg shadow-lg p-6"
      >
        <label 
          htmlFor="file-upload"
          className="flex flex-col items-center justify-center w-full h-32 border-2 border-blue-300 border-dashed rounded-lg cursor-pointer bg-blue-50 hover:bg-blue-100 transition duration-300 ease-in-out"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-10 h-10 mb-3 text-blue-500" />
            <p className="mb-2 text-sm text-blue-500">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-blue-400">
              PNG, JPG or JPEG (MAX. 800x400px)
            </p>
          </div>
          <input 
            id="file-upload" 
            type="file" 
            className="hidden" 
            onChange={handleFileChange}
            accept="image/png, image/jpeg, image/jpg"
          />
        </label>
        
        {selectedFile && (
          <p className="mt-2 text-sm text-blue-600">
            <FileText className="inline-block mr-2" size={16} />
            {selectedFile.name}
          </p>
        )}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleUpload}
          disabled={isLoading || !selectedFile}
          className={`w-full mt-4 px-4 py-2 rounded-lg text-white font-semibold transition duration-300 ease-in-out ${
            isLoading || !selectedFile 
              ? 'bg-blue-300 cursor-not-allowed' 
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {isLoading ? 'Processing...' : 'Upload & Process'}
        </motion.button>

        {error && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center mt-4 text-red-500"
          >
            <AlertCircle className="mr-2" size={16} />
            {error}
          </motion.p>
        )}
      </motion.div>

      {plateNumber && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden"
        >
          <div className="bg-blue-500 text-white p-4">
            <h2 className="text-xl font-semibold flex items-center">
              <Check className="mr-2" size={20} />
              Extracted Plate: {plateNumber}
            </h2>
          </div>
          {insuranceDetails && (
            <div className="p-4">
              <h3 className="font-semibold text-blue-800 mb-2">Insurance Details:</h3>
              <pre className="bg-gray-100 p-3 rounded-lg text-sm overflow-x-auto">
                {JSON.stringify(insuranceDetails, null, 2)}
              </pre>
            </div>
          )}
        </motion.div>
      )}
    </div>
  )
}

export default Ocr
