import { useNavigate } from 'react-router-dom';

const BrowseFarm = () => {
  const navigate = useNavigate();

  const handleViewFarm = (farmId) => {
    navigate(`/farm-details/${farmId}`);
  };

  return (
    <main>
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-green">Discover Local Farms</h2>
          <p className="mt-2 text-gray-600">Connect directly with farmers in your area and get the freshest produce.</p>
        </div>
        <div className="max-w-3xl mx-auto mb-8">
          <div className="relative">
            <input type="text" placeholder="Search farms by name or location..." className="w-full p-4 pr-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:outline-none" />
            <i className="fas fa-search absolute top-1/2 right-4 -translate-y-1/2 text-gray-400"></i>
          </div>
          <div className="mt-4 flex justify-center space-x-2">
            <button className="px-4 py-2 rounded-full bg-brand-green text-white text-sm font-medium">All Cities</button>
            <button className="px-4 py-2 rounded-full bg-white border border-gray-300 text-sm font-medium">Rajpura</button>
            <button className="px-4 py-2 rounded-full bg-white border border-gray-300 text-sm font-medium">Patiala</button>
          </div>
          <p className="text-gray-600 mb-6">Found 2 farms in your area</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Farm Card 1 */}
            <div className="card">
              <img src="https://naturespath.com/cdn/shop/articles/organic_farm_field-598622.jpg?v=1725927254" alt="Sharma Organic Farm" className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold">Sharma Organic Farm</h3>
                  <div className="flex items-center space-x-1 text-yellow-500">
                    <i className="fas fa-star"></i>
                    <span>4.8</span>
                  </div>
                </div>
                <p className="text-gray-500 text-sm mt-1"><i className="fas fa-map-marker-alt mr-1"></i>Rajpura, Punjab • 6km away</p>
                <p className="text-gray-600 mt-3">Organic vegetables and traditional farming methods.</p>
                <div className="mt-4">
                  <p className="font-semibold text-sm">Certifications:</p>
                  <div className="flex space-x-2 mt-1">
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Organic Certified</span>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Fair Trade</span>
                  </div>
                </div>
                <button onClick={() => handleViewFarm(1)} className="btn bg-brand-green text-white w-full mt-6">View Farm</button>
              </div>
            </div>
            {/* Farm Card 2 */}
            <div className="card">
              <img src="https://media.istockphoto.com/id/2156200425/photo/crops-grow-on-fertile-agricultural-farm-land.jpg?s=612x612&w=0&k=20&c=z4b6sxRRG3ArqvQvafIDvM4-Q5fQEYr_RQ_NI0xNST8=" alt="Green Valley Greens" className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold">Green Valley Greens</h3>
                  <div className="flex items-center space-x-1 text-yellow-500">
                    <i className="fas fa-star"></i>
                    <span>4.9</span>
                  </div>
                </div>
                <p className="text-gray-500 text-sm mt-1"><i className="fas fa-map-marker-alt mr-1"></i>Banur, Punjab • 8km away</p>
                <p className="text-gray-600 mt-3">Fresh leafy greens and herbs with organic methods.</p>
                <div className="mt-4">
                  <p className="font-semibold text-sm">Certifications:</p>
                  <div className="flex space-x-2 mt-1">
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Organic Certified</span>
                     <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Fair Trade</span>
                  </div>
                </div>
                <button onClick={() => handleViewFarm(2)} className="btn bg-brand-green text-white w-full mt-6">View Farm</button>
              </div>
            </div>

            {/* Farm Card 3 */}

            <div className="card">
              <img src="https://th.bing.com/th/id/OIP.PXCk8g62hMUBEEeWQPCbaAHaGr?w=182&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" alt="Patiala Greens" className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold">Patiala Greens</h3>
                  <div className="flex items-center space-x-1 text-yellow-500">
                    <i className="fas fa-star"></i>
                    <span>4.9</span>
                  </div>
                </div>
                <p className="text-gray-500 text-sm mt-1"><i className="fas fa-map-marker-alt mr-1"></i>Patiala, Punjab • 48km away</p>
                <p className="text-gray-600 mt-3">Organic vegetables and traditional farming methods.</p>
                <div className="mt-4">
                  <p className="font-semibold text-sm">Certifications:</p>
                  <div className="flex space-x-2 mt-1">
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Organic Certified</span>
                     <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Fair Trade</span>
                  </div>
                </div>
                <button onClick={() => handleViewFarm(3)} className="btn bg-brand-green text-white w-full mt-6">View Farm</button>
              </div>
            </div>

            {/* Farm Card 4 */}
            <div className="card">
              <img src="https://th.bing.com/th/id/OIP.Yyqx7NiAH4r1OlulpxBbUQHaFj?w=281&h=210&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" alt="Punjabi Farm" className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold">Punjabi Farm</h3>
                  <div className="flex items-center space-x-1 text-yellow-500">
                    <i className="fas fa-star"></i>
                    <span>5</span>
                  </div>
                </div>
                <p className="text-gray-500 text-sm mt-1"><i className="fas fa-map-marker-alt mr-1"></i>Kalitran, Punjab • 98km away</p>
                <p className="text-gray-600 mt-3">Fresh leafy greens and herbs.</p>
                <div className="mt-4">
                  <p className="font-semibold text-sm">Certifications:</p>
                  <div className="flex space-x-2 mt-1">
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Organic Certified</span>
                     <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Fair Trade</span>
                  </div>
                </div>
                <button onClick={() => handleViewFarm(4)} className="btn bg-brand-green text-white w-full mt-6">View Farm</button>
              </div>
            </div>


          </div>
        </div>
      </div>
    </main>
  );
};

export default BrowseFarm;
