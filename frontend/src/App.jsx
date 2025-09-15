import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import SignUp from './components/SignUp.jsx';
import BrowseFarm from './components/BrowseFarm.jsx';
import FarmDetails from './components/FarmDetails.jsx';
import FreshProduct from './components/FreshProduct.jsx';
import Subscription from './components/Subscription.jsx';
import Cart from './components/Cart.jsx';
import OrderHistory from './components/OrderHistory.jsx';
import Dashboard from './components/Dashboard.jsx';
import FarmerDashboard from './components/FarmerDashboard.jsx';
import WholesalerDashboard from './components/WholesalerDashboard.jsx';
import Chatbot from './components/Chatbot.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/browse-farm" element={<ProtectedRoute allowedRoles={['wholesaler', 'farmer', 'customer']}><BrowseFarm /></ProtectedRoute>} />
        <Route path="/farm-details/:farmId" element={<ProtectedRoute allowedRoles={['wholesaler', 'farmer', 'customer']}><FarmDetails /></ProtectedRoute>} />
        <Route path="/fresh-product" element={<ProtectedRoute allowedRoles={['wholesaler', 'farmer', 'customer']}><FreshProduct /></ProtectedRoute>} />
        <Route path="/subscription" element={<ProtectedRoute allowedRoles={['wholesaler', 'farmer', 'customer']}><Subscription /></ProtectedRoute>} />
        <Route path="/cart" element={<ProtectedRoute allowedRoles={['wholesaler', 'farmer', 'customer']}><Cart /></ProtectedRoute>} />
        <Route path="/order-history" element={<ProtectedRoute allowedRoles={['wholesaler', 'farmer', 'customer']}><OrderHistory /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute allowedRoles={['wholesaler', 'farmer', 'customer']}><Dashboard /></ProtectedRoute>} />
        <Route path="/farmer-dashboard" element={<ProtectedRoute allowedRoles={['farmer']}><FarmerDashboard /></ProtectedRoute>} />
        <Route path="/wholesaler-dashboard" element={<ProtectedRoute allowedRoles={['wholesaler']}><WholesalerDashboard /></ProtectedRoute>} />
      </Routes>
      <Chatbot />
    </>
  );
};

export default App;
