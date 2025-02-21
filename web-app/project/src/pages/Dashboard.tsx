import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Clock, CheckCircle, XCircle } from 'lucide-react';
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
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-500" />;
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
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">My Claims</h1>
        <Button
          onClick={() => navigate('/upload')}
          className="flex items-center space-x-2"
        >
          <PlusCircle className="h-5 w-5" />
          <span>New Claim</span>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {claims.map((claim) => (
          <motion.div
            key={claim.id}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
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
              >
                View Details
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Dashboard;