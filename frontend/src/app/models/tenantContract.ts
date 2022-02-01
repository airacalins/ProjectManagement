import { ITenant } from './tenant';

export interface ITenantContract {
  id: string;
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
  tenant: ITenant;
}


export interface ITenantContractPhotoInput {
  id: string;
  file: File;
}

export interface IContractPhotos {
  id: string;
  url: string;
  dateCreated: string
}