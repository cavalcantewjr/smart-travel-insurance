import { UserService } from '../services/UserService';
import { IUserService } from '../../domain/interfaces/IUserService';
import { PrismaUserRepository } from '../../infra/repositories/PrismaUserRepository';
import { prisma } from '@/lib/db';

export class UserServiceFactory {
  private static userRepository = new PrismaUserRepository(prisma);

  static createUserService(): IUserService {
    return new UserService(this.userRepository);
  }
}
