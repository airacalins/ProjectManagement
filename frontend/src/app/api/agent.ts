import axios, { AxiosResponse } from 'axios';
import { TenantPayment } from '../models/tenantPayment';
import { Slot } from '../models/slot';
import { Tenant } from '../models/tenant';
import { ModeOfPayment } from '../models/modeOfPayment';
import { Announcement } from '../models/announcement';

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(async (response) => {
  try {
    await sleep(1000);
    return response;
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const request = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Slots = {
  list: () => request.get<Slot[]>('/slots'),
  details: (id: number) => request.get<Slot>(`slots/${id}`),
  create: (slot: Slot) => axios.post('./slots', slot),
  update: (slot: Slot) => axios.put(`slots/${slot.id}`, slot),
  delete: (id: number) => axios.delete(`slots/${id}`),
};

const Tenants = {
  list: () => request.get<Tenant[]>('/tenants'),
  details: (id: number) => request.get<Tenant>(`tenants/${id}`),
  create: (tenant: Tenant) => axios.post('./tenants', tenant),
  update: (tenant: Tenant) => axios.put(`tenants/${tenant.id}`, tenant),
  delete: (id: number) => axios.delete(`tenants/${id}`),
};

const TenantPayments = {
  list: () => request.get<TenantPayment[]>('/tenantPayments'),
  details: (id: number) => request.get<TenantPayment>(`tenantPayments/${id}`),
  create: (tenantPayment: TenantPayment) =>
    axios.post('./tenantPayments', tenantPayment),
  update: (tenantPayment: TenantPayment) =>
    axios.put(`tenantPayments/${tenantPayment.id}`, tenantPayment),
  delete: (id: number) => axios.delete(`tenantPayments/${id}`),
};

const ModeOfPayments = {
  list: () => request.get<ModeOfPayment[]>('/modeOfPayments'),
  details: (id: number) => request.get<ModeOfPayment>(`modeOfPayments/${id}`),
  create: (modeOfPayment: ModeOfPayment) =>
    axios.post('./modeOfPayments', modeOfPayment),
  update: (modeOfPayment: ModeOfPayment) =>
    axios.put(`modeOfPayments/${modeOfPayment.id}`, modeOfPayment),
  delete: (id: number) => axios.delete(`modeOfPayments/${id}`),
};

const Announcements = {
  list: () => request.get<Announcement[]>('/announcements'),
  details: (id: number) => request.get<Announcement>(`announcements/${id}`),
  create: (announcement: Announcement) =>
    axios.post('./announcements', announcement),
  update: (announcement: Announcement) =>
    axios.put(`announcements/${announcement.id}`, announcement),
  delete: (id: number) => axios.delete(`announcement/${id}`),
};

const agent = {
  Slots,
  Tenants,
  TenantPayments,
  ModeOfPayments,
  Announcements,
};

export default agent;
