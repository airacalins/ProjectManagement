export interface IUser {
  username: string;
  token: string;
}

export interface ICreateUserInput {
  username: string,
  password: string,
  firstName: string,
  lastName: string,
  phone: string,
}

export interface IApplicationUsers {
  id: string,
  username: string,
  isEnabled: true,
  firstName: string,
  lastName: string,
  phone: string,
  email: string,
  address: string
}

export interface IUpdateUserPasswordInput {
  id: string,
  password: string,
}