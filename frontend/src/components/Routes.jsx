import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const PrivateRoute = () => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  if (loading) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export const AdminRoute = () => {
  const { isAuthenticated, user, loading } = useSelector((state) => state.auth);

  if (loading) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }

  return isAuthenticated && user?.role === 'admin' ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace />
  );
};
