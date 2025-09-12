import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';

const SignUp = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('farmer');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await authAPI.register({ fullName, email, password, role });
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      setSuccess('Sign up successful! Redirecting to login-page...');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-[80vh] px-6 py-12">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-brand-green mb-6">Create Your Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-brand-green"
            required
          />
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Your Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-brand-green"
              required
            >
              <option value="farmer">Farmer</option>
              <option value="wholesaler">Wholesaler</option>
            </select>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}
          <button type="submit" className="btn btn-primary w-full">Sign Up</button>
        </form>
        <p className="text-sm text-center mt-4 text-gray-600">
          Already have an account?
          <a href="/login" className="text-brand-orange font-medium hover:underline">Sign In</a>
        </p>
      </div>
    </main>
  );
};

export default SignUp;
