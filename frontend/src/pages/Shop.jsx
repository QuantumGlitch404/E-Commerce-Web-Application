import { useState, useEffect } from 'react';
import axios from 'axios';
import { FiShoppingBag } from 'react-icons/fi';
import ProductCard from '../components/product/ProductCard';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('/api/products');
        setProducts(data.data?.products || []);
        setError(null);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen pt-[120px] pb-[80px] px-6 md:px-[80px] max-w-[1400px] mx-auto">
      <div className="mb-12 text-center animate-[fadeInUp_0.8s_cubic-bezier(0.4,0,0.2,1)_forwards]">
        <h1 className="font-['Orbitron'] font-[800] text-[48px] md:text-[64px] text-white text-glow mb-4">
          All Products
        </h1>
        <p className="font-['Inter'] text-[18px] text-[#B3B3B3] max-w-[600px] mx-auto">
          Explore our complete collection of premium luxury items.
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 min-[480px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[32px]">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="w-full pt-[100%] skeleton rounded-[16px] relative">
              <div className="absolute inset-x-4 bottom-4 h-[120px] skeleton rounded-[8px]"></div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="min-h-[40vh] flex flex-col items-center justify-center p-[40px] glass-card rounded-[24px]">
          <p className="text-[#FF3366] font-['Rajdhani'] text-[24px] font-[600] mb-4">Error Loading Products</p>
          <p className="text-[#B3B3B3]">{error}</p>
        </div>
      ) : products.length === 0 ? (
        <div className="min-h-[60vh] flex flex-col items-center justify-center py-[80px] px-[24px]">
          <FiShoppingBag className="text-[#00D9FF] opacity-20 text-[120px] mb-[32px] animate-[float_3s_ease-in-out_infinite]" />
          <h2 className="font-['Orbitron'] text-[32px] font-[700] text-white mb-[16px] text-center">
            No Products Found
          </h2>
          <p className="font-['Inter'] text-[18px] font-[400] text-[#B3B3B3] max-w-[500px] text-center mb-[40px] leading-[1.6]">
            We couldn't find any products at the moment. Please check back later or add new products to the inventory.
          </p>
          <button className="h-[56px] px-[40px] rounded-[12px] bg-gradient-to-br from-[#00D9FF] to-[#B84FFF] border-none font-['Rajdhani'] text-[16px] font-[700] uppercase text-white cursor-pointer shadow-[0_0_30px_rgba(0,217,255,0.4)] transition-all hover:shadow-[0_0_50px_rgba(0,217,255,0.7)] hover:-translate-y-[2px]">
            Browse Categories
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 min-[480px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[32px] animate-[fadeInUp_0.8s_cubic-bezier(0.4,0,0.2,1)_0.2s_forwards] opacity-0">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Shop;
