import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      const { data } = await axios.post('/api/auth/login', {
        email: formData.email,
        password: formData.password
      });

      // Handle successful login
      localStorage.setItem('userInfo', JSON.stringify(data.user));
      toast.success('Welcome back!');
      navigate('/');
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-[120px] pb-[80px] px-6 flex items-center justify-center relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-[30%] left-[20%] w-[400px] h-[400px] rounded-full bg-[#B84FFF] opacity-[0.05] blur-[120px]"></div>

      <div className="w-full max-w-[480px] glass-card p-[40px] rounded-[24px] relative z-10 animate-[fadeInUp_0.6s_cubic-bezier(0.4,0,0.2,1)_forwards]">
        <div className="text-center mb-[32px]">
          <h2 className="font-['Orbitron'] text-[32px] font-[700] text-white text-glow mb-2">Welcome Back</h2>
          <p className="text-[#B3B3B3]">Enter your credentials to access your account.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-[20px]">
          <div className="flex flex-col gap-2">
            <label className="text-[14px] font-[500] text-[#B3B3B3] uppercase tracking-wider font-['Rajdhani']">Email Address</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              className="focus-glow" 
              placeholder="john@example.com" 
              required 
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label className="text-[14px] font-[500] text-[#B3B3B3] uppercase tracking-wider font-['Rajdhani']">Password</label>
              <Link to="/forgot-password" className="text-[12px] text-[#00D9FF] hover:underline">Forgot Password?</Link>
            </div>
            <input 
              type="password" 
              name="password" 
              value={formData.password} 
              onChange={handleChange} 
              className="focus-glow" 
              placeholder="••••••••" 
              required 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={`btn-primary mt-[12px] w-full ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center mt-[24px] text-[#B3B3B3]">
          Don't have an account?{' '}
          <Link to="/register" className="text-[#00D9FF] hover:underline font-[500]">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
