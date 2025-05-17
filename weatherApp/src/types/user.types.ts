export interface User {
  username: string;
  isAuthenticated: boolean;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  confirmPassword: string;
}
