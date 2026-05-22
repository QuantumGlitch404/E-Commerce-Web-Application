import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

const Hero = () => {
  // Container variants for staggering children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
  };

  return (
    <div className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-accent-primary blur-[150px] opacity-20 mix-blend-screen animate-[pulse_10s_infinite_alternate]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent-secondary blur-[120px] opacity-15 mix-blend-screen animate-[pulse_15s_infinite_alternate]" />
      
      {/* Floating Particles */}
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white blur-[1px]"
          style={{
            width: Math.random() * 4 + 2 + 'px',
            height: Math.random() * 4 + 2 + 'px',
            top: Math.random() * 100 + '%',
            left: Math.random() * 100 + '%',
            opacity: Math.random() * 0.5 + 0.1,
            animation: `floatAnimation ${Math.random() * 10 + 5}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`,
            boxShadow: `0 0 10px ${i % 2 === 0 ? '#00D9FF' : '#FF1CF7'}`,
          }}
        />
      ))}

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 w-full z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-start text-left"
        >
          <motion.div variants={itemVariants} className="mb-4">
            <span className="font-accent text-sm md:text-base uppercase tracking-[0.2em] text-accent-primary font-bold">
              Premium Collection 2024
            </span>
          </motion.div>
          
          <motion.h1 
            variants={itemVariants}
            className="font-heading text-h1 font-black leading-tight mb-6 gradient-text"
          >
            Experience <br className="hidden md:block" />
            <span className="text-white text-glow">Luxury Shopping</span> <br className="hidden md:block" />
            Redefined
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-text-secondary text-lg max-w-[500px] mb-10 leading-relaxed"
          >
            Discover curated products with cutting-edge technology. Immerse yourself in a world where design meets perfection.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
            <Link to="/shop" className="btn-primary group flex items-center gap-2">
              Shop Now
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/categories" className="btn-outline">
              Explore Categories
            </Link>
          </motion.div>
        </motion.div>

        {/* Right Content - Abstract 3D Shapes */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="relative h-[400px] lg:h-[600px] hidden md:block"
        >
          {/* Central Glow Circle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-accent-primary rounded-full shadow-glow-lg opacity-50 animate-[spin_20s_linear_infinite]" />
          
          {/* Floating Rectangles */}
          <div className="absolute top-[20%] left-[10%] w-32 h-40 glass-card rounded-2xl border-l-2 border-accent-primary shadow-glow-sm transform rotate-12 animate-[floatAnimation_5s_ease-in-out_infinite]" />
          <div className="absolute bottom-[20%] right-[10%] w-40 h-48 glass-card rounded-2xl border-b-2 border-accent-secondary shadow-glow-sm transform -rotate-12 animate-[floatAnimation_7s_ease-in-out_infinite_0.5s]" />
          
          {/* Main Display Card */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[380px] bg-background-card border border-[rgba(255,255,255,0.1)] rounded-xl shadow-card overflow-hidden z-20 group">
            <div className="absolute inset-0 bg-gradient-to-br from-[rgba(0,217,255,0.1)] to-[rgba(184,79,255,0.1)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            {/* Abstract Image Placeholder for premium product */}
            <div className="w-full h-full p-4 flex flex-col justify-end relative">
               <div className="absolute top-4 right-4 bg-accent-tertiary px-3 py-1 rounded-full text-xs font-accent font-bold tracking-widest shadow-glow-pink">NEW</div>
               <div className="w-full h-[60%] bg-gradient-to-t from-background-secondary to-transparent absolute bottom-0 left-0" />
               <h3 className="relative z-10 font-heading text-xl font-bold mb-1">Cyber Headphones</h3>
               <p className="relative z-10 font-accent text-accent-primary font-bold tracking-wider">₹24,999</p>
            </div>
          </div>
        </motion.div>

      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce"
      >
        <span className="text-xs text-text-muted font-accent uppercase tracking-widest">Scroll</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-accent-primary to-transparent" />
      </motion.div>
    </div>
  );
};

export default Hero;
