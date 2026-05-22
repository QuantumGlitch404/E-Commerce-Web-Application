import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiShoppingBag, FiUser, FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const { user } = useSelector(state => state.auth);
  // Assuming cart slice will be added: const { cartItems } = useSelector(state => state.cart);
  const cartItemCount = 0; // Placeholder

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Categories', path: '/categories' },
    { name: 'Deals', path: '/deals' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'h-[60px] glass-nav shadow-card' : 'h-[80px] bg-transparent border-b border-[rgba(255,255,255,0.05)]'
        }`}
      >
        <div className="max-w-[1400px] mx-auto h-full px-4 md:px-8 flex items-center justify-between">
          
          {/* LEFT: Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-transparent border-2 border-accent-primary relative overflow-hidden group-hover:shadow-glow-sm transition-all">
              <div className="absolute inset-2 border-2 border-accent-secondary rotate-45 transform origin-center"></div>
            </div>
            <span className="font-heading font-bold text-xl md:text-2xl gradient-text group-hover:text-glow transition-all tracking-wider">
              LUXESHOP
            </span>
          </Link>

          {/* CENTER: Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="font-accent text-base font-medium text-text-primary hover:text-accent-primary relative group py-2"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-accent-primary shadow-glow-sm transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* RIGHT: Actions */}
          <div className="flex items-center gap-4 md:gap-6">
            <button className="text-text-primary hover:text-accent-primary hover:scale-110 hover:text-glow transition-all">
              <FiSearch size={22} />
            </button>
            
            <Link to="/cart" className="relative text-text-primary hover:text-accent-primary hover:scale-110 hover:text-glow transition-all">
              <FiShoppingBag size={22} />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent-tertiary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-glow-pink">
                  {cartItemCount}
                </span>
              )}
            </Link>

            <Link to={user ? "/dashboard" : "/login"} className="hidden md:block text-text-primary hover:text-accent-primary hover:scale-110 hover:text-glow transition-all">
              {user && user.avatar?.url ? (
                <img src={user.avatar.url} alt="Profile" className="w-6 h-6 rounded-full border border-accent-primary" />
              ) : (
                <FiUser size={22} />
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden text-text-primary hover:text-accent-primary transition-all"
              onClick={() => setMobileMenuOpen(true)}
            >
              <FiMenu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[rgba(0,0,0,0.8)] backdrop-blur-sm z-[60] md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-[80%] max-w-sm bg-background-secondary border-l border-[rgba(255,255,255,0.05)] z-[70] md:hidden flex flex-col shadow-[-10px_0_30px_rgba(0,0,0,0.8)]"
            >
              <div className="flex items-center justify-between p-6 border-b border-[rgba(255,255,255,0.05)]">
                <span className="font-heading font-bold text-xl gradient-text">MENU</span>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-text-secondary hover:text-status-error transition-colors"
                >
                  <FiX size={24} />
                </button>
              </div>
              <div className="flex flex-col p-6 gap-6">
                {navLinks.map((link, i) => (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={link.name}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-xl font-accent font-medium text-text-primary hover:text-accent-primary"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
                
                <div className="border-t border-[rgba(255,255,255,0.05)] pt-6 mt-4">
                  <Link 
                    to={user ? "/dashboard" : "/login"}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 text-lg font-accent text-text-primary hover:text-accent-primary"
                  >
                    <FiUser /> {user ? 'My Dashboard' : 'Sign In / Register'}
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
