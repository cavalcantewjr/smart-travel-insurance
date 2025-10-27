import { IUserService } from '../../../users/domain/interfaces/IUserService';
import {
  IAuthService,
  LoginData,
  AuthResult,
} from '../../domain/interfaces/IAuthService';
import { User } from '../../../domain/entities';
import { signJwt, verifyJwt } from '@/lib/jwt';

export class AuthService implements IAuthService {
  constructor(private userService: IUserService) {}

  async login(data: LoginData): Promise<AuthResult> {
    // Validar credenciais
    const user = await this.userService.findByEmail(data.email);
    if (!user) {
      throw new Error('Credenciais inválidas');
    }

    const isValidPassword = await this.userService.comparePassword(
      data.password,
      user.passwordHash
    );
    if (!isValidPassword) {
      throw new Error('Credenciais inválidas');
    }

    // Gerar token JWT
    const token = signJwt({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      token,
    };
  }

  async validateToken(
    token: string
  ): Promise<Omit<User, 'passwordHash'> | null> {
    const payload = verifyJwt(token);
    if (!payload) {
      return null;
    }

    const user = await this.userService.findById(payload.userId);
    if (!user) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async logout(token: string): Promise<void> {
    // Implementar lógica de logout se necessário (blacklist de tokens, etc.)
    // Por enquanto, apenas validação básica
    const payload = verifyJwt(token);
    if (!payload) {
      throw new Error('Token inválido');
    }
  }

  validateLoginData(data: LoginData): void {
    if (!data.email || !data.password) {
      throw new Error('Email e senha são obrigatórios');
    }

    if (!this.isValidEmail(data.email)) {
      throw new Error('Email inválido');
    }

    if (data.password.length < 6) {
      throw new Error('Senha deve ter pelo menos 6 caracteres');
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
