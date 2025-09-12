import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('farmFreshCart')) || [];
      const count = cart.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(count);
    };
    updateCartCount();
    const interval = setInterval(updateCartCount, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === loginEmail && u.password === loginPassword);
    if (user) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userName', user.fullName);
      setShowLoginModal(false);
      navigate('/dashboard');
    } else {
      setLoginError('Invalid email or password.');
    }
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    setSignUpSuccess('');
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const existingUser = users.find(user => user.email === signUpEmail);
    if (existingUser) {
      setSignUpError('An account with this email already exists.');
      return;
    }
    users.push({ fullName: signUpFullName, email: signUpEmail, password: signUpPassword });
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userName', signUpFullName);
    setSignUpSuccess('Sign up successful! Redirecting to dashboard...');
    setTimeout(() => {
      setShowSignUpModal(false);
      navigate('/dashboard');
    }, 1500);
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
            <Link to="/browse-farm" className="nav-link font-medium">Browse Farm</Link>
            <Link to="/fresh-product" className="nav-link font-medium">Fresh Products</Link>
            <Link to="/subscription" className="nav-link font-medium">Subscriptions</Link>
            <Link to="/farmer-dashboard" className="nav-link font-medium">For Farmers</Link>
            <Link to="/cart" className="nav-link font-medium">Cart ({cartCount})</Link>
          </div>
          <div className="flex items-center space-x-4">
            <a href="https://www.google.com/maps/place/Chitkara University,+Rajpura,+Patiala,+Punjab,+India" target="_blank" rel="noopener noreferrer" className="hidden md:flex items-center space-x-1 nav-link">
              <i className="fas fa-map-marker-alt"></i>
              <span>Punjab, PB</span>
            </a>
            <button onClick={() => setShowLoginModal(true)} className="nav-link">
              <i className="fas fa-user"></i>
              <span className="hidden lg:inline ml-2">Sign In</span>
            </button>
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
            <Link to="/browse-farm" className="block nav-link font-medium" onClick={() => setMobileMenuOpen(false)}>Browse Farm</Link>
            <Link to="/fresh-product" className="block nav-link font-medium" onClick={() => setMobileMenuOpen(false)}>Fresh Products</Link>
            <Link to="/subscription" className="block nav-link font-medium" onClick={() => setMobileMenuOpen(false)}>Subscriptions</Link>
            <Link to="/farmer-dashboard" className="block nav-link font-medium" onClick={() => setMobileMenuOpen(false)}>For Farmers</Link>
            <Link to="/cart" className="block nav-link font-medium" onClick={() => setMobileMenuOpen(false)}>Cart</Link>
            <button onClick={() => {setMobileMenuOpen(false); setShowLoginModal(true);}} className="block nav-link font-medium">Sign In</button>
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
