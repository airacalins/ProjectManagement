import { SlotContract } from './slotContract';

export interface Tenant {
  id: number;
  fullName: string;
  companyName: string;
  address: string;
  contact: string;
  slotContract?: SlotContract;
}
