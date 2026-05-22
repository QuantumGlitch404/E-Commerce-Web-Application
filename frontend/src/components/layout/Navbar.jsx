import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiSearch, FiShoppingCart, FiUser, FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ease-in-out ${
          scrolled ? 'h-[64px] glass-nav-scrolled' : 'h-[80px] glass-nav'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 md:px-[80px] h-full flex items-center justify-between">
          
          {/* LOGO */}
          <Link to="/" className="font-['Orbitron'] text-[24px] md:text-[32px] font-bold gradient-text tracking-[0.05em]">
            LuxeShop
          </Link>

          {/* DESKTOP NAV LINKS */}
          <div className="hidden md:flex items-center gap-[48px]">
            {[
              { name: 'Home', path: '/' },
              { name: 'Shop', path: '/shop' },
              { name: 'Categories', path: '/categories' },
              { name: 'Deals', path: '/deals' }
            ].map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className="font-['Rajdhani'] text-[16px] font-semibold text-[#B3B3B3] uppercase tracking-[0.05em] relative transition-colors duration-300 hover:text-[#00D9FF] group"
              >
                {link.name}
                <span className="absolute -bottom-[8px] left-0 w-0 h-[2px] gradient-primary transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* ICONS */}
          <div className="flex items-center gap-4 md:gap-[24px]">
            <button className="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-transparent border border-white/10 text-white text-[20px] transition-all duration-300 hover:bg-[#00D9FF]/10 hover:border-[#00D9FF] hover:shadow-[0_0_20px_rgba(0,217,255,0.3)]">
              <FiSearch />
            </button>
            
            <Link to="/cart" className="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-transparent border border-white/10 text-white text-[20px] transition-all duration-300 hover:bg-[#00D9FF]/10 hover:border-[#00D9FF] hover:shadow-[0_0_20px_rgba(0,217,255,0.3)] relative">
              <FiShoppingCart />
              <span className="absolute -top-[4px] -right-[4px] w-[20px] h-[20px] rounded-full bg-[#FF1CF7] text-white font-['Inter'] text-[12px] font-bold flex items-center justify-center shadow-[0_0_10px_rgba(255,28,247,0.5)]">
                3
              </span>
            </Link>
            
            <Link to="/login" className="hidden md:flex w-[40px] h-[40px] items-center justify-center rounded-full bg-transparent border border-white/10 text-white text-[20px] transition-all duration-300 hover:bg-[#00D9FF]/10 hover:border-[#00D9FF] hover:shadow-[0_0_20px_rgba(0,217,255,0.3)]">
              <FiUser />
            </Link>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden text-white text-2xl"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU FULL SCREEN OVERLAY */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0A0A0A]/95 backdrop-blur-xl flex flex-col items-center justify-center pt-20 md:hidden animate-in fade-in duration-300">
          <div className="flex flex-col items-center gap-8 text-center">
            {[
              { name: 'Home', path: '/' },
              { name: 'Shop', path: '/shop' },
              { name: 'Categories', path: '/categories' },
              { name: 'Deals', path: '/deals' },
              { name: 'Account', path: '/login' }
            ].map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className="font-['Orbitron'] text-2xl font-bold text-white hover:text-[#00D9FF] transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
