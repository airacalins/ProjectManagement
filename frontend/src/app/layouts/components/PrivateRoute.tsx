import { Redirect } from 'react-router-dom';
import { useAppSelecter } from '../../store/configureStore';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAppSelecter(state => state.account);

  if (!user) {
    return <Redirect to="/login" />;
  }

  return children;
};

export default PrivateRoute;