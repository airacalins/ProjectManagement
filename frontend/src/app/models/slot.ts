import { ITenantContract } from './tenantContract';

export interface ISlot {
  id: string;
  slotNumber: string;
  size: number;
  price?: number;
  slotStatus: slotStatus;
  tenantContract?: ITenantContract;
}

export enum slotStatus {
  Available,
  Rented,
  UnderMaintenance,
  Reserved
}