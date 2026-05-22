import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return toast.error('Passwords do not match');
    }

    try {
      setLoading(true);
      const { data } = await axios.post('/api/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      // Handle successful registration
      localStorage.setItem('userInfo', JSON.stringify(data.user));
      toast.success('Registration successful!');
      navigate('/');
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-[120px] pb-[80px] px-6 flex items-center justify-center relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-[20%] left-[10%] w-[300px] h-[300px] rounded-full bg-[#00D9FF] opacity-[0.05] blur-[100px]"></div>
      <div className="absolute bottom-[10%] right-[10%] w-[300px] h-[300px] rounded-full bg-[#B84FFF] opacity-[0.05] blur-[100px]"></div>

      <div className="w-full max-w-[480px] glass-card p-[40px] rounded-[24px] relative z-10 animate-[fadeInUp_0.6s_cubic-bezier(0.4,0,0.2,1)_forwards]">
        <div className="text-center mb-[32px]">
          <h2 className="font-['Orbitron'] text-[32px] font-[700] text-white text-glow mb-2">Create Account</h2>
          <p className="text-[#B3B3B3]">Join LuxeShop for exclusive access.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-[20px]">
          <div className="flex flex-col gap-2">
            <label className="text-[14px] font-[500] text-[#B3B3B3] uppercase tracking-wider font-['Rajdhani']">Full Name</label>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              className="focus-glow" 
              placeholder="John Doe" 
              required 
            />
          </div>

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
            <label className="text-[14px] font-[500] text-[#B3B3B3] uppercase tracking-wider font-['Rajdhani']">Password</label>
            <input 
              type="password" 
              name="password" 
              value={formData.password} 
              onChange={handleChange} 
              className="focus-glow" 
              placeholder="••••••••" 
              required 
              minLength="6"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[14px] font-[500] text-[#B3B3B3] uppercase tracking-wider font-['Rajdhani']">Confirm Password</label>
            <input 
              type="password" 
              name="confirmPassword" 
              value={formData.confirmPassword} 
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
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>

        <p className="text-center mt-[24px] text-[#B3B3B3]">
          Already have an account?{' '}
          <Link to="/login" className="text-[#00D9FF] hover:underline font-[500]">Log in here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
