import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import SignUp from './components/SignUp.jsx';
import BrowseFarm from './components/BrowseFarm.jsx';
import FreshProduct from './components/FreshProduct.jsx';
import Subscription from './components/Subscription.jsx';
import Cart from './components/Cart.jsx';
import Dashboard from './components/Dashboard.jsx';
import FarmerDashboard from './components/FarmerDashboard.jsx';

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/browse-farm" element={<BrowseFarm />} />
        <Route path="/fresh-product" element={<FreshProduct />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
      </Routes>
    </>
  );
};

export default App;
