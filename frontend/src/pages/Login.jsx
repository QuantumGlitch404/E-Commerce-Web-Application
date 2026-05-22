import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import api from '../utils/api';
import { setCredentials } from '../redux/slices/authSlice';
import { FiMail, FiLock } from 'react-icons/fi';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await api.post('/auth/login', data);
      dispatch(setCredentials({ user: res.data.data, token: res.data.token }));
      toast.success('Welcome back!');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="w-full max-w-md glass-card rounded-xl p-8"
      >
        <div className="text-center mb-8">
          <h1 className="font-heading text-3xl font-bold text-glow mb-2">Welcome Back</h1>
          <p className="text-text-secondary">Sign in to continue your premium experience.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-text-secondary">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted">
                <FiMail />
              </div>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="w-full pl-10 bg-background-card border border-[rgba(255,255,255,0.1)] rounded-md px-4 py-3 text-white focus-ring transition-all duration-300"
                placeholder="you@example.com"
              />
            </div>
            {errors.email && <p className="text-status-error text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-text-secondary">Password</label>
              <Link to="/forgot-password" className="text-sm text-accent-primary hover:text-glow transition-all">Forgot Password?</Link>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted">
                <FiLock />
              </div>
              <input
                type="password"
                {...register("password", { required: "Password is required" })}
                className="w-full pl-10 bg-background-card border border-[rgba(255,255,255,0.1)] rounded-md px-4 py-3 text-white focus-ring transition-all duration-300"
                placeholder="••••••••"
              />
            </div>
            {errors.password && <p className="text-status-error text-sm mt-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary flex justify-center items-center"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-text-secondary text-sm">
          Don't have an account?{' '}
          <Link to="/register" className="text-white font-medium hover:text-accent-primary transition-all">
            Create one
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
