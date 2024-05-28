import { useAuth } from '../context/authContext';
import { Navigate } from 'react-router-dom';
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? children : <Navigate to="../in" />;
};

export default ProtectedRoute;
