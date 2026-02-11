
import { Navigate } from 'react-router-dom'
import { getRole, isLoggedIn } from './Auth';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({children,allowedRoles}) => {
  const{role} =useAuth();
   if (!role) {
    return <Navigate to="/" replace />;
  }
  
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" replace />
  }
  return children;
}

export default ProtectedRoute;
