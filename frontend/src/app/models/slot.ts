import { ITenantContract } from './tenantContract';

export interface ISlot {
  id: string;
  slotNumber: string;
  size: number;
  price: number;
  slotStatus: number;
  tenantContract?: ITenantContract;
}
