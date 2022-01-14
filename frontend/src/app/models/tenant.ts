import { SlotContract } from './slotContract';

export interface ITenant {  
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  dateCreated: Date;

  
  fullName: string;
  companyName: string;
  address: string;
  contact: string;
  slotContract?: SlotContract;
}
