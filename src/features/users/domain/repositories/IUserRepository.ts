import {
  User,
  CreateUserData,
  UpdateUserData,
  UserFilters,
} from '../../../domain/entities';

export interface IUserRepository {
  // Métodos básicos de CRUD
  create(data: CreateUserData): Promise<User>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findAll(filters?: UserFilters): Promise<{ users: User[]; total: number }>;
  update(id: string, data: UpdateUserData): Promise<User>;
  delete(id: string): Promise<void>;

  // Métodos de validação
  existsByEmail(email: string): Promise<boolean>;
  existsById(id: string): Promise<boolean>;
}
