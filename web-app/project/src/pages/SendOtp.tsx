import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, Mail } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';

const VerifyOTP = () => {
    const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP.');
      return;
    }

    // Simulate OTP verification
    setError('');
    setIsVerified(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50"
    >
      {/* Card Container */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md overflow-hidden relative"
      >
        {/* Decorative Gradient Overlay */}
        <div className="absolute top-0 right-0 bg-gradient-to-l from-transparent to-white h-24 w-24 -mr-8 -mt-8 rotate-45 transform"></div>

        {/* Header Section */}
        <div className="flex items-center space-x-4 mb-6">
          <Mail className="h-10 w-10 text-blue-600 animate-pulse" />
          <h1 className="text-2xl font-bold text-gray-900">Verify OTP</h1>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-red-100 text-red-700 px-4 py-2 rounded-md flex items-center space-x-2 mb-4"
          >
            <AlertCircle className="h-5 w-5" />
            <p>{error}</p>
          </motion.div>
        )}

        {/* Success Message */}
        {isVerified && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-green-100 text-green-700 px-4 py-2 rounded-md flex items-center space-x-2 mb-4"
          >
            <CheckCircle className="h-5 w-5" />
            <p>OTP verified successfully! You can now proceed.</p>
          </motion.div>
        )}

        {/* Form */}
        {!isVerified && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
                Enter OTP
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter 6-digit OTP"
                  maxLength={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <Button
            onClick={() => navigate('/')}
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300"
            >
              Verify OTP
            </Button>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
};

export default VerifyOTP;