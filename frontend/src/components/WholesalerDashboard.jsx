import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const WholesalerDashboard = () => {
  const [user, setUser] = useState({});
  const [products, setProducts] = useState([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    price: '',
    unit: 'Kg',
    stock: '',
    image: ''
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    setUser(storedUser);

    // Fetch products (for wholesalers, they might see their own products or bulk products)
    const fetchProducts = async () => {
      try {
        const { productsAPI } = await import('../services/api');
        const data = await productsAPI.getAll();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };
    fetchProducts();
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const { productsAPI } = await import('../services/api');
      await productsAPI.create(newProduct);
      setShowAddProduct(false);
      setNewProduct({
        name: '',
        category: '',
        price: '',
        unit: 'Kg',
        stock: '',
        image: ''
      });
      // Refresh products
      const data = await productsAPI.getAll();
      setProducts(data);
    } catch (error) {
      console.error('Failed to add product:', error);
    }
  };

  return (
    <main className="container mx-auto px-6 py-12">
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-3xl font-bold mb-4 text-brand-green">🏪 Wholesaler Dashboard</h2>
        <p className="text-gray-600 mb-6">Welcome back, {user.fullName}! Manage your wholesale operations here.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-green-800 mb-2">Total Products</h3>
            <p className="text-3xl font-bold text-green-600">{products.length}</p>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-blue-800 mb-2">Active Orders</h3>
            <p className="text-3xl font-bold text-blue-600">0</p>
          </div>
          <div className="bg-orange-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-orange-800 mb-2">Revenue</h3>
            <p className="text-3xl font-bold text-orange-600">₹0</p>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-semibold">Your Products</h3>
          <button
            onClick={() => setShowAddProduct(true)}
            className="btn btn-primary"
          >
            <i className="fas fa-plus mr-2"></i>Add Product
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <div key={product._id} className="bg-gray-50 p-4 rounded-lg">
              <img src={product.imageUrl || 'https://placehold.co/200x150/cccccc/ffffff?text=Product'} alt={product.name} className="w-full h-32 object-cover rounded-md mb-4" />
              <h4 className="font-semibold text-lg">{product.name}</h4>
              <p className="text-gray-600">{product.category}</p>
              <p className="text-brand-orange font-bold">₹{product.price} per {product.unit}</p>
              <p className="text-sm text-gray-500">Stock: {product.stock} {product.unit}s</p>
              <div className="mt-4 flex space-x-2">
                <button className="btn bg-blue-500 text-white text-sm px-3 py-1">Edit</button>
                <button className="btn bg-red-500 text-white text-sm px-3 py-1">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center" onClick={() => setShowAddProduct(false)}>
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-bold text-center text-brand-green mb-6">Add New Product</h2>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <input
                type="text"
                placeholder="Product Name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-brand-green"
                required
              />
              <input
                type="text"
                placeholder="Category"
                value={newProduct.category}
                onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-brand-green"
                required
              />
              <input
                type="number"
                placeholder="Price"
                value={newProduct.price}
                onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-brand-green"
                required
              />
              <select
                value={newProduct.unit}
                onChange={(e) => setNewProduct({...newProduct, unit: e.target.value})}
                className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-brand-green"
              >
                <option value="Kg">Kg</option>
                <option value="bunch">Bunch</option>
                <option value="piece">Piece</option>
              </select>
              <input
                type="number"
                placeholder="Stock Quantity"
                value={newProduct.stock}
                onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-brand-green"
                required
              />
              <input
                type="url"
                placeholder="Image URL"
                value={newProduct.image}
                onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-brand-green"
              />
              <button type="submit" className="btn btn-primary w-full">Add Product</button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default WholesalerDashboard;
