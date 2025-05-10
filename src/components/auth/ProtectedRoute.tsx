
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';

const ProtectedRoute = () => {
  const { token, user } = useAppSelector((state) => state.auth);
  const location = useLocation();

  if (!token) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Additional role-based protection could be added here
  // For example:
  // if (location.pathname.startsWith('/admin') && user?.role !== 'admin') {
  //   return <Navigate to="/" replace />;
  // }

  return <Outlet />;
};

export default ProtectedRoute;
