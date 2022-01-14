import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { accountSlice } from "../../features/account/accountSlice";
import { announcementSlice } from "../../features/announcement/announcementSlice";
import { modeOfPaymentSlice } from "../../features/modeOfPayment/modeOfPaymentSlice";
import { slotSlice } from "../../features/slot/slotSlice";
import { tenantSlice } from "../../features/tenant/tenantSlice";

export const store = configureStore({
  reducer: {
    tenant: tenantSlice.reducer,
    account: accountSlice.reducer,
    announcement: announcementSlice.reducer,
    slot: slotSlice.reducer,
    modeOfPayment: modeOfPaymentSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelecter: TypedUseSelectorHook<RootState> = useSelector;