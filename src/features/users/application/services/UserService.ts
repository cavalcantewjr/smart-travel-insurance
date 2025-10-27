import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { IUserService } from '../../domain/interfaces/IUserService';
import {
  User,
  CreateUserData,
  UpdateUserData,
  UserFilters,
} from '../../../domain/entities';
import bcrypt from 'bcrypt';

export class UserService implements IUserService {
  constructor(private userRepository: IUserRepository) {}

  async create(data: CreateUserData): Promise<User> {
    // Validações de negócio
    if (!data.email || !data.password) {
      throw new Error('Email e senha são obrigatórios');
    }

    // Verificar se email já existe
    const existingUser = await this.userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new Error('Email já está em uso');
    }

    // Hash da senha
    const passwordHash = await bcrypt.hash(data.password, 10);

    // Criar usuário
    const userData = {
      ...data,
      password: passwordHash,
    };

    return await this.userRepository.create(userData);
  }

  async findById(id: string): Promise<User | null> {
    return await this.userRepository.findById(id);
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findByEmail(email);
  }

  async findAll(
    filters?: UserFilters
  ): Promise<{ users: User[]; total: number }> {
    return await this.userRepository.findAll(filters);
  }

  async update(id: string, data: UpdateUserData): Promise<User> {
    // Verificar se usuário existe
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      throw new Error('Usuário não encontrado');
    }

    // Se email está sendo alterado, verificar se já existe
    if (data.email && data.email !== existingUser.email) {
      const emailExists = await this.userRepository.existsByEmail(data.email);
      if (emailExists) {
        throw new Error('Email já está em uso');
      }
    }

    // Se senha está sendo alterada, fazer hash
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    return await this.userRepository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    // Verificar se usuário existe
    const userExists = await this.userRepository.existsById(id);
    if (!userExists) {
      throw new Error('Usuário não encontrado');
    }

    await this.userRepository.delete(id);
  }

  validatePassword(password: string): boolean {
    return password.length >= 6;
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
