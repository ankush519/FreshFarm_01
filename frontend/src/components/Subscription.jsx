const Subscription = () => {
  const plans = [
    {
      id: 1,
      name: 'Fresh Essentials',
      description: 'Perfect for small families',
      price: 599,
      features: [
        '3-4 kg mixed vegetables',
        '1-2 kg seasonal fruits',
        'Free delivery',
        'Flexible schedule'
      ],
      popular: false
    },
    {
      id: 2,
      name: 'Family Pack',
      description: 'Ideal for medium families',
      price: 999,
      features: [
        '6-7 kg mixed vegetables',
        '3-4 kg seasonal fruits',
        'Fresh dairy products',
        'Priority delivery',
        '25% savings vs market'
      ],
      popular: true
    },
    {
      id: 3,
      name: 'Premium Harvest',
      description: 'For large families & businesses',
      price: 1499,
      features: [
        '10+ kg mixed vegetables',
        '5+ kg premium fruits',
        'Exotic & specialty items',
        'Same day delivery',
        '30% savings vs market'
      ],
      popular: false
    }
  ];

  const choosePlan = (planName) => {
    alert(`You have chosen the ${planName} plan!`);
  };

  return (
    <main>
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-green">Fresh Subscription Plans</h2>
          <p className="mt-2 text-gray-600 max-w-2xl mx-auto">Get regular deliveries of seasonal produce and never run out of fresh vegetables and fruits.</p>
          <div className="mt-4 flex justify-center items-center space-x-6 text-sm text-gray-500">
            <span><i className="fas fa-check-circle text-green-500 mr-2"></i>Free cancellation</span>
            <span><i className="fas fa-check-circle text-green-500 mr-2"></i>Flexible scheduling</span>
            <span><i className="fas fa-check-circle text-green-500 mr-2"></i>Quality guarantee</span>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {plans.map(plan => (
            <div key={plan.id} className={`card p-8 ${plan.popular ? 'border-2 border-brand-orange relative' : ''}`}>
              {plan.popular && <span className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-brand-orange text-white text-sm font-bold px-4 py-1 rounded-full">Most Popular</span>}
              <h3 className="text-2xl font-bold">{plan.name}</h3>
              <p className="text-gray-500">{plan.description}</p>
              <p className="text-4xl font-bold my-4">₹{plan.price} <span className="text-lg font-normal text-gray-500">per weekly</span></p>
              <ul className="space-y-3 text-gray-600">
                {plan.features.map((feature, index) => (
                  <li key={index}><i className="fas fa-check text-green-500 mr-2"></i>{feature}</li>
                ))}
              </ul>
              <button onClick={() => choosePlan(plan.name)} className={`btn w-full mt-8 ${plan.popular ? 'btn-primary' : 'bg-brand-green text-white'}`}>Choose Plan</button>
            </div>
          ))}
        </div>
        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-center text-3xl font-bold text-brand-green mb-8">Frequently Asked Questions</h2>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h4 className="font-semibold">Can I customize my subscription?</h4>
              <p className="text-gray-600 mt-2 text-sm">Yes! You can customize your delivery schedule, pause subscriptions, and specify preferences for vegetables and fruits.</p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h4 className="font-semibold">What if I'm not satisfied?</h4>
              <p className="text-gray-600 mt-2 text-sm">We offer 100% satisfaction guarantee. If you're not happy with your produce, we'll replace it or refund your money.</p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h4 className="font-semibold">How does delivery work?</h4>
              <p className="text-gray-600 mt-2 text-sm">We deliver fresh produce to your doorstep at your preferred time. You can also opt for pickup from partner locations.</p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h4 className="font-semibold">Can I cancel anytime?</h4>
              <p className="text-gray-600 mt-2 text-sm">Absolutely! You can cancel your subscription anytime with no cancellation fees. Just give us 24 hours notice.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Subscription;
