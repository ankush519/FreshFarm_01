import { Routes, Route } from 'react-router-dom';
import Header from './Header.jsx';
import BrowseFarm from './BrowseFarm.jsx';
import OrderHistory from './OrderHistory.jsx';
import FarmerDashboard from './FarmerDashboard.jsx';
import Chatbot from './Chatbot.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';

const FarmerInterface = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<FarmerDashboard />} />
        <Route path="/browse-farm" element={<ProtectedRoute allowedRoles={['farmer']}><BrowseFarm /></ProtectedRoute>} />
        <Route path="/order-history" element={<ProtectedRoute allowedRoles={['farmer']}><OrderHistory /></ProtectedRoute>} />
        <Route path="/farmer-dashboard" element={<ProtectedRoute allowedRoles={['farmer']}><FarmerDashboard /></ProtectedRoute>} />
      </Routes>
      <Chatbot />
    </>
  );
};

export default FarmerInterface;
