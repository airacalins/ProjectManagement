import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import { accountSlice } from "../../features/account/accountSlice";
import { announcementSlice } from "../../features/announcement/announcementSlice";
import { dashboardSlice } from "../../features/dashboard/DashboardSlice";
import { invoiceSlice } from "../../features/payment/invoiceSlice";
import { modeOfPaymentSlice } from "../../features/modeOfPayment/modeOfPaymentSlice";
import { slotSlice } from "../../features/slot/slotSlice";
import { tenantSlice } from "../../features/tenant/tenantSlice";
import { userSlice } from "../../features/user/UserSlice";
import { reportSlice } from "../../features/report/reportSlice";

export const store = configureStore({
  reducer: {
    account: accountSlice.reducer,
    announcement: announcementSlice.reducer,
    dashboard: dashboardSlice.reducer,
    invoice: invoiceSlice.reducer,
    modeOfPayment: modeOfPaymentSlice.reducer,
    slot: slotSlice.reducer,
    tenant: tenantSlice.reducer,
    user: userSlice.reducer,
    report: reportSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelecter: TypedUseSelectorHook<RootState> = useSelector;