import { SlotContract } from './slotContract';

export interface ITenant {  
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  dateCreated: Date;
  
  companyName: string;
  address: string;
  slotContract?: SlotContract;
}
