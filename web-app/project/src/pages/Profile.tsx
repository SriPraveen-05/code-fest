import { motion } from 'framer-motion';
import { UserCircle, Edit, ShieldCheck, LogOut } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate();
  const user = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, Cityville, USA',
    policyNumber: 'POL-123456789',
    joinedDate: '2023-01-15',
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      {/* Header Section */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-8 shadow-lg mb-8 overflow-hidden"
      >
        <div className="flex items-center space-x-4">
          <UserCircle className="h-16 w-16 text-blue-600 animate-pulse" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
            <p className="text-gray-700">Policy Holder</p>
          </div>
        </div>
      </motion.div>

      {/* Profile Details Section */}
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
        {/* Personal Information */}
        <motion.div
          variants={{
            hidden: { opacity: 0, scale: 0.9 },
            visible: { opacity: 1, scale: 1 },
          }}
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 bg-gradient-to-l from-transparent to-white h-20 w-20 -mr-8 -mt-8 rotate-45 transform"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <UserCircle className="h-6 w-6 text-blue-600" />
            <span>Personal Information</span>
          </h2>
          <p className="text-gray-700">
            <strong>Email:</strong> {user.email}
          </p>
          <p className="text-gray-700">
            <strong>Phone:</strong> {user.phone}
          </p>
          <p className="text-gray-700">
            <strong>Address:</strong> {user.address}
          </p>
        </motion.div>

        {/* Policy Information */}
        <motion.div
          variants={{
            hidden: { opacity: 0, scale: 0.9 },
            visible: { opacity: 1, scale: 1 },
          }}
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 bg-gradient-to-l from-transparent to-white h-20 w-20 -mr-8 -mt-8 rotate-45 transform"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <ShieldCheck className="h-6 w-6 text-green-600" />
            <span>Policy Information</span>
          </h2>
          <p className="text-gray-700">
            <strong>Policy Number:</strong> {user.policyNumber}
          </p>
          <p className="text-gray-700">
            <strong>Joined Date:</strong> {user.joinedDate}
          </p>
        </motion.div>

        {/* Actions Section */}
        <motion.div
          variants={{
            hidden: { opacity: 0, scale: 0.9 },
            visible: { opacity: 1, scale: 1 },
          }}
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 bg-gradient-to-l from-transparent to-white h-20 w-20 -mr-8 -mt-8 rotate-45 transform"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <Edit className="h-6 w-6 text-purple-600" />
            <span>Actions</span>
          </h2>
          <Button
            variant="outline"
            className="w-full mb-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
          >
            Edit Profile
          </Button>
          <Button
          onClick={() => navigate('/login')}
            variant="destructive"
            className="w-full bg-red-600 hover:bg-red-700 text-white"
          >
            <LogOut className="h-5 w-5 mr-2" />
            Logout
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Profile;