import { ClientService } from '../services/ClientService';
import { IClientService } from '../../domain/interfaces/IClientService';
import { PrismaClientRepository } from '../../infra/repositories/PrismaClientRepository';
import { PrismaClient } from '@prisma/client';

export class ClientServiceFactory {
  private static prisma = new PrismaClient();
  private static clientRepository = new PrismaClientRepository(this.prisma);

  static createClientService(): IClientService {
    return new ClientService(this.clientRepository);
  }

  static getPrismaClient(): PrismaClient {
    return this.prisma;
  }
}
