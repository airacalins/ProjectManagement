import { Tenant } from './tenant';

export interface TenantContract {
  id: number;
  slotId: number;
  contractPrice: number;
  deposit: number;
  advance: number;
  contractStartDate: string;
  contractEndDate: string;
  contractEarlyTerminationDate: string;
  contractEarlyTerminationReason: string;
  nextBillingDate: string;
  status: string;
  tenant: Tenant;
}
