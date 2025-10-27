import { User } from '../../../domain/entities';

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResult {
  user: Omit<User, 'passwordHash'>;
  token: string;
}

export interface IAuthService {
  login(data: LoginData): Promise<AuthResult>;
  validateToken(token: string): Promise<Omit<User, 'passwordHash'> | null>;
  logout(token: string): Promise<void>;
  validateLoginData(data: LoginData): void;
}
