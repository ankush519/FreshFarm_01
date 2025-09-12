const Home = () => {
  return (
    <main>
      <section id="home">
        <div className="relative h-[60vh] md:h-[80vh] flex items-center justify-center text-white text-center">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2574&auto=format&fit=crop')" }}></div>
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative z-10 px-4">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">Fresh From Farm<br /><span className="text-brand-orange">Direct To You</span></h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl">Connect directly with local farmers. Get the freshest produce while supporting your community.</p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <a href="/fresh-product" className="btn btn-primary">Start Shopping</a>
              <a href="/farmer-dashboard" className="btn btn-secondary">Sell Your Product</a>
            </div>
          </div>
        </div>
        <div className="bg-white py-12">
          <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-4xl font-bold text-brand-green">500+</h3>
              <p className="text-gray-600 mt-2">Local Farmers</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-brand-green">2000+</h3>
              <p className="text-gray-600 mt-2">Happy Customers</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-brand-green">15k+</h3>
              <p className="text-gray-600 mt-2">Fresh Deliveries</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
