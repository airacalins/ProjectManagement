import { SlotContract } from './slotContract';

export interface ITenant {  
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  dateCreated: Date;
  businessName: string;
  address: string;
  contract?: SlotContract;
}

export interface ICreateTenantInput {
  id: string;
  firstName: string;
  lastName: string;
  businessName: string;
  address: string;
  contact: string;
  slotId: string;
  startDate: string;
  endDate: string;
}