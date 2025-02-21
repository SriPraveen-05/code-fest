import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, AlertCircle, MessageSquare } from 'lucide-react';
import { Button } from '../components/ui/button';

const ClaimReview = () => {
  const navigate = useNavigate();
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [comment, setComment] = useState('');

  const damageDetails = {
    severity: 75,
    estimatedCost: 1500,
    areas: ['Front bumper', 'Hood'],
    image: 'https://images.unsplash.com/photo-1540844537564-8e6e9e37f531?auto=format&fit=crop&q=80&w=1000',
  };

  const handleSubmitRequest = () => {
    // Placeholder for API request
    console.log('Re-evaluation requested with comment:', comment);
    navigate('/dashboard');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Damage Assessment</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <img
                src={damageDetails.image}
                alt="Car damage"
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Damage Severity</h3>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${damageDetails.severity}%` }}
                    transition={{ duration: 1 }}
                    className="bg-blue-600 h-2.5 rounded-full"
                  />
                </div>
                <p className="mt-1 text-sm text-gray-600">{damageDetails.severity}% damage detected</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Affected Areas</h3>
                <ul className="space-y-1">
                  {damageDetails.areas.map((area) => (
                    <li key={area} className="flex items-center text-gray-700">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      {area}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Estimated Cost</h3>
                <p className="text-3xl font-bold text-gray-900">
                  ${damageDetails.estimatedCost.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          {!showCommentForm ? (
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button onClick={() => navigate('/dashboard')} className="flex-1">
                <CheckCircle className="h-5 w-5 mr-2" />
                Accept Estimate
              </Button>
              <Button variant="outline" onClick={() => setShowCommentForm(true)} className="flex-1">
                <AlertCircle className="h-5 w-5 mr-2" />
                Request Re-evaluation
              </Button>
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8 space-y-4">
              <div>
                <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                  Please explain why you're requesting a re-evaluation
                </label>
                <textarea
                  id="comment"
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter your concerns here..."
                />
              </div>
              <div className="flex gap-4">
                <Button onClick={handleSubmitRequest} className="flex-1">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Submit Request
                </Button>
                <Button variant="outline" onClick={() => setShowCommentForm(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ClaimReview;