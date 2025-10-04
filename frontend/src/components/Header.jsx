import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cartAPI } from '../services/api.js';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [signUpFullName, setSignUpFullName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpError, setSignUpError] = useState('');
  const [signUpSuccess, setSignUpSuccess] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    setUser(storedUser);
  }, []);

  useEffect(() => {
    const updateCartCount = async () => {
      try {
        const cartData = await cartAPI.getCart();
        const count = cartData.items ? cartData.items.length : 0;
        setCartCount(count);
      } catch (error) {
        console.error('Failed to fetch cart count:', error);
        setCartCount(0);
      }
    };
    updateCartCount();
    const interval = setInterval(updateCartCount, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');

    try {
      const { authAPI } = await import('../services/api');
      const data = await authAPI.login({ email: loginEmail, password: loginPassword });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setShowLoginModal(false);
      navigate('/dashboard');
    } catch (error) {
      setLoginError(error.message);
    }
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    setSignUpError('');
    setSignUpSuccess('');

    try {
      const { authAPI } = await import('../services/api');
      const data = await authAPI.register({
        fullName: signUpFullName,
        email: signUpEmail,
        password: signUpPassword,
        role: 'farmer' // Default role
      });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setSignUpSuccess('Sign up successful! Redirecting to dashboard...');
      setTimeout(() => {
        setShowSignUpModal(false);
        navigate('/dashboard');
      }, 1500);
    } catch (error) {
      setSignUpError(error.message);
    }
  };

  return (
    <>
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 nav-link">
            <i className="fas fa-leaf text-2xl text-brand-green"></i>
            <span className="text-2xl font-bold text-brand-green">FarmFresh</span>
          </Link>
          <div className="sm:flex items-center space-x-8">
            {localStorage.getItem('token') ? (
              user.role === 'farmer' ? (
                <>
                  <Link to="/order-history" className="nav-link font-medium">Order History</Link>
                  <Link to="/browse-farm" className="nav-link font-medium">Browse Farm</Link>
                  <Link to="/farmer-dashboard" className="nav-link font-medium">Farmer Dashboard</Link>
                </>
              ) : user.role === 'wholesaler' ? (
                <>
                  <Link to="/order-history" className="nav-link font-medium">Order History</Link>
                  <Link to="/browse-farm" className="nav-link font-medium">Browse Farm</Link>
                  <Link to="/fresh-product" className="nav-link font-medium">Fresh Product</Link>
                  <Link to="/subscription" className="nav-link font-medium">Subscriptions</Link>
                  <Link to="/cart" className="nav-link font-medium">Cart ({cartCount})</Link>
                  <Link to="/wholesaler-dashboard" className="nav-link font-medium">Wholesaler Dashboard</Link>
                </>
              ) : (
                <>
                  <Link to="/browse-farm" className="nav-link font-medium">Browse Farm</Link>
                  <Link to="/fresh-product" className="nav-link font-medium">Fresh Products</Link>
                  <Link to="/subscription" className="nav-link font-medium">Subscriptions</Link>
                  <Link to="/order-history" className="nav-link font-medium">Order History</Link>
                  <Link to="/farmer-dashboard" className="nav-link font-medium">For Farmers</Link>
                  <Link to="/wholesaler-dashboard" className="nav-link font-medium">For Wholesalers</Link>
                  <Link to="/cart" className="nav-link font-medium">Cart ({cartCount})</Link>
                </>
              )
            ) : (
              <>
                <Link to="/browse-farm" className="nav-link font-medium">Browse Farm</Link>
                <Link to="/fresh-product" className="nav-link font-medium">Fresh Products</Link>
                <Link to="/subscription" className="nav-link font-medium">Subscriptions</Link>
                <Link to="/order-history" className="nav-link font-medium">Order History</Link>
                <Link to="/farmer-dashboard" className="nav-link font-medium">For Farmers</Link>
                <Link to="/wholesaler-dashboard" className="nav-link font-medium">For Wholesalers</Link>
                <Link to="/cart" className="nav-link font-medium">Cart ({cartCount})</Link>
              </>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <a href="https://www.google.com/maps/place/Chitkara University,+Rajpura,+Patiala,+Punjab,+India" target="_blank" rel="noopener noreferrer" className="hidden md:flex items-center space-x-1 nav-link">
              <i className="fas fa-map-marker-alt"></i>
              <span>Punjab, PB</span>
            </a>
          {localStorage.getItem('token') ? (
            <>
              <button onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.reload();
              }} className="nav-link flex items-center space-x-2">
                <i className="fas fa-sign-out-alt"></i>
                <span className="hidden lg:inline ml-2">Logout</span>
              </button>
            </>
          ) : (
            <button onClick={() => setShowLoginModal(true)} className="nav-link">
              <i className="fas fa-user"></i>
              <span className="hidden lg:inline ml-2">Sign In</span>
            </button>
          )}
          <Link to="/cart" className="nav-link relative">
            <i className="fas fa-shopping-cart"></i>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-brand-orange text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          <Link to="/farmer-dashboard" className="hidden sm:inline-block btn btn-primary text-sm px-4 py-2">Join as Farmer</Link>
          <button id="mobile-menu-button" onClick={toggleMobileMenu} className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-green">
            <i className="fas fa-bars text-xl"></i>
          </button>
          </div>
        </nav>
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div id="mobile-menu" className="md:hidden px-6 pb-4 space-y-2">
            {localStorage.getItem('token') ? (
              user.role === 'farmer' ? (
                <>
                  <Link to="/order-history" className="block nav-link font-medium" onClick={() => setMobileMenuOpen(false)}>Order History</Link>
                  <Link to="/browse-farm" className="block nav-link font-medium" onClick={() => setMobileMenuOpen(false)}>Browse Farm</Link>
                  <Link to="/farmer-dashboard" className="block nav-link font-medium" onClick={() => setMobileMenuOpen(false)}>Farmer Dashboard</Link>
                </>
              ) : user.role === 'wholesaler' ? (
                <>
                  <Link to="/order-history" className="block nav-link font-medium" onClick={() => setMobileMenuOpen(false)}>Order History</Link>
                  <Link to="/browse-farm" className="block nav-link font-medium" onClick={() => setMobileMenuOpen(false)}>Browse Farm</Link>
                  <Link to="/fresh-product" className="block nav-link font-medium" onClick={() => setMobileMenuOpen(false)}>Fresh Product</Link>
                  <Link to="/subscription" className="block nav-link font-medium" onClick={() => setMobileMenuOpen(false)}>Subscriptions</Link>
                  <Link to="/cart" className="block nav-link font-medium" onClick={() => setMobileMenuOpen(false)}>Cart</Link>
                  <Link to="/wholesaler-dashboard" className="block nav-link font-medium" onClick={() => setMobileMenuOpen(false)}>Wholesaler Dashboard</Link>
                </>
              ) : (
                <>
                  <Link to="/browse-farm" className="block nav-link font-medium" onClick={() => setMobileMenuOpen(false)}>Browse Farm</Link>
                  <Link to="/fresh-product" className="block nav-link font-medium" onClick={() => setMobileMenuOpen(false)}>Fresh Products</Link>
                  <Link to="/subscription" className="block nav-link font-medium" onClick={() => setMobileMenuOpen(false)}>Subscriptions</Link>
                  <Link to="/order-history" className="block nav-link font-medium" onClick={() => setMobileMenuOpen(false)}>Order History</Link>
                  <Link to="/farmer-dashboard" className="block nav-link font-medium" onClick={() => setMobileMenuOpen(false)}>For Farmers</Link>
                  <Link to="/cart" className="block nav-link font-medium" onClick={() => setMobileMenuOpen(false)}>Cart</Link>
                </>
              )
            ) : (
              <>
                <Link to="/browse-farm" className="block nav-link font-medium" onClick={() => setMobileMenuOpen(false)}>Browse Farm</Link>
                <Link to="/fresh-product" className="block nav-link font-medium" onClick={() => setMobileMenuOpen(false)}>Fresh Products</Link>
                <Link to="/subscription" className="block nav-link font-medium" onClick={() => setMobileMenuOpen(false)}>Subscriptions</Link>
                <Link to="/order-history" className="block nav-link font-medium" onClick={() => setMobileMenuOpen(false)}>Order History</Link>
                <Link to="/farmer-dashboard" className="block nav-link font-medium" onClick={() => setMobileMenuOpen(false)}>For Farmers</Link>
                <Link to="/cart" className="block nav-link font-medium" onClick={() => setMobileMenuOpen(false)}>Cart</Link>
              </>
            )}
            {localStorage.getItem('token') ? (
              <button onClick={() => {
                setMobileMenuOpen(false);
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.reload();
              }} className="block nav-link font-medium">Logout</button>
            ) : (
              <button onClick={() => {setMobileMenuOpen(false); setShowLoginModal(true);}} className="block nav-link font-medium">Sign In</button>
            )}
            <Link to="/farmer-dashboard" className="block sm:hidden btn btn-primary mt-2" onClick={() => setMobileMenuOpen(false)}>Join as Farmer</Link>
          </div>
        )}
      </header>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center" onClick={() => setShowLoginModal(false)}>
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-bold text-center text-brand-green mb-6">Login to Your Account</h2>
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <input
                type="email"
                placeholder="Email Address"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-brand-green"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-brand-green"
                required
              />
              {loginError && <p className="text-red-500 text-sm">{loginError}</p>}
              <button type="submit" className="btn btn-primary w-full">Login</button>
            </form>
            <p className="text-sm text-center mt-4 text-gray-600">
              Don't have an account?
              <button onClick={() => {setShowLoginModal(false); setShowSignUpModal(true);}} className="text-brand-orange font-medium hover:underline">Sign Up</button>
            </p>
          </div>
        </div>
      )}

      {/* Sign Up Modal */}
      {showSignUpModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center" onClick={() => setShowSignUpModal(false)}>
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-bold text-center text-brand-green mb-6">Create Your Account</h2>
            <form onSubmit={handleSignUpSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={signUpFullName}
                onChange={(e) => setSignUpFullName(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-brand-green"
                required
              />
              <input
                type="email"
                placeholder="Email Address"
                value={signUpEmail}
                onChange={(e) => setSignUpEmail(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-brand-green"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={signUpPassword}
                onChange={(e) => setSignUpPassword(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-brand-green"
                required
              />
              {signUpError && <p className="text-red-500 text-sm">{signUpError}</p>}
              {signUpSuccess && <p className="text-green-500 text-sm">{signUpSuccess}</p>}
              <button type="submit" className="btn btn-primary w-full">Sign Up</button>
            </form>
            <p className="text-sm text-center mt-4 text-gray-600">
              Already have an account?
              <button onClick={() => {setShowSignUpModal(false); setShowLoginModal(true);}} className="text-brand-orange font-medium hover:underline">Sign In</button>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
