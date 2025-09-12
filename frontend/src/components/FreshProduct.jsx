import { useState, useEffect } from 'react';
import { productsAPI } from '../services/api.js';

const FreshProduct = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productsAPI.getAll();
        const mappedProducts = data.map(product => ({
          ...product,
          unit: 'Kg',
          organic: true,
          image: product.imageUrl // Map imageUrl to image for consistency
        }));
        setProducts(mappedProducts);
      } catch (error) {
        console.error('Failed to fetch products:', error);
        // Fallback to default products if API fails
        setProducts([
          {
            id: 1,
            name: 'Fresh Tomatoes',
            category: 'Vegetables',
            price: 40,
            unit: 'Kg',
            stock: 50,
            image: 'https://media.istockphoto.com/id/171579643/photo/tomato-greenhouse.jpg?s=612x612&w=0&k=20&c=BLtIrrBprkZlIHNfSYIhkm3aebVUjqxsS-Yoqa1ss08=',
            organic: true
          },
          {
            id: 2,
            name: 'Organic Spinach',
            category: 'Vegetables',
            price: 25,
            unit: 'bunch',
            stock: 30,
            image: 'https://media.istockphoto.com/id/1296222786/photo/rows-of-green-spinach-on-a-field.jpg?s=612x612&w=0&k=20&c=RUvD-8aTP1wuxJtv8t1xKxaCGklrRAC5HwvaTBEf4nE=',
            organic: true
          }
        ]);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = selectedCategory === 'All Categories' ? products : products.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('farmFreshCart')) || [];
    const existingItem = cart.find(item => item._id === product._id);
    if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('farmFreshCart', JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
  };

  return (
    <main>
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-green">Fresh Seasonal Produce</h2>
          <p className="mt-2 text-gray-600">Browse the freshest produce directly from local farms.</p>
        </div>
        <div className="max-w-3xl mx-auto mb-8">
          <div className="relative">
            <input type="text" placeholder="Search produce..." className="w-full p-4 pr-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:outline-none" />
            <i className="fas fa-search absolute top-1/2 right-4 -translate-y-1/2 text-gray-400"></i>
          </div>
          <div className="mt-4 flex justify-center space-x-2">
            <button
              onClick={() => setSelectedCategory('All Categories')}
              className={`px-4 py-2 rounded-full text-sm font-medium ${selectedCategory === 'All Categories' ? 'bg-brand-green text-white' : 'bg-white border border-gray-300 text-gray-700'}`}
            >
              All Categories
            </button>
            <button
              onClick={() => setSelectedCategory('Vegetables')}
              className={`px-4 py-2 rounded-full text-sm font-medium ${selectedCategory === 'Vegetables' ? 'bg-brand-green text-white' : 'bg-white border border-gray-300 text-gray-700'}`}
            >
              Vegetables
            </button>
            <button
              onClick={() => setSelectedCategory('Fruits')}
              className={`px-4 py-2 rounded-full text-sm font-medium ${selectedCategory === 'Fruits' ? 'bg-brand-green text-white' : 'bg-white border border-gray-300 text-gray-700'}`}
            >
              Fruits
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">Found {filteredProducts.length} produce items</p>
          <p className="text-sm text-gray-500"><i className="fas fa-plane mr-2"></i>Free delivery on orders above ₹500</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <div key={product._id} className="card">
              <div className="relative">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                {product.organic && <span className="absolute top-3 left-3 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full">Organic</span>}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold">{product.name}</h3>
                <p className="text-gray-500 text-sm">{product.category}</p>
                <div className="flex justify-between items-center mt-3">
                  <p className="text-xl font-bold text-brand-orange">₹{product.price}<span className="text-sm font-normal text-gray-500">/{product.unit}</span></p>
                  <p className="text-sm text-gray-500">{product.stock} {product.unit}s left</p>
                </div>
                <p className="text-green-600 font-semibold text-sm mt-1">Available Now</p>
                <button onClick={() => addToCart(product)} className="btn bg-brand-green text-white w-full mt-4"><i className="fas fa-shopping-cart mr-2"></i>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default FreshProduct;
