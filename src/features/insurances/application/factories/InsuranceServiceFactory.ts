import { InsuranceService } from '../services/InsuranceService';
import { IInsuranceService } from '../../domain/interfaces/IInsuranceService';
import { PrismaInsuranceRepository } from '../../infra/repositories/PrismaInsuranceRepository';
import { PrismaClient } from '@prisma/client';

export class InsuranceServiceFactory {
  private static prisma = new PrismaClient();
  private static insuranceRepository = new PrismaInsuranceRepository(
    this.prisma
  );

  static createInsuranceService(): IInsuranceService {
    return new InsuranceService(this.insuranceRepository);
  }

  static getPrismaClient(): PrismaClient {
    return this.prisma;
  }
}
