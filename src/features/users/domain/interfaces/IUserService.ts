import {
  User,
  CreateUserData,
  UpdateUserData,
  UserFilters,
} from '../../../domain/entities';

export interface IUserService {
  create(data: CreateUserData): Promise<User>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findAll(filters?: UserFilters): Promise<{ users: User[]; total: number }>;
  update(id: string, data: UpdateUserData): Promise<User>;
  delete(id: string): Promise<void>;
  validatePassword(password: string): boolean;
  hashPassword(password: string): Promise<string>;
  comparePassword(password: string, hash: string): Promise<boolean>;
}
