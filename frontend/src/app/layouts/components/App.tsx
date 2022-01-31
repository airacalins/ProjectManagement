import { Route, Routes, useLocation } from "react-router-dom";
import { useAppDispatch } from "../../store/configureStore";
import { useCallback, useEffect, useState } from "react";
import { fetchCurrentUserAsync } from "../../../features/account/accountSlice";
import PrivateRoute from "./PrivateRoute";

import Account from "../../../features/account/Account";
import Announcement from "../../../features/announcement/Announcement";
import AnnouncementDetails from "../../../features/announcement/AnnouncementDetails";
import AnnouncementForm from "../../../features/announcement/AnnouncementForm";
import Dashboard from "../../../features/dashboard/Dashboard";
import LoginForm from "../../../features/account/LoginForm";
import Map from "../../../features/map/Map";
import ModeOfPayment from "../../../features/modeOfPayment/ModeOfPayment";
import ModeOfPaymentDetails from "../../../features/modeOfPayment/ModeOfPaymentDetails";
import ModeOfPaymentForm from "../../../features/modeOfPayment/ModeOfPaymentForm";
import Payment from "../../../features/payment/Payment";
import PaymentDetails from "../../../features/payment/PaymentDetails";
import Report from "../../../features/report/Report";
import Slot from "../../../features/slot/Slot";
import SlotDetails from "../../../features/slot/SlotDetails";
import SlotForm from "../../../features/slot/SlotForm";
import Tenant from "../../../features/tenant/Tenant";
import TenantForm from "../../../features/tenant/TenantForm";
import TenantDetails from "../../../features/tenant/TenantDetails";
import TenantUpdateForm from "../../../features/tenant/TenantUpdateForm";
import User from "../../../features/user/User";
import UserDetails from "../../../features/user/UserDetails";
import UserForm from "../../../features/user/UserForm";

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
      <Routes>
        <Route path='/' element={<PrivateRoute />}>
          <Route path='/' element={<Dashboard />} />
          <Route path='/account/:id/details' element={<Account />} />
          <Route path='/map' element={<Map />} />

          <Route path='/announcements' element={<Announcement />} />
          <Route path={'/announcements/create'} element={<AnnouncementForm />} />
          <Route path={'/announcements/:id/manage'} element={<AnnouncementForm />} />
          <Route path='/announcements/:id/details' element={<AnnouncementDetails />} />

          <Route path='/mode-of-payments' element={<ModeOfPayment />} />
          <Route path='/mode-of-payments' element={<ModeOfPayment />} />
          <Route path={'/mode-of-payments/create'} element={<ModeOfPaymentForm />} />
          <Route path={"/mode-of-payments/:id/manage"} element={<ModeOfPaymentForm />} />
          <Route path='/mode-of-payments/:id/details' element={<ModeOfPaymentDetails />} />

          <Route path={'/invoices'} element={<Payment />} />
          <Route path={'/invoices/:filter'} element={<Payment />} />
          <Route path='/invoices/:id/details' element={<PaymentDetails />} />

          <Route path='/reports' element={<Report />} />

          <Route path={'/slots'} element={<Slot />} />
          <Route path={'/slots/:filter'} element={<Slot />} />
          <Route path={'/slots/create'} element={<SlotForm />} />
          <Route path={'/slots/:id/manage'} element={<SlotForm />} />
          <Route path='/slots/:id/details' element={<SlotDetails />} />

          <Route path='/tenants' element={<Tenant />} />
          <Route path={'/tenants/create'} element={<TenantForm />} />
          <Route path={'/tenants/:slotId/create'} element={<TenantForm />} />
          <Route path='/tenants/:id/manage' element={<TenantForm />} />
          <Route path='/tenants/:id/details' element={<TenantDetails />} />

          <Route path="/users" element={<User />} />
          <Route path="/users/:id/details" element={<UserDetails />} />
          <Route path="/users/create" element={<UserForm />} />
        </Route>

        <Route path='/login' element={<LoginForm />} />
      </Routes>
    </>
  );
}

export default App;
