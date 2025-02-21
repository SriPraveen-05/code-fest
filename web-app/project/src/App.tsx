import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ImageUpload from "./pages/ImageUpload";
import ClaimReview from "./pages/ClaimReview";
import Profile from "./pages/Profile";
import ForgotPass from "./pages/ForgotPass";
import SendOtp from "./pages/SendOTp";
import Bill from "./pages/Bill";
import Ocr from "./pages/Ocr";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/upload" element={<ImageUpload />} />
            <Route path="/claim-review" element={<ClaimReview />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/ForgotPass" element={<ForgotPass />} />
            <Route path="/SendOtp" element={<SendOtp />} />
            <Route path="/Ocr" element={<Ocr />} />
            <Route path="/Bill" element={<Bill/>} />
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;
