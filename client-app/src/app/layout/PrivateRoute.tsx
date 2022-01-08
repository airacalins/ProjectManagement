import { Navigate, Route, useLocation } from 'react-router-dom';
import { useAppSelecter } from '../store/configureStore';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  let location = useLocation();

  const { user } = useAppSelecter(state => state.account);

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

export default PrivateRoute;