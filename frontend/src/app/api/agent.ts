import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { ICreateTenantInput } from '../models/tenant';
import { store } from '../store/configureStore';
import history from '../utils/history';

axios.defaults.baseURL = 'https://fast-badlands-66183.herokuapp.com/api/';

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.request.use((config) => {
  const token = store.getState().account.user?.token;
  if (token) config.headers!.Authorization = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    const { data, status } = error.response!;
    switch (status) {
      case 400:
        if (data.errors) {
          const modelStateErrors: string[] = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modelStateErrors.push(data.errors[key]);
            }
          }
          throw modelStateErrors.flat();
        }
        toast.error(data.title);
        break;
      case 401:
        toast.error(data.title || 'Unauthorized');
        break;
      case 500:
        history.push('/server-error');
        break;
      default:
        break;
    }
    return Promise.reject(error.response);
  }
);

const request = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
  fileUpload: (url: string, body: {}) => axios.post(url, body, { headers: { 'Content-Type': 'multipart/form-data' }})
};

const Account = {
  login: (values: any) => request.post('account/login', values),
  register: (values: any) => request.post('account/register', values),
  currentUser: () => request.get('account/currentUser'),
};

const Announcement = {
  list: () => request.get('announcements'),
  details: (id: string) => request.get(`announcements/${id}`),
  create: (values: any) => request.post('announcements', values),
  update: (values: any) => request.put('announcements', values),
  delete: (id: string) => request.delete(`announcements/${id}`),
};

const Invoice = {
  list: () => request.get('invoices'),
  details: (id: string) => request.get(`invoices/${id}`),
  create: (values: any) => request.post('invoices', values),
  update: (values: any) => request.put('invoices', values),
  updatePaymentStatus: (values: any) => request.put('invoices/update-payment-status', values)
};

const ModeOfPayment = {
  list: () => request.get('modeofpayments'),
  details: (id: string) => request.get(`modeofpayments/${id}`),
  create: (values: any) => request.post('modeofpayments', values),
  update: (values: any) => request.put('modeofpayments', values),
  delete: (id: string) => request.delete(`modeofpayments/${id}`),
};

const Slot = {
  list: () => request.get('slots'),
  details: (id: string) => request.get(`slots/${id}`),
  create: (values: any) => request.post('slots', values),
  update: (values: any) => request.put('slots', values),
  delete: (id: string) => request.delete(`slots/${id}`),
};

const Tenant = {
  list: () => request.get('tenants'),
  details: (id: string) => request.get(`tenants/${id}`),
  create: (values: ICreateTenantInput) => request.post('tenants', values),
  update: (values: any) => request.put('tenants', values),
};

const Users = {
  list: () => request.get('users'),
  details: (id: string) => request.get(`users/${id}`),
  create: (values: any) => request.post('users', values),
  update: (values: any) => request.put('users', values),
  delete: (id: string) => request.delete(`users/${id}`),
}

const agent = {
  Account,
  Announcement,
  ModeOfPayment,
  Invoice,
  Slot,
  Tenant,
  Users
};

export default agent;
