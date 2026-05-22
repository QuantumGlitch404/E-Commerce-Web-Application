import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Layout
import Navbar from './components/layout/Navbar';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import Categories from './pages/Categories';
import Deals from './pages/Deals';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
// import Cart from './pages/Cart';
// import ProductDetails from './pages/ProductDetails';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#000000] text-white flex flex-col font-['Inter'] relative">
        <Toaster 
          position="top-center" 
          toastOptions={{
            style: {
              background: 'rgba(13, 13, 13, 0.9)',
              color: '#fff',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              fontFamily: 'Inter',
            },
            success: {
              iconTheme: { primary: '#00D9FF', secondary: '#0D0D0D' },
            },
            error: {
              iconTheme: { primary: '#FF3366', secondary: '#0D0D0D' },
            }
          }} 
        />
        
        <Navbar />
        
        <main className="flex-grow relative z-10 w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/deals" element={<Deals />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* <Route path="/cart" element={<Cart />} /> */}
            {/* <Route path="/product/:id" element={<ProductDetails />} /> */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
