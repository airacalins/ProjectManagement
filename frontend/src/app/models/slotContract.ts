import { Slot } from './slot';

export interface SlotContract {
  id: number;
  slot: Slot;
  contractPrice: number;
  deposit: number;
  advance: number;
  contractStartDate: string;
  contractEndDate: string;
  contractEarlyTerminationDate: string;
  contractEarlyTerminationReason: string;
  nextBillingDate: string;
  status: string;
}
