import { useState, useEffect } from 'react';

const FarmerDashboard = () => {
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem('farmerProducts');
    return savedProducts ? JSON.parse(savedProducts) : [
      {
        id: 1,
        name: 'Fresh Tomatoes',
        category: 'Vegetables',
        price: 40,
        stock: 50,
        image: 'https://bonnieplants.com/cdn/shop/articles/BONNIE_tomatoes_iStock-481349128-1800px_d5820803-320c-401d-a55c-92df3c204962.jpg?v=1753293158&width=1000',
        status: 'Available'
      }
    ];
  });

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
    image: ''
  });

  const addProduct = () => {
    setIsEditing(false);
    setEditingProductId(null);
    setFormData({
      name: '',
      category: '',
      price: '',
      stock: '',
      image: ''
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

  const handleSubmit = (e) => {
    e.preventDefault();
    let updatedProducts;
    if (isEditing) {
      const updatedProduct = {
        ...products.find(p => p.id === editingProductId),
        name: formData.name,
        category: formData.category,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        image: formData.image || 'https://placehold.co/128x128/cccccc/ffffff?text=Product'
      };
      updatedProducts = products.map(p => p.id === editingProductId ? updatedProduct : p);
      setProducts(updatedProducts);
    } else {
      const newProduct = {
        id: products.length + 1,
        name: formData.name,
        category: formData.category,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        image: formData.image || 'https://placehold.co/128x128/cccccc/ffffff?text=Product',
        status: 'Available'
      };
      updatedProducts = [...products, newProduct];
      setProducts(updatedProducts);
    }
    localStorage.setItem('farmerProducts', JSON.stringify(updatedProducts));
    setFormData({
      name: '',
      category: '',
      price: '',
      stock: '',
      image: ''
    });
    setShowModal(false);
    setIsEditing(false);
    setEditingProductId(null);
  };

  const editProduct = (id) => {
    const product = products.find(p => p.id === id);
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
      image: product.image
    });
    setShowModal(true);
  };

  const viewDetails = (id) => {
    const product = products.find(p => p.id === id);
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
          <button className="flex-1 py-2 px-4 rounded-md text-sm font-semibold bg-brand-green/10 text-brand-green">My Product</button>
          <button className="flex-1 py-2 px-4 rounded-md text-sm font-semibold text-gray-500 hover:bg-gray-100">Orders</button>
          <button className="flex-1 py-2 px-4 rounded-md text-sm font-semibold text-gray-500 hover:bg-gray-100">My Farms</button>
          <button className="flex-1 py-2 px-4 rounded-md text-sm font-semibold text-gray-500 hover:bg-gray-100">Analytics</button>
        </div>
      </div>

      {/* Active Listings */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Active Produce Listings</h3>
          <button onClick={addProduct} className="btn bg-brand-green text-white text-sm">
            <i className="fas fa-plus mr-2"></i>Add Product
          </button>
        </div>
        {products.map(product => (
          <div key={product.id} className="card p-4 mb-4">
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <img src={product.image} alt={product.name} className="w-32 h-32 object-cover rounded-lg" />
              <div className="flex-grow">
                <span className={`bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full`}>{product.status}</span>
                <h4 className="text-lg font-bold mt-1">{product.name}</h4>
                <p className="text-gray-500 text-sm">{product.category}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <p className="text-lg font-bold text-brand-orange">₹{product.price}/Kg</p>
                  <p className="text-sm text-gray-500">{product.stock} kgs left</p>
                </div>
              </div>
              <div className="flex space-x-3">
                <button onClick={() => editProduct(product.id)} className="btn btn-secondary px-6">Edit</button>
                <button onClick={() => viewDetails(product.id)} className="btn bg-gray-200 text-gray-700 px-6">View Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>

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
                name="image"
                placeholder="Image URL (optional)"
                value={formData.image}
                onChange={handleInputChange}
                className="w-full border p-2 mb-3 rounded"
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
                <img src={viewingProduct.image} alt={viewingProduct.name} className="w-32 h-32 object-cover rounded-lg" />
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <p className="w-full border p-2 rounded bg-gray-50">{viewingProduct.status}</p>
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
