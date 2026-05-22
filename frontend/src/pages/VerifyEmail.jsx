import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../utils/api';
import { FiCheckCircle, FiXCircle } from 'react-icons/fi';

const VerifyEmail = () => {
  const [status, setStatus] = useState('loading'); // loading, success, error
  const [message, setMessage] = useState('');
  const { token } = useParams();

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await api.get(`/auth/verify-email/${token}`);
        setStatus('success');
        setMessage(res.data.message);
      } catch (error) {
        setStatus('error');
        setMessage(error.response?.data?.message || 'Verification failed');
      }
    };
    verify();
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md glass-card rounded-xl p-8 text-center"
      >
        {status === 'loading' && (
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-accent-primary border-t-transparent rounded-full animate-spin mb-6"></div>
            <h1 className="font-heading text-2xl font-bold text-glow mb-2">Verifying Email...</h1>
            <p className="text-text-secondary">Please wait while we verify your email address.</p>
          </div>
        )}

        {status === 'success' && (
          <div className="flex flex-col items-center">
            <FiCheckCircle className="text-6xl text-status-success mb-6" />
            <h1 className="font-heading text-2xl font-bold text-glow mb-2">Email Verified!</h1>
            <p className="text-text-secondary mb-8">{message}</p>
            <Link to="/login" className="btn-primary w-full inline-block">
              Continue to Login
            </Link>
          </div>
        )}

        {status === 'error' && (
          <div className="flex flex-col items-center">
            <FiXCircle className="text-6xl text-status-error mb-6" />
            <h1 className="font-heading text-2xl font-bold text-glow mb-2">Verification Failed</h1>
            <p className="text-text-secondary mb-8">{message}</p>
            <Link to="/register" className="btn-outline w-full inline-block">
              Back to Registration
            </Link>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default VerifyEmail;
