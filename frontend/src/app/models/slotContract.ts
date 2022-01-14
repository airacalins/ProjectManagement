import { ISlot } from './slot';

export interface SlotContract {
  id: string;
  slot: ISlot;
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
