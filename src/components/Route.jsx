import { Navigate } from 'react-router-dom';
import AuthModule from '../context/AuthContext';

function RouteWrapper(props) {
  const { currentUser } = AuthModule.useAuth();
  
  return currentUser !== ("") ? props.content : <Navigate to="/login" replace />;
}

export default RouteWrapper;