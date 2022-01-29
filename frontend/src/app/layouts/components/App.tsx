import { Route, useLocation } from "react-router-dom";
import { Col, Row } from "react-bootstrap";

import Announcement from "../../../features/announcement/Announcement";
import AnnouncementDetails from "../../../features/announcement/AnnouncementDetails";
import AnnouncementForm from "../../../features/announcement/AnnouncementForm";
import LoginForm from "../../../features/account/LoginForm";
import Dashboard from "../../../features/dashboard/Dashboard";
import Home from "../../../features/home/Home";
import Map from "../../../features/map/Map";
import ModeOfPayment from "../../../features/modeOfPayment/ModeOfPayment";
import ModeOfPaymentDetails from "../../../features/modeOfPayment/ModeOfPaymentDetails";
import ModeOfPaymentForm from "../../../features/modeOfPayment/ModeOfPaymentForm";
import NavMenu from "../../../features/navMenu/NavMenu";
import Payment from "../../../features/payment/Payment";
import PaymentDetails from "../../../features/payment/PaymentDetails";
import Slot from "../../../features/slot/Slot";
import SlotDetails from "../../../features/slot/SlotDetails";
import SlotForm from "../../../features/slot/SlotForm";
import Tenant from "../../../features/tenant/Tenant";
import TenantForm from "../../../features/tenant/TenantForm";
import TenantDetails from "../../../features/tenant/TenantDetails";
import User from "../../../features/user/User";

import Report from "../../../features/report/Report";
import UserForm from "../../../features/user/UserForm";
import Account from "../../../features/account/Account";
import TenantUpdateForm from "../../../features/tenant/TenantUpdateForm";

import UserDetails from "../../../features/user/UserDetails";
import { useAppDispatch } from "../../store/configureStore";
import { useCallback, useEffect, useState } from "react";
import { fetchCurrentUserAsync } from "../../../features/account/accountSlice";


function App() {
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  const initApp = useCallback(
    async () => {
      try {
        await dispatch(fetchCurrentUserAsync());
      } catch (error) {
        console.log(error);
      }
    }, [dispatch])

  useEffect(() => {
    initApp().then(() => setLoading(false));
  }, [initApp])

  if (loading)
    return <></>

  return (
    <>
      <Route exact path="/" component={Home} />

      <Route
        path={"/(.+)"}
        render={() => (
          <Row className="vh-100">
            <Col className="app__navigation p-0" lg={2} >
              <NavMenu />
            </Col>

            <Col className="app__content p-0">
              <Route path='/login' exact component={LoginForm} />
              <Route path='/account/:id/details' exact component={Account} />
              <Route path='/dashboard' exact component={Dashboard} />
              <Route path='/map' exact component={Map} />

              <Route path='/announcements' exact component={Announcement} />
              <Route path={['/announcements/create', '/announcements/:id/manage']} exact component={AnnouncementForm} />
              <Route path='/announcements/:id/details' exact component={AnnouncementDetails} />

              <Route path={['/invoices', '/invoice/:sort']} exact component={Payment} />
              <Route path='/invoices/:id/details' exact component={PaymentDetails} />

              <Route path='/mode-of-payments' exact component={ModeOfPayment} />
              <Route path={['/mode-of-payments/create', "/mode-of-payments/:id/manage"]} exact component={ModeOfPaymentForm} />
              <Route path='/mode-of-payments/:id/details' exact component={ModeOfPaymentDetails} />

              <Route path='/reports' exact component={Report} />

              <Route path={'/slots'} exact component={Slot} />
              <Route path={['/slots/create', '/slots/:id/manage']} exact key={location.key} component={SlotForm} />
              <Route path='/slots/:id/details' exact component={SlotDetails} />

              <Route path='/tenants' exact component={Tenant} />
              <Route path={['/tenants/create', '/tenants/:slotId/create']} exact component={TenantForm} />
              <Route path='/tenants/:id/manage' exact component={TenantUpdateForm} />
              <Route path='/tenants/:id/details' exact component={TenantDetails} />

              <Route path="/users" exact component={User} />
              <Route path="/users/create" exact component={UserForm} />
            </Col>
          </Row>
        )}
      />
    </>
  );
}

export default App;
