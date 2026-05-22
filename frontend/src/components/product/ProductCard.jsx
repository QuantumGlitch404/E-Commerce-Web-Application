import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiEye, FiShoppingCart, FiHeart } from 'react-icons/fi';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Fallback for missing data
  const name = product?.name || 'Premium Product';
  const price = product?.price || 0;
  const originalPrice = product?.originalPrice || null;
  const categoryName = product?.category?.name || 'Category';
  const rating = product?.averageRating || 0;
  const reviewCount = product?.numOfReviews || 0;
  const imageUrl = product?.images?.[0]?.url || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500';
  
  // Badges
  const isNew = product?.isNewArrival;
  const discount = originalPrice && price < originalPrice 
    ? Math.round(((originalPrice - price) / originalPrice) * 100) 
    : 0;

  return (
    <div 
      className="w-full bg-[rgba(13,13,13,0.6)] backdrop-blur-[10px] border border-white/5 rounded-[16px] overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-[8px] hover:shadow-[0_0_40px_rgba(0,217,255,0.3),0_24px_48px_rgba(0,0,0,0.9)] hover:border-[rgba(0,217,255,0.3)] group flex flex-col h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* IMAGE CONTAINER 1:1 Aspect Ratio */}
      <div className="relative w-full pt-[100%] bg-[#0a0a0a] overflow-hidden rounded-t-[16px]">
        <LazyLoadImage
          src={imageUrl}
          alt={name}
          effect="opacity"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-600 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-[1.08]"
          wrapperClassName="absolute inset-0"
        />

        {/* BADGES */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          {isNew && (
            <span className="bg-[#B84FFF] text-white text-[12px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-[0_0_10px_rgba(184,79,255,0.5)]">
              New
            </span>
          )}
          {discount > 0 && (
            <span className="bg-[#FF1CF7] text-white text-[12px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-[0_0_10px_rgba(255,28,247,0.5)]">
              -{discount}%
            </span>
          )}
        </div>

        {/* QUICK ACTIONS OVERLAY */}
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-3 transition-opacity duration-300 z-20 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <Link to={`/product/${product?._id}`} className="w-[48px] h-[48px] rounded-full bg-[rgba(13,13,13,0.9)] backdrop-blur-[10px] border border-white/10 text-white flex items-center justify-center text-[20px] transition-all duration-300 hover:bg-gradient-to-br hover:from-[#00D9FF] hover:to-[#B84FFF] hover:shadow-[0_0_20px_rgba(0,217,255,0.5)] hover:scale-110">
            <FiEye />
          </Link>
          <button className="w-[48px] h-[48px] rounded-full bg-[rgba(13,13,13,0.9)] backdrop-blur-[10px] border border-white/10 text-white flex items-center justify-center text-[20px] transition-all duration-300 hover:bg-gradient-to-br hover:from-[#00D9FF] hover:to-[#B84FFF] hover:shadow-[0_0_20px_rgba(0,217,255,0.5)] hover:scale-110">
            <FiHeart />
          </button>
        </div>
      </div>

      {/* CONTENT AREA */}
      <div className="p-[24px] flex flex-col gap-[12px] flex-grow">
        <span className="font-['Rajdhani'] text-[12px] font-[600] uppercase text-[#00D9FF] tracking-[0.1em]">
          {categoryName}
        </span>
        
        <Link to={`/product/${product?._id}`}>
          <h3 className="font-['Inter'] text-[18px] font-[600] text-white leading-[1.3] tracking-[-0.01em] line-clamp-2 hover:text-[#00D9FF] transition-colors">
            {name}
          </h3>
        </Link>

        {/* RATING */}
        <div className="flex items-center gap-2 mt-auto">
          <div className="flex text-[16px] gap-[4px] text-[#FFE600]">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} className={star <= Math.round(rating) ? 'opacity-100 text-glow-sm' : 'opacity-20'}>
                ★
              </span>
            ))}
          </div>
          <span className="text-[#B3B3B3] text-[14px]">({reviewCount})</span>
        </div>

        {/* PRICE */}
        <div className="flex items-baseline gap-[12px]">
          <span className="font-['Orbitron'] text-[24px] font-[700] price-glow">
            ₹{price.toLocaleString('en-IN')}
          </span>
          {originalPrice && originalPrice > price && (
            <span className="font-['Inter'] text-[18px] font-[400] text-[#666666] line-through">
              ₹{originalPrice.toLocaleString('en-IN')}
            </span>
          )}
        </div>

        {/* ADD TO CART BUTTON */}
        <button className="w-full h-[48px] mt-2 rounded-[12px] bg-gradient-to-br from-[#00D9FF] to-[#B84FFF] border-none font-['Rajdhani'] text-[16px] font-[700] uppercase text-white cursor-pointer shadow-[0_0_30px_rgba(0,217,255,0.4)] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:shadow-[0_0_50px_rgba(0,217,255,0.7)] hover:-translate-y-[2px] active:scale-95">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
