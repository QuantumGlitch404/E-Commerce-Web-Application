import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

const Hero = () => {
  return (
    <section className="relative w-full h-[90vh] min-h-[600px] flex items-center overflow-hidden bg-[#000000]">
      {/* Background Radial Gradients */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(0, 217, 255, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(184, 79, 255, 0.08) 0%, transparent 50%)
          `
        }}
      ></div>

      {/* Floating Shapes Container */}
      <div className="absolute top-0 right-0 w-1/2 h-full hidden lg:block pointer-events-none">
        {/* Circle */}
        <div className="absolute top-[20%] right-[30%] w-[120px] h-[120px] rounded-full border-[2px] border-[#00D9FF] backdrop-blur-[2px] animate-[float_6s_ease-in-out_infinite]"></div>
        
        {/* Triangle (using borders) */}
        <div className="absolute top-[50%] right-[15%] w-0 h-0 border-l-[60px] border-l-transparent border-r-[60px] border-r-transparent border-b-[100px] border-b-[#B84FFF] opacity-40 backdrop-blur-[2px] animate-[floatReverse_7s_ease-in-out_infinite_1s]"></div>
        
        {/* Rounded Rectangle */}
        <div className="absolute bottom-[20%] right-[40%] w-[100px] h-[100px] rounded-[24px] border-[2px] border-[#FF1CF7] rotate-45 backdrop-blur-[2px] animate-[float_5s_ease-in-out_infinite_2s]"></div>
        
        {/* Small Hollow Circle */}
        <div className="absolute top-[70%] right-[25%] w-[40px] h-[40px] rounded-full border-[2px] border-[#00FF88] backdrop-blur-[2px] animate-[floatReverse_4s_ease-in-out_infinite_0.5s]"></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-[80px] w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-[80px]">
        
        {/* Text Content */}
        <div className="flex flex-col items-start gap-8 opacity-0 animate-[fadeInUp_0.8s_cubic-bezier(0.4,0,0.2,1)_forwards]">
          <h1 className="font-['Orbitron'] font-[800] text-[clamp(48px,8vw,96px)] leading-[1] tracking-[-0.02em] text-white text-glow m-0 p-0">
            <span className="block">Experience Luxury</span>
            <span className="block gradient-text">Shopping Redefined</span>
          </h1>
          
          <p className="font-['Inter'] font-[400] text-[20px] leading-[1.6] text-[#B3B3B3] max-w-[560px] m-0">
            Discover a curated collection of premium products designed to elevate your lifestyle. Uncompromising quality meets breathtaking aesthetics.
          </p>
          
          <div className="flex flex-wrap items-center gap-[24px] pt-4">
            <Link to="/shop" className="btn-primary group">
              Explore Products
              <FiArrowRight className="transform translate-x-0 opacity-80 group-hover:translate-x-2 group-hover:opacity-100 transition-all duration-300" />
            </Link>
            
            <Link to="/categories" className="btn-outline group">
              View Collections
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
