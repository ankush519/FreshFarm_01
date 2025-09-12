import { useState, useEffect } from 'react';
import { productsAPI } from '../services/api';

const FarmerDashboard = () => {
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('products');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productsAPI.getAll();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };
    fetchProducts();
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [viewingProduct, setViewingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    imageUrl: '',
    description: ''
  });

  const addProduct = () => {
    setIsEditing(false);
    setEditingProductId(null);
    setFormData({
      name: '',
      category: '',
      price: '',
      stock: '',
      imageUrl: '',
      description: ''
    });
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = {
        name: formData.name,
        category: formData.category.toLowerCase(),
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        imageUrl: formData.imageUrl || 'https://placehold.co/128x128/cccccc/ffffff?text=Product',
        description: formData.description || 'No description provided'
      };

      if (isEditing) {
        await productsAPI.update(editingProductId, productData);
      } else {
        await productsAPI.create(productData);
      }

      // Refresh products
      const data = await productsAPI.getAll();
      setProducts(data);

      setFormData({
        name: '',
        category: '',
        price: '',
        stock: '',
        imageUrl: '',
        description: ''
      });
      setShowModal(false);
      setIsEditing(false);
      setEditingProductId(null);
    } catch (error) {
      console.error('Failed to save product:', error);
      alert('Failed to save product. Please try again.');
    }
  };

  const editProduct = (id) => {
    const product = products.find(p => p._id === id);
    if (!product) {
      alert('Product not found');
      return;
    }
    setIsEditing(true);
    setEditingProductId(id);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock,
      imageUrl: product.imageUrl,
      description: product.description
    });
    setShowModal(true);
  };

  const viewDetails = (id) => {
    const product = products.find(p => p._id === id);
    if (!product) {
      alert('Product not found');
      return;
    }
    setViewingProduct(product);
    setShowViewModal(true);
  };

  return (
    <main className="container mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-brand-green">Farmer Dashboard</h2>
          <p className="text-gray-600 mt-1">Manage your farm and produce listings</p>
        </div>
        <button onClick={addProduct} className="btn bg-brand-green text-white text-sm">
          <i className="fas fa-plus mr-2"></i>Add Product
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card p-6 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Total Revenue</p>
            <p className="text-2xl font-bold">₹45,230</p>
          </div>
          <i className="fas fa-rupee-sign text-3xl text-brand-green/50"></i>
        </div>
        <div className="card p-6 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Active Listings</p>
            <p className="text-2xl font-bold">{products.length}</p>
          </div>
          <i className="fas fa-box text-3xl text-brand-orange/50"></i>
        </div>
        <div className="card p-6 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Total Orders</p>
            <p className="text-2xl font-bold">89</p>
          </div>
          <i className="fas fa-chart-line text-3xl text-blue-500/50"></i>
        </div>
        <div className="card p-6 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Customer Rating</p>
            <p className="text-2xl font-bold">4.8</p>
          </div>
          <i className="fas fa-users text-3xl text-yellow-500/50"></i>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg p-2 border border-gray-200 mb-8">
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab('products')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-semibold ${
              activeTab === 'products'
                ? 'bg-brand-green/10 text-brand-green'
                : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            My Products
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-semibold ${
              activeTab === 'orders'
                ? 'bg-brand-green/10 text-brand-green'
                : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            Orders
          </button>
          <button
            onClick={() => setActiveTab('farms')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-semibold ${
              activeTab === 'farms'
                ? 'bg-brand-green/10 text-brand-green'
                : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            My Farms
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-semibold ${
              activeTab === 'analytics'
                ? 'bg-brand-green/10 text-brand-green'
                : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            Analytics
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'products' && (
        <div>
          {/* Product Status Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total Products</p>
                  <p className="text-2xl font-bold">{products.length}</p>
                </div>
                <i className="fas fa-box text-3xl text-brand-green/50"></i>
              </div>
            </div>
            <div className="card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Pending Products</p>
                  <p className="text-2xl font-bold text-orange-600">{products.filter(p => p.stock < 10).length}</p>
                </div>
                <i className="fas fa-clock text-3xl text-orange-500/50"></i>
              </div>
            </div>
            <div className="card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Low Stock Alert</p>
                  <p className="text-2xl font-bold text-red-600">{products.filter(p => p.stock < 5).length}</p>
                </div>
                <i className="fas fa-exclamation-triangle text-3xl text-red-500/50"></i>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">My Products</h3>
            <button onClick={addProduct} className="btn bg-brand-green text-white text-sm">
              <i className="fas fa-plus mr-2"></i>Add Product
            </button>
          </div>

          {/* Pending Products Alert */}
          {products.filter(p => p.stock < 10).length > 0 && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <i className="fas fa-exclamation-triangle text-orange-600 mr-3"></i>
                <div>
                  <h4 className="text-orange-800 font-semibold">Pending Products Alert</h4>
                  <p className="text-orange-700 text-sm">
                    {products.filter(p => p.stock < 10).length} products have low stock and need attention.
                  </p>
                </div>
              </div>
            </div>
          )}

          {products.map(product => (
            <div key={product._id} className="card p-4 mb-4">
              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                <img src={product.imageUrl} alt={product.name} className="w-32 h-32 object-cover rounded-lg" />
                <div className="flex-grow">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                      product.stock < 5 ? 'bg-red-100 text-red-800' :
                      product.stock < 10 ? 'bg-orange-100 text-orange-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {product.stock < 5 ? 'Low Stock' : product.stock < 10 ? 'Pending' : 'Available'}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold mt-1">{product.name}</h4>
                  <p className="text-gray-500 text-sm">{product.category}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <p className="text-lg font-bold text-brand-orange">₹{product.price}/Kg</p>
                    <p className={`text-sm font-medium ${
                      product.stock < 5 ? 'text-red-600' :
                      product.stock < 10 ? 'text-orange-600' :
                      'text-gray-500'
                    }`}>
                      {product.stock} kgs left
                    </p>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <button onClick={() => editProduct(product._id)} className="btn btn-secondary px-6">Edit</button>
                  <button onClick={() => viewDetails(product._id)} className="btn bg-gray-200 text-gray-700 px-6">View Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'orders' && (
        <div>
          <h3 className="text-xl font-bold mb-6">Orders from Wholesalers</h3>

          {/* Order Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total Orders</p>
                  <p className="text-2xl font-bold">24</p>
                </div>
                <i className="fas fa-shopping-cart text-3xl text-blue-500/50"></i>
              </div>
            </div>
            <div className="card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Pending Orders</p>
                  <p className="text-2xl font-bold text-orange-600">8</p>
                </div>
                <i className="fas fa-clock text-3xl text-orange-500/50"></i>
              </div>
            </div>
            <div className="card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Completed</p>
                  <p className="text-2xl font-bold text-green-600">16</p>
                </div>
                <i className="fas fa-check-circle text-3xl text-green-500/50"></i>
              </div>
            </div>
            <div className="card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Revenue</p>
                  <p className="text-2xl font-bold">₹12,450</p>
                </div>
                <i className="fas fa-rupee-sign text-3xl text-brand-green/50"></i>
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="card p-6">
            <h4 className="text-lg font-bold mb-4">Recent Orders</h4>
            <div className="space-y-4">
              {[
                { id: 1, wholesaler: 'FreshMart Wholesale', product: 'Organic Tomatoes', quantity: 50, status: 'Pending', date: '2024-01-15' },
                { id: 2, wholesaler: 'Green Valley Traders', product: 'Fresh Spinach', quantity: 30, status: 'Completed', date: '2024-01-14' },
                { id: 3, wholesaler: 'City Foods Ltd', product: 'Premium Carrots', quantity: 75, status: 'Pending', date: '2024-01-13' },
                { id: 4, wholesaler: 'Metro Distributors', product: 'Organic Potatoes', quantity: 100, status: 'Completed', date: '2024-01-12' },
              ].map(order => (
                <div key={order.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-brand-green/10 rounded-full flex items-center justify-center">
                      <i className="fas fa-shopping-bag text-brand-green"></i>
                    </div>
                    <div>
                      <p className="font-semibold">{order.wholesaler}</p>
                      <p className="text-sm text-gray-500">{order.product} - {order.quantity}kg</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                      order.status === 'Pending' ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {order.status}
                    </span>
                    <p className="text-sm text-gray-500 mt-1">{order.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'farms' && (
        <div>
          <h3 className="text-xl font-bold mb-6">My Farms</h3>

          {/* Farm Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total Farms</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
                <i className="fas fa-tractor text-3xl text-green-500/50"></i>
              </div>
            </div>
            <div className="card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total Area</p>
                  <p className="text-2xl font-bold">25</p>
                  <p className="text-sm text-gray-500">Acres</p>
                </div>
                <i className="fas fa-map text-3xl text-blue-500/50"></i>
              </div>
            </div>
            <div className="card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Active Crops</p>
                  <p className="text-2xl font-bold">8</p>
                </div>
                <i className="fas fa-seedling text-3xl text-brand-green/50"></i>
              </div>
            </div>
          </div>

          {/* Farm Listings */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { id: 1, name: 'Green Valley Farm', location: 'Mumbai, Maharashtra', area: 12, crops: ['Tomatoes', 'Spinach', 'Carrots'], status: 'Active' },
              { id: 2, name: 'Sunrise Organic Farm', location: 'Pune, Maharashtra', area: 8, crops: ['Potatoes', 'Onions', 'Garlic'], status: 'Active' },
              { id: 3, name: 'Heritage Farm', location: 'Nashik, Maharashtra', area: 5, crops: ['Grapes', 'Strawberries'], status: 'Active' },
            ].map(farm => (
              <div key={farm.id} className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-bold">{farm.name}</h4>
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    {farm.status}
                  </span>
                </div>
                <div className="space-y-2 mb-4">
                  <p className="text-sm text-gray-600"><i className="fas fa-map-marker-alt mr-2"></i>{farm.location}</p>
                  <p className="text-sm text-gray-600"><i className="fas fa-expand-arrows-alt mr-2"></i>{farm.area} Acres</p>
                  <div className="flex flex-wrap gap-1">
                    {farm.crops.map((crop, index) => (
                      <span key={index} className="bg-brand-green/10 text-brand-green text-xs px-2 py-1 rounded">
                        {crop}
                      </span>
                    ))}
                  </div>
                </div>
                <button className="btn bg-brand-green text-white w-full">View Details</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div>
          <h3 className="text-xl font-bold mb-6">Analytics Dashboard</h3>

          {/* Analytics Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Monthly Sales</p>
                  <p className="text-2xl font-bold">₹45,230</p>
                  <p className="text-sm text-green-600">+12% from last month</p>
                </div>
                <i className="fas fa-chart-line text-3xl text-green-500/50"></i>
              </div>
            </div>
            <div className="card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Top Product</p>
                  <p className="text-2xl font-bold">Tomatoes</p>
                  <p className="text-sm text-gray-500">₹12,450 revenue</p>
                </div>
                <i className="fas fa-trophy text-3xl text-yellow-500/50"></i>
              </div>
            </div>
            <div className="card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Customer Growth</p>
                  <p className="text-2xl font-bold">+24</p>
                  <p className="text-sm text-green-600">New customers</p>
                </div>
                <i className="fas fa-users text-3xl text-blue-500/50"></i>
              </div>
            </div>
            <div className="card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Avg Rating</p>
                  <p className="text-2xl font-bold">4.8</p>
                  <p className="text-sm text-gray-500">Out of 5 stars</p>
                </div>
                <i className="fas fa-star text-3xl text-yellow-500/50"></i>
              </div>
            </div>
          </div>

          {/* Charts Placeholder */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card p-6">
              <h4 className="text-lg font-bold mb-4">Sales Trend</h4>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <i className="fas fa-chart-bar text-4xl text-gray-300 mb-2"></i>
                  <p className="text-gray-500">Sales chart will be displayed here</p>
                </div>
              </div>
            </div>
            <div className="card p-6">
              <h4 className="text-lg font-bold mb-4">Product Performance</h4>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <i className="fas fa-pie-chart text-4xl text-gray-300 mb-2"></i>
                  <p className="text-gray-500">Product performance chart will be displayed here</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="card p-6 mt-6">
            <h4 className="text-lg font-bold mb-4">Recent Activity</h4>
            <div className="space-y-4">
              {[
                { action: 'New order received', details: 'FreshMart Wholesale - 50kg Tomatoes', time: '2 hours ago' },
                { action: 'Product updated', details: 'Organic Spinach price increased', time: '1 day ago' },
                { action: 'New customer', details: 'Green Valley Traders joined', time: '2 days ago' },
                { action: 'Farm added', details: 'Sunrise Organic Farm registered', time: '3 days ago' },
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 border border-gray-200 rounded-lg">
                  <div className="w-8 h-8 bg-brand-green/10 rounded-full flex items-center justify-center">
                    <i className="fas fa-bell text-brand-green text-sm"></i>
                  </div>
                  <div className="flex-grow">
                    <p className="font-semibold">{activity.action}</p>
                    <p className="text-sm text-gray-500">{activity.details}</p>
                  </div>
                  <p className="text-sm text-gray-400">{activity.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Produce Form Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg relative">
            <h2 className="text-xl font-bold mb-4">{isEditing ? 'Edit Produce' : 'Add New Produce'}</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Product Name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full border p-2 mb-3 rounded"
                required
              />
              <input
                type="text"
                name="category"
                placeholder="Category (e.g., Vegetables)"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full border p-2 mb-3 rounded"
                required
              />
              <input
                type="number"
                name="price"
                placeholder="Price per Kg"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full border p-2 mb-3 rounded"
                required
              />
              <input
                type="number"
                name="stock"
                placeholder="Quantity (Kg)"
                value={formData.stock}
                onChange={handleInputChange}
                className="w-full border p-2 mb-3 rounded"
                required
              />
              <input
                type="text"
                name="imageUrl"
                placeholder="Image URL (optional)"
                value={formData.imageUrl}
                onChange={handleInputChange}
                className="w-full border p-2 mb-3 rounded"
              />
              <input
                type="text"
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full border p-2 mb-3 rounded"
                required
              />
              <div className="flex justify-end space-x-2">
                <button type="button" onClick={() => setShowModal(false)} className="btn btn-secondary">Cancel</button>
                <button type="submit" className="btn btn-primary">{isEditing ? 'Update' : 'Add'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Product Details Modal */}
      {showViewModal && viewingProduct && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg relative">
            <h2 className="text-xl font-bold mb-4">Product Details</h2>
            <div className="space-y-4">
              <div className="flex justify-center">
                <img src={viewingProduct.imageUrl} alt={viewingProduct.name} className="w-32 h-32 object-cover rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                <p className="w-full border p-2 rounded bg-gray-50">{viewingProduct.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <p className="w-full border p-2 rounded bg-gray-50">{viewingProduct.category}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price per Kg</label>
                <p className="w-full border p-2 rounded bg-gray-50">₹{viewingProduct.price}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
                <p className="w-full border p-2 rounded bg-gray-50">{viewingProduct.stock} kgs</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <p className="w-full border p-2 rounded bg-gray-50">{viewingProduct.description}</p>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button onClick={() => setShowViewModal(false)} className="btn btn-primary">Close</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default FarmerDashboard;
