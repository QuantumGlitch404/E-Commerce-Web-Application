import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FiGrid } from 'react-icons/fi';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('/api/categories');
        setCategories(data.data || []);
        setError(null);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || 'Failed to load categories');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen pt-[120px] pb-[80px] px-6 md:px-[80px] max-w-[1400px] mx-auto">
      <div className="mb-12 text-center animate-[fadeInUp_0.8s_cubic-bezier(0.4,0,0.2,1)_forwards]">
        <h1 className="font-['Orbitron'] font-[800] text-[48px] md:text-[64px] text-white text-glow mb-4">
          Collections
        </h1>
        <p className="font-['Inter'] text-[18px] text-[#B3B3B3] max-w-[600px] mx-auto">
          Browse our premium collections curated for the finest tastes.
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[32px]">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="w-full pt-[56.25%] skeleton rounded-[16px]"></div>
          ))}
        </div>
      ) : error ? (
        <div className="min-h-[40vh] flex flex-col items-center justify-center p-[40px] glass-card rounded-[24px]">
          <p className="text-[#FF3366] font-['Rajdhani'] text-[24px] font-[600] mb-4">Error Loading Categories</p>
          <p className="text-[#B3B3B3]">{error}</p>
        </div>
      ) : categories.length === 0 ? (
        <div className="min-h-[60vh] flex flex-col items-center justify-center py-[80px] px-[24px]">
          <FiGrid className="text-[#00D9FF] opacity-20 text-[120px] mb-[32px] animate-[float_3s_ease-in-out_infinite]" />
          <h2 className="font-['Orbitron'] text-[32px] font-[700] text-white mb-[16px] text-center">
            No Collections Yet
          </h2>
          <p className="font-['Inter'] text-[18px] font-[400] text-[#B3B3B3] max-w-[500px] text-center mb-[40px] leading-[1.6]">
            We are currently updating our collections. Please check back shortly.
          </p>
          <button className="h-[56px] px-[40px] rounded-[12px] bg-gradient-to-br from-[#00D9FF] to-[#B84FFF] border-none font-['Rajdhani'] text-[16px] font-[700] uppercase text-white cursor-pointer shadow-[0_0_30px_rgba(0,217,255,0.4)] transition-all hover:shadow-[0_0_50px_rgba(0,217,255,0.7)] hover:-translate-y-[2px]">
            Add Categories
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[32px] animate-[fadeInUp_0.8s_cubic-bezier(0.4,0,0.2,1)_0.2s_forwards] opacity-0">
          {categories.map((cat) => (
            <Link 
              key={cat._id} 
              to={`/shop?category=${cat._id}`}
              className="group relative w-full pt-[56.25%] rounded-[16px] overflow-hidden bg-[#0D0D0D] block transform transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_48px_rgba(0,0,0,0.9)] border border-white/5 hover:border-[rgba(0,217,255,0.3)]"
            >
              <LazyLoadImage
                src={cat.image?.url || 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800'}
                alt={cat.name}
                effect="opacity"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-110"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[rgba(10,10,10,0.5)] to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 w-full p-[32px] flex flex-col items-start z-10">
                <h3 className="font-['Orbitron'] text-[28px] font-[700] text-white tracking-wider mb-2 group-hover:text-[#00D9FF] transition-colors duration-300 text-glow-sm">
                  {cat.name}
                </h3>
                <span className="font-['Rajdhani'] text-[16px] font-[600] uppercase text-[#B3B3B3] tracking-[0.1em] group-hover:text-white transition-colors duration-300">
                  {cat.productCount || 0} Products
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;
