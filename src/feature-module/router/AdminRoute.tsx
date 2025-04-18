// AdminRoute.tsx

import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../agent-dashboard/sidebar/AuthContext';



const AdminRoute = () => {
  const { isAuthenticated, hasRole } = useAuth();
  
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (!hasRole('Admin')) {
    return <Navigate to="/not-authorized" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;