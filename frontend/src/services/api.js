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

// Auth API
export const authAPI = {
  register: async (userData) => {
    const response = await authFetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Registration failed');
    }
    const data = await response.json();
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    return data;
  },

  login: async (credentials) => {
    const response = await authFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }
    const data = await response.json();
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    return data;
  },
};

// Products API
export const productsAPI = {
  getAll: async () => {
    const response = await authFetch('/products');
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return await response.json();
  },

  create: async (productData) => {
    const response = await authFetch('/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create product');
    }
    return await response.json();
  },

  update: async (id, productData) => {
    const response = await authFetch(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update product');
    }
    return await response.json();
  },

  delete: async (id) => {
    const response = await authFetch(`/products/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to delete product');
    }
    return await response.json();
  },
};

// Cart API
export const cartAPI = {
  getCart: async () => {
    const response = await authFetch('/cart');
    if (!response.ok) {
      throw new Error('Failed to fetch cart');
    }
    return await response.json();
  },

  addItem: async (productId, quantity) => {
    const response = await authFetch('/cart/add', {
      method: 'POST',
      body: JSON.stringify({ productId, quantity }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to add item to cart');
    }
    return await response.json();
  },

  updateItem: async (productId, quantity) => {
    const response = await authFetch(`/cart/update/${productId}`, {
      method: 'PUT',
      body: JSON.stringify({ quantity }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update item');
    }
    return await response.json();
  },

  removeItem: async (productId) => {
    const response = await authFetch(`/cart/remove/${productId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to remove item');
    }
    return await response.json();
  },

  clearCart: async () => {
    const response = await authFetch('/cart/clear', {
      method: 'DELETE',
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to clear cart');
    }
    return await response.json();
  },
};

// Orders API
export const ordersAPI = {
  getOrders: async () => {
    const response = await authFetch('/orders');
    if (!response.ok) {
      throw new Error('Failed to fetch orders');
    }
    return await response.json();
  },

  createOrder: async (orderData) => {
    const response = await authFetch('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create order');
    }
    return await response.json();
  },
};

// OTP API
export const otpAPI = {
  sendOtp: async (gmail) => {
    const response = await authFetch('/otp/send', {
      method: 'POST',
      body: JSON.stringify({ gmail }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to send OTP');
    }
    return await response.json();
  },

  verifyOtp: async (gmail, otp) => {
    const response = await authFetch('/otp/verify', {
      method: 'POST',
      body: JSON.stringify({ gmail, otp }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to verify OTP');
    }
    return await response.json();
  },
};
