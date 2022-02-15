export interface IUser {
  id: string;
  roles: string[];
  token: string;
  username: string;
}

export interface ICreateUserInput {
  username: string,
  password: string,
  firstName: string,
  lastName: string,
  phone: string,
  address: string
}

export interface IUpdateUserInput {
  id: string,
  password: string,
  firstName: string,
  lastName: string,
  phone: string,
  email: string,
  address: string
}

export interface IApplicationUser {
  id: string,
  username: string,
  isEnabled: true,
  firstName: string,
  lastName: string,
  phone: string,
  email: string,
  address: string,
  roles: string[]
}

export interface IUpdateUserPasswordInput {
  id: string,
  password: string,
}