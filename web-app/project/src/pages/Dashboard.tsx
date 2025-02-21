import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  PlusCircle,
  Clock,
  CheckCircle,
  XCircle,
  HelpCircle,
  ShieldCheck,
  FileText,
} from 'lucide-react';
import { Button } from '../components/ui/button';

const claims = [
  {
    id: 1,
    date: '2024-03-10',
    status: 'pending',
    description: 'Front bumper damage',
    amount: 1200,
  },
  {
    id: 2,
    date: '2024-03-05',
    status: 'approved',
    description: 'Side mirror replacement',
    amount: 300,
  },
  {
    id: 3,
    date: '2024-03-01',
    status: 'rejected',
    description: 'Windshield crack',
    amount: 500,
  },
];

const Dashboard = () => {
  const navigate = useNavigate();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-6 w-6 text-yellow-500" />;
      case 'approved':
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-6 w-6 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      {/* Welcome Section */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-8 shadow-lg mb-8 overflow-hidden"
      >
        <div className="flex items-center space-x-4 mb-4">
          <ShieldCheck className="h-12 w-12 text-blue-600 animate-pulse" />
          <h2 className="text-3xl font-bold text-gray-900">Welcome to Your Automated Vehicle Insurance Portal</h2>
        </div>
        <p className="text-gray-700 mb-4">
          Our state-of-the-art automated insurance system simplifies your vehicle insurance experience. With AI-driven assessments, secure document handling, and real-time updates, we ensure transparency and efficiency.
        </p>
        
      </motion.div>

      <div className="flex justify-between items-center mb-8">
        <motion.h1
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl font-bold text-gray-900"
        >
          My Claims
        </motion.h1>
        <Button
          onClick={() => navigate('/upload')}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white"
        >
          <PlusCircle className="h-5 w-5" />
          <span>New Claim</span>
        </Button>
        <Button
          onClick={() => navigate('/Bill')}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white"
        >
          <PlusCircle className="h-1 w-5" />
          <span>Claim by bill</span>
        </Button>
        <Button
          onClick={() => navigate('/Ocr')}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white"
        >
          <PlusCircle className="h-2 w-3" />
          <span>Vehicle NUmber finder</span>
        </Button>
      </div>

      {/* Claims Grid */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {claims.map((claim) => (
          <motion.div
            key={claim.id}
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: { opacity: 1, scale: 1 },
            }}
            whileHover={{ scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="bg-white rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 bg-gradient-to-l from-transparent to-white h-20 w-20 -mr-8 -mt-8 rotate-45 transform"></div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm text-gray-500">{claim.date}</p>
                <h3 className="text-lg font-semibold text-gray-900 mt-1">
                  {claim.description}
                </h3>
              </div>
              {getStatusIcon(claim.status)}
            </div>
            <div className="flex justify-between items-center">
              <p className="text-2xl font-bold text-gray-900">
                ${claim.amount.toLocaleString()}
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/claim-review')}
                className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
              >
                View Details
              </Button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Support Section */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-8 bg-gradient-to-r from-purple-50 to-purple-100 rounded-2xl p-8 shadow-lg overflow-hidden"
      >
        <div className="flex items-center space-x-4 mb-4">
          <HelpCircle className="h-12 w-12 text-purple-600 animate-bounce" />
          <h2 className="text-3xl font-bold text-gray-900">Need Assistance or Have Questions?</h2>
        </div>
        <p className="text-gray-700 mb-4">
          Our customer support team is available 24/7 to assist you with any queries or concerns. Whether you need help with filing a claim, understanding your policy, or resolving an issue, we're here to help.
        </p>
        <div className="flex space-x-4">
          <Button
            variant="outline"
            className="border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white"
          >
            <FileText className="h-5 w-5 mr-2" />
            Visit FAQ
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white">
            Contact Us
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;