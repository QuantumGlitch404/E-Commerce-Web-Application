import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import api from '../utils/api';
import { FiMail } from 'react-icons/fi';

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await api.post('/auth/forgot-password', data);
      setIsSent(true);
      toast.success('Password reset link sent to your email.');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send reset link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md glass-card rounded-xl p-8"
      >
        <div className="text-center mb-8">
          <h1 className="font-heading text-3xl font-bold text-glow mb-2">Reset Password</h1>
          <p className="text-text-secondary">
            {isSent 
              ? "Check your email for the reset link." 
              : "Enter your email to receive a password reset link."}
          </p>
        </div>

        {!isSent ? (
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

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary flex justify-center items-center"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                'Send Reset Link'
              )}
            </button>
          </form>
        ) : (
          <div className="text-center">
            <Link to="/login" className="btn-outline inline-block w-full">
              Return to Login
            </Link>
          </div>
        )}

        <p className="mt-8 text-center text-text-secondary text-sm">
          Remember your password?{' '}
          <Link to="/login" className="text-white font-medium hover:text-accent-primary transition-all">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
