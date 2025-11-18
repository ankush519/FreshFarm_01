import React, { useState, useRef, useEffect } from 'react';
import { productsAPI } from '../services/api';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your FarmFresh AI assistant. I can help you find prices for vegetables and fruits, and answer questions about our fresh produce. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [products, setProducts] = useState([]);
  const [lastFetch, setLastFetch] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Fetch products on component mount and set up polling
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productsAPI.getAll();
        setProducts(data);
        setLastFetch(new Date());
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();

    // Set up polling every 5 minutes for realtime updates
    const interval = setInterval(fetchProducts, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const projectKnowledge = {
    overview: "FarmFresh is a farm-to-consumer marketplace platform connecting local farmers directly with wholesalers and consumers. The platform allows farmers to list their fresh produce and manage their inventory, while buyers can browse products, place orders, and manage subscriptions.",

    frontend: {
      tech: "React with Vite, Tailwind CSS, React Router, Axios for API calls",
      components: [
        "App.jsx - Main application component with routing",
        "Header.jsx - Navigation with login/signup modals and cart count",
        "Home.jsx - Landing page with hero section and stats",
        "Login.jsx - Authentication login form",
        "SignUp.jsx - User registration form with role selection",
        "Dashboard.jsx - General user dashboard",
        "FarmerDashboard.jsx - Product management for farmers with tabs (products, orders, farms, analytics)",
        "WholesalerDashboard.jsx - Wholesale operations dashboard",
        "FreshProduct.jsx - Product browsing with category filters and cart functionality",
        "Cart.jsx - Shopping cart management with quantity updates and checkout",
        "OrderHistory.jsx - Display user's past orders",
        "BrowseFarm.jsx - Farm browsing interface",
        "FarmDetails.jsx - Individual farm details page",
        "Subscription.jsx - Subscription management (placeholder)",
        "ProtectedRoute.jsx - Route protection based on user roles",
        "Chatbot.jsx - AI assistant for project information"
      ],
      features: [
        "JWT-based authentication with localStorage token management",
        "Role-based access control (farmer, wholesaler, customer)",
        "Product CRUD operations for farmers",
        "Shopping cart with backend integration",
        "Order placement and history tracking",
        "Responsive design with Tailwind CSS",
        "Real-time cart count updates",
        "Modal-based login/signup forms"
      ],
      dependencies: [
        "react: ^18.2.0",
        "react-dom: ^18.2.0",
        "react-router-dom: ^6.8.0",
        "axios: ^1.6.0"
      ]
    },

    backend: {
      tech: "Node.js, Express, MongoDB with Mongoose, JWT authentication, bcryptjs for password hashing",
      models: [
        "User - fullName, email, passwordHash, role (farmer/wholesaler), timestamps",
        "Product - name, description, price, category (vegetables/fruits/dairy/meat/grains), imageUrl, farmer (ref User), stock, timestamps",
        "Cart - user (ref User, unique), items (product ref, quantity)",
        "Order - user (ref User), items (product, name, price, quantity, image), total, status (confirmed/shipped/delivered/cancelled), timestamps"
      ],
      routes: [
        "Auth (/api/auth): POST /register, POST /login",
        "Products (/api/products): GET / (all products), GET /:id (single product), POST / (create, farmer only), PUT /:id (update, farmer only), DELETE /:id (delete, farmer only)",
        "Cart (/api/cart): GET / (user's cart), POST /add (add item), PUT /update/:productId (update quantity), DELETE /remove/:productId (remove item), DELETE /clear (clear cart)",
        "Orders (/api/orders): GET / (user's orders), POST / (create order)"
      ],
      middleware: [
        "JWT authentication middleware (auth.js)",
        "CORS enabled",
        "Express JSON parser"
      ],
      dependencies: [
        "express: ^4.18.2",
        "mongoose: ^7.5.0",
        "bcryptjs: ^2.4.3",
        "jsonwebtoken: ^9.0.2",
        "cors: ^2.8.5",
        "dotenv: ^16.3.1"
      ]
    },

    currentStatus: "Frontend fully integrated with backend APIs. Cart and order management implemented. Authentication working with JWT tokens. Farmer dashboard has product management. Wholesaler dashboard functional. All major features connected.",

    todos: [
      "Set up MongoDB (local or cloud) and create .env file with MONGODB_URI, JWT_SECRET, PORT",
      "Run backend server with 'npm run dev' and test all endpoints with Postman",
      "Test authentication flow and role-based access",
      "Test product CRUD operations for farmers",
      "Test cart and order functionality end-to-end",
      "Add subscription management system",
      "Add user profile management routes",
      "Implement farm browsing and details pages",
      "Add analytics and reporting features",
      "Add notification system for orders",
      "Implement payment gateway integration",
      "Add image upload functionality for products"
    ],

    apiEndpoints: {
      baseUrl: "http://localhost:5000/api",
      auth: {
        register: "POST /api/auth/register",
        login: "POST /api/auth/login"
      },
      products: {
        getAll: "GET /api/products",
        getById: "GET /api/products/:id",
        create: "POST /api/products",
        update: "PUT /api/products/:id",
        delete: "DELETE /api/products/:id"
      },
      cart: {
        getCart: "GET /api/cart",
        addItem: "POST /api/cart/add",
        updateItem: "PUT /api/cart/update/:productId",
        removeItem: "DELETE /api/cart/remove/:productId",
        clearCart: "DELETE /api/cart/clear"
      },
      orders: {
        getOrders: "GET /api/orders",
        createOrder: "POST /api/orders"
      }
    },

    database: {
      name: "FarmFresh",
      collections: ["users", "products", "carts", "orders"],
      connection: "MongoDB with Mongoose ODM"
    },

    deployment: {
      frontend: "Vite build for production",
      backend: "Node.js server with Express",
      database: "MongoDB Atlas or local MongoDB instance"
    }
  };

  const generateResponse = (userMessage) => {
    const message = userMessage.toLowerCase();

    // Price queries
    if (message.includes('price') || message.includes("price of") || message.includes('cost') || message.includes('how much')) {
      const productMatches = findProductsByQuery(userMessage);
      if (productMatches.length > 0) {
        let response = "Here are the current prices:\n";
        productMatches.forEach(product => {
          response += `• ${product.name}: $${product.price.toFixed(2)} (${product.category})\n`;
        });
        return response.trim();
      } else {
        return "I couldn't find any products matching your query. Try asking about specific vegetables or fruits like 'tomatoes' or 'apples'.";
      }
    }

    // Category queries
    if (message.includes('vegetable') || message.includes('fruit')) {
      const category = message.includes('vegetable') ? 'vegetables' : 'fruits';
      const categoryProducts = products.filter(p => p.category === category);
      if (categoryProducts.length > 0) {
        let response = `Available ${category}:\n`;
        categoryProducts.forEach(product => {
          response += `• ${product.name}: ₹${product.price.toFixed(2)}\n`;
        });
        return response.trim();
      } else {
        return `No ${category} are currently available.`;
      }
    }

    // Specific product queries
    const productMatches = findProductsByQuery(userMessage);
    if (productMatches.length > 0) {
      let response = "I found these products:\n";
      productMatches.forEach(product => {
        response += `• ${product.name}: ₹${product.price.toFixed(2)} (${product.category})\n`;
      });
      return response.trim();
    }

    // Project knowledge queries
    if (message.includes('what is') || message.includes('overview') || message.includes('about')) {
      return projectKnowledge.overview;
    }

    if (message.includes('frontend') || message.includes('react') || message.includes('component')) {
      if (message.includes('tech') || message.includes('technology')) {
        return `Frontend uses: ${projectKnowledge.frontend.tech}`;
      }
      if (message.includes('component') || message.includes('page')) {
        return `Main components: ${projectKnowledge.frontend.components.join(', ')}`;
      }
      return `Frontend features: ${projectKnowledge.frontend.features.join(', ')}`;
    }

    if (message.includes('backend') || message.includes('api') || message.includes('server')) {
      if (message.includes('tech') || message.includes('technology')) {
        return `Backend uses: ${projectKnowledge.backend.tech}`;
      }
      if (message.includes('model') || message.includes('database')) {
        return `Database models: ${projectKnowledge.backend.models.join(', ')}`;
      }
      if (message.includes('route') || message.includes('endpoint')) {
        return `API routes: ${projectKnowledge.backend.routes.join(', ')}`;
      }
      return `Backend includes: ${projectKnowledge.backend.middleware}`;
    }

    if (message.includes('status') || message.includes('current') || message.includes('progress')) {
      return projectKnowledge.currentStatus;
    }

    if (message.includes('todo') || message.includes('task') || message.includes('next')) {
      return `Current TODOs: ${projectKnowledge.todos.join(', ')}`;
    }

    if (message.includes('help') || message.includes('can you') || message.includes('what can')) {
      return "I can help you find prices for vegetables and fruits, show you available products, and answer questions about the FarmFresh project!";
    }

    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return "Hello! How can I help you with FarmFresh prices and products today?";
    }

    if (message.includes('thank') || message.includes('thanks')) {
      return "You're welcome! Let me know if you need any more information about our fresh produce.";
    }

    return "I'm here to help with FarmFresh prices and products. Try asking about specific vegetables, fruits, or prices!";
  };

  const findProductsByQuery = (query) => {
    const lowerQuery = query.toLowerCase();
    return products.filter(product =>
      product.name.toLowerCase().includes(lowerQuery) ||
      product.category.toLowerCase().includes(lowerQuery) ||
      product.description.toLowerCase().includes(lowerQuery)
    );
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = generateResponse(inputMessage);
      const botMessage = {
        id: messages.length + 2,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-green-600 hover:bg-green-700 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110"
        >
          <i className={`fas ${isOpen ? 'fa-times' : 'fa-robot'} text-xl`}></i>
        </button>
      </div>

      {isOpen && (
        <div className="fixed bottom-20 right-6 w-96 h-[500px] bg-white rounded-lg shadow-2xl z-40 flex flex-col border border-gray-200">
          <div className="bg-green-600 text-white p-4 rounded-t-lg">
            <h3 className="font-bold text-lg">FarmFresh AI Assistant</h3>
            <p className="text-sm opacity-90">Ask me about prices and fresh produce!</p>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${message.sender === 'user' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-800'}`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about prices, vegetables, fruits..."
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                disabled={isTyping}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
