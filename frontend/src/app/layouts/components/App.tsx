import { Route, useLocation } from "react-router-dom";

import Dashboard from "../../../features/dashboard/Dashboard";

import LoginForm from "../../../features/account/LoginForm";
import SlotDetails from "../../../features/slot/SlotDetails";
import Slot from "../../../features/slot/Slot";
import AnnouncementForm from "../../../features/announcement/AnnouncementForm";
import ModeOfPayment from "../../../features/modeOfPayment/ModeOfPayment";
import ModeOfPaymentDetails from "../../../features/modeOfPayment/ModeOfPaymentDetails";
import ModeOfPaymentForm from "../../../features/modeOfPayment/ModeOfPaymentForm";
import Tenant from "../../../features/tenant/Tenant";
import PaymentDetails from "../../../features/payment/PaymentDetails";
import Announcement from "../../../features/announcement/Announcement";
import SlotForm from "../../../features/slot/SlotForm";
import TenantForm from "../../../features/tenant/TenantForm";
import Payment from "../../../features/payment/Payment";
import Map from "../../../features/map/Map";
import TenantDetails from "../../../features/tenant/TenantDetails";
import AnnouncementDetails from "../../../features/announcement/AnnouncementDetails";
import Home from "../../../features/home/Home";
import NavMenu from "../../../features/navMenu/NavMenu";
import { Col, Row } from "react-bootstrap";

function App() {
  const location = useLocation();

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
              <Route path='/dashboard' exact component={Dashboard} />
              <Route path='/map' exact component={Map} />
              <Route path={'/slots'} exact component={Slot} />
              <Route path={['/slots/create', '/slots/:id/manage']} exact key={location.key} component={SlotForm} />
              <Route path='/slots/:id/details' exact component={SlotDetails} />

              <Route path='/tenants' exact component={Tenant} />
              <Route path={['/tenants/create', "tenants/:id/manage"]} exact component={TenantForm} />
              <Route path='/tenants/:slotId/create' exact component={TenantForm} />

              <Route path='/tenants/:id/details' exact component={TenantDetails} />
              <Route path={['/payments', '/payment/:sort']} exact component={Payment} />
              <Route path='/payments/:id/details' exact component={PaymentDetails} />

              <Route path='/mode-of-payments' exact component={ModeOfPayment} />
              <Route path={['/mode-of-payments/create', "/mode-of-payments/:id/manage"]} exact component={ModeOfPaymentForm} />
              <Route path='/mode-of-payments/:id/details' exact component={ModeOfPaymentDetails} />

              <Route path='/announcements' exact component={Announcement} />
              <Route path={['/announcements/create', '/announcements/:id/manage']} exact component={AnnouncementForm} />
              <Route path='/announcements/:id/details' exact component={AnnouncementDetails} />
            </Col>
          </Row>
        )}
      />
    </>
  );
}

export default App;
