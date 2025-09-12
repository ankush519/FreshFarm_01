const API_BASE_URL = 'http://localhost:5000/api';

// Helper function to get auth token
const getAuthToken = () => localStorage.getItem('token');

// Helper function to make authenticated requests
const authFetch = async (url, options = {}) => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
  });
};

// Auth API using localStorage
export const authAPI = {
  register: async (userData) => {
    const users = JSON.parse(localStorage.getItem('farmUsers') || '[]');
    const existingUser = users.find(u => u.email === userData.email);
    if (existingUser) {
      throw new Error('User already exists');
    }
    const newUser = {
      ...userData,
      _id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    localStorage.setItem('farmUsers', JSON.stringify(users));
    localStorage.setItem('token', 'local-' + newUser._id);
    localStorage.setItem('user', JSON.stringify(newUser));
    return { token: 'local-' + newUser._id, user: newUser };
  },

  login: async (credentials) => {
    const users = JSON.parse(localStorage.getItem('farmUsers') || '[]');
    const user = users.find(u => u.email === credentials.email && u.password === credentials.password);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    localStorage.setItem('token', 'local-' + user._id);
    localStorage.setItem('user', JSON.stringify(user));
    return { token: 'local-' + user._id, user };
  },
};

// Products API using localStorage
export const productsAPI = {
  getAll: async () => {
    const products = JSON.parse(localStorage.getItem('farmProducts') || '[]');
    return products;
  },

  create: async (productData) => {
    const products = JSON.parse(localStorage.getItem('farmProducts') || '[]');
    const newProduct = { ...productData, _id: Date.now().toString(), createdAt: new Date().toISOString() };
    products.push(newProduct);
    localStorage.setItem('farmProducts', JSON.stringify(products));
    return newProduct;
  },

  update: async (id, productData) => {
    const products = JSON.parse(localStorage.getItem('farmProducts') || '[]');
    const index = products.findIndex(p => p._id === id);
    if (index !== -1) {
      products[index] = { ...products[index], ...productData };
      localStorage.setItem('farmProducts', JSON.stringify(products));
      return products[index];
    }
    throw new Error('Product not found');
  },

  delete: async (id) => {
    const products = JSON.parse(localStorage.getItem('farmProducts') || '[]');
    const filteredProducts = products.filter(p => p._id !== id);
    localStorage.setItem('farmProducts', JSON.stringify(filteredProducts));
    return { message: 'Product deleted' };
  },
};
