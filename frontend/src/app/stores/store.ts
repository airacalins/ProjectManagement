import { createContext, useContext } from 'react';
import SlotStore from './slotStore';
import TenantStore from './tenantStore';
import TenantPaymentStore from './tenantPaymentStore';
import ModeOfPaymentStore from './modeOfPaymentStore';
import AnnouncementStore from './announcementStore';

interface Store {
  slotStore: SlotStore;
  tenantStore: TenantStore;
  tenantPaymantStore: TenantPaymentStore;
  modeOfPaymentStore: ModeOfPaymentStore;
  announcementStore: AnnouncementStore;
}

export const store: Store = {
  slotStore: new SlotStore(),
  tenantStore: new TenantStore(),
  tenantPaymantStore: new TenantPaymentStore(),
  modeOfPaymentStore: new ModeOfPaymentStore(),
  announcementStore: new AnnouncementStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
