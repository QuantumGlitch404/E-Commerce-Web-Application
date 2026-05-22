import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import api from '../utils/api';
import { FiLock } from 'react-icons/fi';

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const password = watch("password");

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await api.put(`/auth/reset-password/${token}`, { password: data.password });
      toast.success('Password updated successfully. Please login.');
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md glass-card rounded-xl p-8"
      >
        <div className="text-center mb-8">
          <h1 className="font-heading text-3xl font-bold text-glow mb-2">Create New Password</h1>
          <p className="text-text-secondary">Your new password must be different from previous used passwords.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1 text-text-secondary">New Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted">
                <FiLock />
              </div>
              <input
                type="password"
                {...register("password", { 
                  required: "Password is required",
                  minLength: { value: 8, message: "Must be at least 8 characters" },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message: "Must include uppercase, lowercase, number, and special character"
                  }
                })}
                className="w-full pl-10 bg-background-card border border-[rgba(255,255,255,0.1)] rounded-md px-4 py-3 text-white focus-ring transition-all duration-300"
                placeholder="••••••••"
              />
            </div>
            {errors.password && <p className="text-status-error text-sm mt-1">{errors.password.message}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1 text-text-secondary">Confirm New Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted">
                <FiLock />
              </div>
              <input
                type="password"
                {...register("confirmPassword", { 
                  required: "Please confirm your password",
                  validate: value => value === password || "Passwords do not match"
                })}
                className="w-full pl-10 bg-background-card border border-[rgba(255,255,255,0.1)] rounded-md px-4 py-3 text-white focus-ring transition-all duration-300"
                placeholder="••••••••"
              />
            </div>
            {errors.confirmPassword && <p className="text-status-error text-sm mt-1">{errors.confirmPassword.message}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary flex justify-center items-center mt-4"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              'Reset Password'
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ResetPassword;
