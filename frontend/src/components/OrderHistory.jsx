import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ordersAPI } from '../services/api.js';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersData = await ordersAPI.getOrders();
        setOrders(ordersData || []);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
        setOrders([]);
      }
    };
    fetchOrders();
  }, []);

  return (
    <main className="container mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold mb-6 text-center text-brand-green">📦 Your Order History</h2>
      {orders.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <i className="fas fa-box-open text-4xl mb-4"></i>
          <p className="text-xl">You have no past orders.</p>
          <Link to="/fresh-product" className="btn btn-primary mt-4 inline-block">Start Shopping</Link>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto space-y-6">
          {orders.map((order, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-xl font-semibold mb-2">Order #{index + 1}</h3>
              <p className="text-sm text-gray-600 mb-2">Placed on: {new Date(order.createdAt).toLocaleString()}</p>
              <div className="space-y-2">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <img src={item.image || 'https://placehold.co/64x64/cccccc/ffffff?text=Item'} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                      <div>
                        <p className="font-medium text-lg">{item.name}</p>
                        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="text-lg font-bold text-brand-orange">₹{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-200 pt-4 mt-4 flex justify-between items-center">
                <p className="text-xl font-semibold">Total:</p>
                <p className="text-xl font-bold text-brand-orange">₹{order.total.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default OrderHistory;
