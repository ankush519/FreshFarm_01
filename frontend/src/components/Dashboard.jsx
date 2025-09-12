import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      const user = JSON.parse(userData);
      setUserName(user.fullName);
      setUserRole(user.role);
    } else {
      // If not logged in, redirect to login
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/sign-up');
  };

  return (
    <main className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-brand-green">Welcome, {userName}!</h1>
      <p className="mt-2 text-lg text-gray-500">Role: {userRole}</p>
      <p className="mt-4 text-lg text-gray-600">Welcome to your FarmFresh dashboard. Here you can manage your orders, subscriptions, and profile.</p>
      <button onClick={handleLogout} className="btn btn-secondary mt-8">Logout</button>
    </main>
  );
};

export default Dashboard;
