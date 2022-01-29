import { Col, Row } from 'react-bootstrap';
import { Navigate, Outlet } from 'react-router-dom';
import NavMenu from '../../../features/navMenu/NavMenu';
import { useAppSelecter } from '../../store/configureStore';

const PrivateLayout = () => {
  return <Row className="vh-100">
    <Col className="app__navigation p-0" lg={2} >
      <NavMenu />
    </Col>
    <Col className="app__content p-0">
      <Outlet></Outlet>
    </Col>
  </Row>
}
export const PrivateRoute: React.FC = ({ }) => {
  const { user } = useAppSelecter(state => state.account);
  return !!user ? <PrivateLayout /> : <Navigate to="/login" />
};

export default PrivateRoute;