import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await authAPI.login({ email, password });
      if (response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        // Open new tab based on user role
        const role = response.user.role;
        if (role === 'farmer') {
          window.open('/farmer-dashboard', '_blank');
        } else if (role === 'wholesaler') {
          window.open('/wholesaler-dashboard', '_blank');
        }
        navigate('/dashboard');
      } else {
        setError(response.message || 'Invalid email or password.');
      }
    } catch (error) {
      setError('Login failed. Please try again.');
    }
  };

  return (
    <main className="flex items-center justify-center min-h-[80vh] px-6 py-12">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-brand-green mb-6">Login to Your Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-brand-green"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-brand-green"
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" className="btn btn-primary w-full">Login</button>
        </form>
        <p className="text-sm text-center mt-4 text-gray-600">
          Don't have an account?
          <Link to="/sign-up" className="text-brand-orange font-medium hover:underline">Sign Up</Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
