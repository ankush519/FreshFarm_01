  // import { useState, useRef, useEffect } from 'react';

  // const Chatbot = () => {
  //   const [isOpen, setIsOpen] = useState(false);
  //   const [messages, setMessages] = useState([
  //     {
  //       id: 1,
  //       text: "Hello! I'm your FarmFresh AI assistant. I have knowledge about your entire project including frontend components, backend API, and all features. How can I help you today?",
  //       sender: 'bot',
  //       timestamp: new Date()
  //     }
  //   ]);
  //   const [inputMessage, setInputMessage] = useState('');
  //   const [isTyping, setIsTyping] = useState(false);
  //   const messagesEndRef = useRef(null);

  //   const scrollToBottom = () => {
  //     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  //   };

  //   useEffect(() => {
  //     scrollToBottom();
  //   }, [messages]);

  //   const projectKnowledge = {
  //     overview: "FarmFresh is a farm-to-consumer marketplace platform connecting local farmers directly with wholesalers and consumers. The platform allows farmers to list their fresh produce and manage their inventory, while buyers can browse products, place orders, and manage subscriptions.",

  //     frontend: {
  //       tech: "React with Vite, Tailwind CSS, React Router",
  //       components: [
  //         "Header - Navigation with login/signup modals",
  //         "Home - Landing page",
  //         "Login/SignUp - Authentication forms",
  //         "Dashboard - User dashboard with role-based content",
  //         "FarmerDashboard - Product management for farmers",
  //         "FreshProduct - Product browsing and cart functionality",
  //         "Cart - Shopping cart management",
  //         "BrowseFarm - Farm browsing (placeholder)",
  //         "Subscription - Subscription management (placeholder)"
  //       ],
  //       features: [
  //         "User authentication with localStorage",
  //         "Role-based access (farmer/wholesaler)",
  //         "Product listing and management",
  //         "Shopping cart functionality",
  //         "Responsive design"
  //       ]
  //     },

  //     backend: {
  //       tech: "Node.js, Express, MongoDB, JWT authentication",
  //       models: [
  //         "User - fullName, email, passwordHash, role",
  //         "Product - name, description, price, category, imageUrl, farmer, stock"
  //       ],
  //       routes: [
  //         "Auth: /api/auth/register, /api/auth/login",
  //         "Products: GET/POST/PUT/DELETE /api/products"
  //       ],
  //       middleware: "JWT authentication middleware"
  //     },

  //     currentStatus: "Frontend uses localStorage, backend API is ready but not connected yet",

  //     todos: [
  //       "Connect frontend to backend API",
  //       "Replace localStorage with API calls",
  //       "Add JWT token management",
  //       "Implement protected routes",
  //       "Add cart/order management",
  //       "Add subscription system"
  //     ]
  //   };

  //   const generateResponse = (userMessage) => {
  //     const message = userMessage.toLowerCase();

  //     // Project overview questions
  //     if (message.includes('what is') || message.includes('overview') || message.includes('about')) {
  //       return projectKnowledge.overview;
  //     }

  //     // Frontend questions
  //     if (message.includes('frontend') || message.includes('react') || message.includes('component')) {
  //       if (message.includes('tech') || message.includes('technology')) {
  //         return `Frontend uses: ${projectKnowledge.frontend.tech}`;
  //       }
  //       if (message.includes('component') || message.includes('page')) {
  //         return `Main components: ${projectKnowledge.frontend.components.join(', ')}`;
  //       }
  //       return `Frontend features: ${projectKnowledge.frontend.features.join(', ')}`;
  //     }

  //     // Backend questions
  //     if (message.includes('backend') || message.includes('api') || message.includes('server')) {
  //       if (message.includes('tech') || message.includes('technology')) {
  //         return `Backend uses: ${projectKnowledge.backend.tech}`;
  //       }
  //       if (message.includes('model') || message.includes('database')) {
  //         return `Database models: ${projectKnowledge.backend.models.join(', ')}`;
  //       }
  //       if (message.includes('route') || message.includes('endpoint')) {
  //         return `API routes: ${projectKnowledge.backend.routes.join(', ')}`;
  //       }
  //       return `Backend includes: ${projectKnowledge.backend.middleware}`;
  //     }

  //     // Status questions
  //     if (message.includes('status') || message.includes('current') || message.includes('progress')) {
  //       return projectKnowledge.currentStatus;
  //     }

  //     // TODO questions
  //     if (message.includes('todo') || message.includes('task') || message.includes('next')) {
  //       return `Current TODOs: ${projectKnowledge.todos.join(', ')}`;
  //     }

  //     // Help questions
  //     if (message.includes('help') || message.includes('can you') || message.includes('what can')) {
  //       return "I can help you with information about: project overview, frontend components and features, backend API and models, current project status, and upcoming tasks. Just ask me anything about the FarmFresh project!";
  //     }

  //     // Default responses
  //     if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
  //       return "Hello! How can I help you with the FarmFresh project today?";
  //     }

  //     if (message.includes('thank') || message.includes('thanks')) {
  //       return "You're welcome! Let me know if you need any more information about the project.";
  //     }

  //     // Generic response
  //     return "I'm here to help with any questions about the FarmFresh project. You can ask me about the frontend, backend, current status, or any specific features!";
  //   };

  //   const handleSendMessage = async () => {
  //     if (!inputMessage.trim()) return;

  //     const userMessage = {
  //       id: messages.length + 1,
  //       text: inputMessage,
  //       sender: 'user',
  //       timestamp: new Date()
  //     };

  //     setMessages(prev => [...prev, userMessage]);
  //     setInputMessage('');
  //     setIsTyping(true);

  //     // Simulate typing delay
  //     setTimeout(() => {
  //       const botResponse = generateResponse(inputMessage);
  //       const botMessage = {
  //         id: messages.length + 2,
  //         text: botResponse,
  //         sender: 'bot',
  //         timestamp: new Date()
  //       };
  //       setMessages(prev => [...prev, botMessage]);
  //       setIsTyping(false);
  //     }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  //   };

  //   const handleKeyPress = (e) => {
  //     if (e.key === 'Enter' && !e.shiftKey) {
  //       e.preventDefault();
  //       handleSendMessage();
  //     }
  //   };

  //   return (
  //     <>
  //       {/* Chatbot Toggle Button */}
  //       <div className="fixed bottom-6 right-6 z-50">
  //         <button
  //           onClick={() => setIsOpen(!isOpen)}
  //           className="bg-brand-green hover:bg-brand-green/90 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110"
  //         >
  //           <i className={`fas ${isOpen ? 'fa-times' : 'fa-robot'} text-xl`}></i>
  //         </button>
  //       </div>

  //       {/* Chatbot Window */}
  //       {isOpen && (
  //         <div className="fixed bottom-20 right-6 w-96 h-[500px] bg-white rounded-lg shadow-2xl z-40 flex flex-col border border-gray-200">
  //           {/* Header */}
  //           <div className="bg-brand-green text-white p-4 rounded-t-lg">
  //             <h3 className="font-bold text-lg">FarmFresh AI Assistant</h3>
  //             <p className="text-sm opacity-90">Ask me anything about your project!</p>
  //           </div>

  //           {/* Messages */}
  //           <div className="flex-1 overflow-y-auto p-4 space-y-4">
  //             {messages.map((message) => (
  //               <div
  //                 key={message.id}
  //                 className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
  //               >
  //                 <div
  //                   className={`max-w-[80%] p-3 rounded-lg ${
  //                     message.sender === 'user'
  //                       ? 'bg-brand-green text-white'
  //                       : 'bg-gray-100 text-gray-800'
  //                   }`}
  //                 >
  //                   <p className="text-sm">{message.text}</p>
  //                   <p className="text-xs opacity-70 mt-1">
  //                     {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
  //                   </p>
  //                 </div>
  //               </div>
  //             ))}

  //             {isTyping && (
  //               <div className="flex justify-start">
  //                 <div className="bg-gray-100 text-gray-800 p-3 rounded-lg">
  //                   <div className="flex space-x-1">
  //                     <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
  //                     <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
  //                     <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
  //                   </div>
  //                 </div>
  //               </div>
  //             )}

  //             <div ref={messagesEndRef} />
  //           </div>

  //           {/* Input */}
  //           <div className="p-4 border-t border-gray-200">
  //             <div className="flex space-x-2">
  //               <input
  //                 type="text"
  //                 value={inputMessage}
  //                 onChange={(e) => setInputMessage(e.target.value)}
  //                 onKeyPress={handleKeyPress}
  //                 placeholder="Ask me about FarmFresh..."
  //                 className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-green"
  //                 disabled={isTyping}
  //               />
  //               <button
  //                 onClick={handleSendMessage}
  //                 disabled={!inputMessage.trim() || isTyping}
  //                 className="bg-brand-green hover:bg-brand-green/90 text-white px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
  //               >
  //                 <i className="fas fa-paper-plane"></i>
  //               </button>
  //             </div>
  //           </div>
  //         </div>
  //       )}
  //     </>
  //   );
  // };

  // export default Chatbot;


  import React, { useState, useRef, useEffect } from 'react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your FarmFresh AI assistant. I have knowledge about your entire project including frontend components, backend API, and all features. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const projectKnowledge = {
    overview: "FarmFresh is a farm-to-consumer marketplace platform connecting local farmers directly with wholesalers and consumers. The platform allows farmers to list their fresh produce and manage their inventory, while buyers can browse products, place orders, and manage subscriptions.",
    frontend: {
      tech: "React with Vite, Tailwind CSS, React Router",
      components: [
        "Header - Navigation with login/signup modals",
        "Home - Landing page",
        "Login/SignUp - Authentication forms",
        "Dashboard - User dashboard with role-based content",
        "FarmerDashboard - Product management for farmers",
        "FreshProduct - Product browsing and cart functionality",
        "Cart - Shopping cart management",
        "BrowseFarm - Farm browsing (placeholder)",
        "Subscription - Subscription management (placeholder)"
      ],
      features: [
        "User authentication with localStorage",
        "Role-based access (farmer/wholesaler)",
        "Product listing and management",
        "Shopping cart functionality",
        "Responsive design"
      ]
    },
    backend: {
      tech: "Node.js, Express, MongoDB, JWT authentication",
      models: [
        "User - fullName, email, passwordHash, role",
        "Product - name, description, price, category, imageUrl, farmer, stock"
      ],
      routes: [
        "Auth: /api/auth/register, /api/auth/login",
        "Products: GET/POST/PUT/DELETE /api/products"
      ],
      middleware: "JWT authentication middleware"
    },
    currentStatus: "Frontend uses localStorage, backend API is ready but not connected yet",
    todos: [
      "Connect frontend to backend API",
      "Replace localStorage with API calls",
      "Add JWT token management",
      "Implement protected routes",
      "Add cart/order management",
      "Add subscription system"
    ]
  };

  const generateResponse = (userMessage) => {
    const message = userMessage.toLowerCase();

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
      return "I can help you with information about: project overview, frontend components and features, backend API and models, current project status, and upcoming tasks. Just ask me anything about the FarmFresh project!";
    }

    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return "Hello! How can I help you with the FarmFresh project today?";
    }

    if (message.includes('thank') || message.includes('thanks')) {
      return "You're welcome! Let me know if you need any more information about the project.";
    }

    return "I'm here to help with any questions about the FarmFresh project. You can ask me about the frontend, backend, current status, or any specific features!";
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
            <p className="text-sm opacity-90">Ask me anything about your project!</p>
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
                placeholder="Ask me about FarmFresh..."
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
