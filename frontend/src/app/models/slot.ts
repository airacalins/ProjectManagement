import { ITenantContract } from './tenantContract';

export interface ISlot {
  id: string;
  slotNumber: string;
  size: number;
  price?: number;
  status: SlotStatus;
  tenantContract?: ITenantContract;
}

export enum SlotStatus {
  Available = 0,
  Rented = 1,
  UnderMaintenance = 2,
  Reserved = 3
}