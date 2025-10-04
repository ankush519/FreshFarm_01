import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cartAPI, ordersAPI } from '../services/api.js';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [confirmCallback, setConfirmCallback] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartData = await cartAPI.getCart();
        setCart(cartData.items || []);
      } catch (error) {
        console.error('Failed to fetch cart:', error);
        setCart([]);
      }
    };
    fetchCart();
  }, []);

  const updateQuantity = async (index, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(index);
      return;
    }
    const item = cart[index];
    try {
      await cartAPI.updateItem(item.product._id, newQuantity);
      const updatedCart = await cartAPI.getCart();
      setCart(updatedCart.items || []);
    } catch (error) {
      console.error('Failed to update quantity:', error);
    }
  };

  const removeItem = async (index) => {
    showConfirmationModal('Are you sure you want to remove this item?', async () => {
      const item = cart[index];
      try {
        await cartAPI.removeItem(item.product._id);
        const updatedCart = await cartAPI.getCart();
        setCart(updatedCart.items || []);
      } catch (error) {
        console.error('Failed to remove item:', error);
      }
    });
  };

  const clearCart = async () => {
    showConfirmationModal('Are you sure you want to clear the entire cart?', async () => {
      try {
        await cartAPI.clearCart();
        setCart([]);
      } catch (error) {
        console.error('Failed to clear cart:', error);
      }
    });
  };

  const proceedToPay = () => {
    if (cart.length > 0) {
      showConfirmationModal('Proceed to payment? This will place your order.', async () => {
        try {
          const orderItems = cart.map(item => ({
            product: item.product._id,
            name: item.product.name,
            price: item.product.price,
            quantity: item.quantity,
            image: item.product.imageUrl,
          }));
          const orderData = {
            items: orderItems,
            total: total,
          };
          await ordersAPI.createOrder(orderData);
          setToastMessage('Order placed successfully! Redirecting to order history.');
          setShowToast(true);
          await cartAPI.clearCart();
          setCart([]);
          setTimeout(() => {
            setShowToast(false);
            window.location.href = '/order-history';
          }, 3000);
        } catch (error) {
          console.error('Failed to place order:', error);
        }
      });
    }
  };

  const showConfirmationModal = (message, callback) => {
    setModalMessage(message);
    setConfirmCallback(() => callback);
    setShowModal(true);
  };

  const hideConfirmationModal = () => {
    setShowModal(false);
    setConfirmCallback(null);
  };

  const handleConfirm = () => {
    if (confirmCallback) {
      confirmCallback();
    }
    hideConfirmationModal();
  };

  const total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  return (
    <>
      {/* Custom Modal for Confirmation */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm mx-auto">
            <h3 className="text-lg font-medium text-gray-900">Are you sure?</h3>
            <div className="mt-2">
              <p className="text-sm text-gray-500">{modalMessage}</p>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button onClick={hideConfirmationModal} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancel</button>
              <button onClick={handleConfirm} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">Confirm</button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-5 right-5 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg">
          {toastMessage}
        </div>
      )}

      <main className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-6 text-center text-brand-green">🛒 Your Cart</h2>
        <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto">
          {cart.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <i className="fas fa-shopping-cart text-4xl mb-4"></i>
              <p className="text-xl">Your cart is empty.</p>
              <Link to="/fresh-product" className="btn btn-primary mt-4 inline-block">Start Shopping</Link>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {cart.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-4 border-b">
              <div className="flex items-center space-x-4">
                <img src={item.product.imageUrl || 'https://placehold.co/64x64/cccccc/ffffff?text=Item'} alt={item.product.name} className="w-16 h-16 object-cover rounded-md" />
                <div>
                  <p className="font-medium text-lg">{item.product.name}</p>
                  <p className="text-sm text-gray-500">₹{item.product.price.toFixed(2)} each</p>
                </div>
              </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <button onClick={() => updateQuantity(index, item.quantity - 1)} className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300">-</button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(index, item.quantity + 1)} className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300">+</button>
                      </div>
                      <p className="text-lg font-bold text-brand-orange">₹{(item.product.price * item.quantity).toFixed(2)}</p>
                      <button onClick={() => removeItem(index)} className="text-red-500 hover:underline">
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-200 pt-4 mt-6">
                <div className="flex justify-between items-center">
                  <p className="text-xl font-semibold">Total:</p>
                  <p className="text-xl font-bold text-brand-orange">₹{total.toFixed(2)}</p>
                </div>
                <div className="mt-6 flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
                  <button onClick={clearCart} className="btn bg-red-500 text-white hover:bg-red-600">Clear Cart</button>
                  <button onClick={proceedToPay} className="btn btn-primary"><i className="fas fa-credit-card mr-2"></i>Proceed to Pay</button>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default Cart;
