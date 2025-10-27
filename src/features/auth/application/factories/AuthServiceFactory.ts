import { AuthService } from '../services/AuthService';
import { IAuthService } from '../../domain/interfaces/IAuthService';
import { UserServiceFactory } from '../../../users/application/factories/UserServiceFactory';

export class AuthServiceFactory {
  static createAuthService(): IAuthService {
    const userService = UserServiceFactory.createUserService();
    return new AuthService(userService);
  }
}
