import { Navigate, } from 'react-router-dom';
import Dashboard from './Dashboard';

const ProtectedRoute = () => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  return isAuthenticated ? <Dashboard /> : <Navigate to="/LogIn" />;
};

export default ProtectedRoute;
