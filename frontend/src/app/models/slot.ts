import { TenantContract } from './tenantContract';

export interface Slot {
  id: number;
  slotNumber: string;
  size: number;
  price: number;
  slotStatus: number;
  tenantContract?: TenantContract;
}
