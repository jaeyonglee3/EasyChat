export type Action = LoginAction | LogoutAction;

export interface LoginAction {
  type: 'LOGIN';
  payload: User;
}

export interface LogoutAction {
  type: 'LOGOUT';
}

export interface User {
  // Define the properties of the User object
  id: number;
  name: string;
  // Add any other properties relevant to your application
}
