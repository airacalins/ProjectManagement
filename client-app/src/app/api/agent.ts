import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { store } from "../store/configureStore";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
// axios.defaults.baseURL = "https://fast-badlands-66183.herokuapp.com/api/"

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.request.use(config => {
  const token = store.getState().account.user?.token;
  if(token) config.headers!.Authorization = `Bearer ${token}`;
  return config;
})

axios.interceptors.response.use(response => {
  return response;
}, (error: AxiosError) => {
  const { data, status } = error.response!;
  switch (status) {
    case 400:
      if (data.errors) {
        const modelStateErrors: string[] = [];
        for (const key in data.errors) {
          if (data.errors[key]) {
            modelStateErrors.push(data.errors[key])
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
      const navigate = useNavigate();
      navigate('/server-error');
      break;
    default:
      break;
  }
  return Promise.reject(error.response);
})

const request = {
  get: (url:string) => axios.get(url).then(responseBody),
  post: (url:string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url:string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url:string) => axios.delete(url).then(responseBody),
}

const Tenant = {
  list: () => request.get('tenants'),
  details: (id: string) => request.get(`tenants/${id}`)
}

const Account = {
  login: (values: any) => request.post('account/login', values),
  register: (values: any) => request.post('account/register', values),
  currentUser: () => request.get('account/currentUser'),
}

const agent = {
  Tenant,
  Account
}


export default agent;