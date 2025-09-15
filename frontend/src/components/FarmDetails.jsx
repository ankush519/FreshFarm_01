import { useParams } from 'react-router-dom';

const FarmDetails = () => {
  const { farmId } = useParams();

  // For demo, static images for farms by farmId
  const farmImages = {
    1: [
      'https://naturespath.com/cdn/shop/articles/organic_farm_field-598622.jpg?v=1725927254',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=60'
    ],
    2: [
      'https://media.istockphoto.com/id/2156200425/photo/crops-grow-on-fertile-agricultural-farm-land.jpg?s=612x612&w=0&k=20&c=z4b6sxRRG3ArqvQvafIDvM4-Q5fQEYr_RQ_NI0xNST8=',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=800&q=60'
    ],
    3:[
      'https://th.bing.com/th/id/OIP.PXCk8g62hMUBEEeWQPCbaAHaGr?w=182&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
      'https://wallpapercave.com/wp/wp12100591.jpg',
      'https://thumbs.dreamstime.com/b/rural-vegetable-farm-sunrise-morning-66144198.jpg',
    ],
    4:[
      "https://th.bing.com/th/id/OIP.Yyqx7NiAH4r1OlulpxBbUQHaFj?w=281&h=210&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
      'https://www.bing.com/th/id/OIP.9tXNZAajxccUC12Ir6IDAQHaFj?w=273&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2',
      'https://www.bing.com/th/id/OIP.WKHN4VEGTSEHyFNZ-JiJywHaJq?w=160&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2',
    ]
  };

  const images = farmImages[farmId] || [];

  return (
    <main className="container mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-brand-green mb-6">Farm Details - Farm #{farmId}</h2>
      {images.length === 0 ? (
        <p>No images available for this farm.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((src, index) => (
            <img key={index} src={src} alt={`Farm ${farmId} image ${index + 1}`} className="w-full h-48 object-cover rounded-lg shadow-md" />
          ))}
        </div>
      )}
    </main>
  );
};

export default FarmDetails;
