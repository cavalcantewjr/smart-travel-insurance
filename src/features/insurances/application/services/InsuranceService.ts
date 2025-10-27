import { IInsuranceRepository } from '../../domain/repositories/IInsuranceRepository';
import { IInsuranceService } from '../../domain/interfaces/IInsuranceService';
import {
  Insurance,
  CreateInsuranceData,
  UpdateInsuranceData,
  InsuranceFilters,
} from '../../../domain/entities';

export class InsuranceService implements IInsuranceService {
  constructor(private insuranceRepository: IInsuranceRepository) {}

  async create(data: CreateInsuranceData): Promise<Insurance> {
    // Validações de negócio
    if (!data.clientId || !data.policyNumber || !data.coverage) {
      throw new Error(
        'Cliente, número da apólice e cobertura são obrigatórios'
      );
    }

    if (!data.startDate || !data.endDate) {
      throw new Error('Data de início e fim são obrigatórias');
    }

    // Verificar se data de fim é posterior à data de início
    if (data.endDate <= data.startDate) {
      throw new Error('Data de fim deve ser posterior à data de início');
    }

    // Verificar se número da apólice já existe
    const existingInsurance = await this.insuranceRepository.findByPolicyNumber(
      data.policyNumber
    );
    if (existingInsurance) {
      throw new Error('Número da apólice já está em uso');
    }

    // Determinar status baseado nas datas
    const now = new Date();
    let status: 'active' | 'expired' | 'canceled' = 'active';

    if (data.endDate < now) {
      status = 'expired';
    }

    const insuranceData = {
      ...data,
      status,
    };

    return await this.insuranceRepository.create(insuranceData);
  }

  async findById(id: string): Promise<Insurance | null> {
    return await this.insuranceRepository.findById(id);
  }

  async getInsuranceByPolicyNumber(policyNumber: string): Promise<Insurance> {
    const insurance =
      await this.insuranceRepository.findByPolicyNumber(policyNumber);
    if (!insurance) {
      throw new Error('Apólice não encontrada');
    }
    return insurance;
  }

  async findAll(
    filters?: InsuranceFilters
  ): Promise<{ insurances: Insurance[]; total: number }> {
    return await this.insuranceRepository.findAll(filters);
  }

  async getInsurancesByClientId(clientId: string): Promise<Insurance[]> {
    return await this.insuranceRepository.findByClientId(clientId);
  }

  async update(id: string, data: UpdateInsuranceData): Promise<Insurance> {
    // Verificar se apólice existe
    const existingInsurance = await this.insuranceRepository.findById(id);
    if (!existingInsurance) {
      throw new Error('Apólice não encontrada');
    }

    // Se número da apólice está sendo alterado, verificar se já existe
    if (
      data.policyNumber &&
      data.policyNumber !== existingInsurance.policyNumber
    ) {
      const policyExists = await this.insuranceRepository.existsByPolicyNumber(
        data.policyNumber
      );
      if (policyExists) {
        throw new Error('Número da apólice já está em uso');
      }
    }

    // Validações de datas
    if (data.startDate && data.endDate && data.endDate <= data.startDate) {
      throw new Error('Data de fim deve ser posterior à data de início');
    }

    return await this.insuranceRepository.update(id, data);
  }

  async cancelInsurance(id: string): Promise<Insurance> {
    // Verificar se apólice existe
    const existingInsurance = await this.insuranceRepository.findById(id);
    if (!existingInsurance) {
      throw new Error('Apólice não encontrada');
    }

    if (existingInsurance.status === 'canceled') {
      throw new Error('Apólice já está cancelada');
    }

    return await this.insuranceRepository.updateStatus(id, 'canceled');
  }

  async delete(id: string): Promise<void> {
    // Verificar se apólice existe
    const insuranceExists = await this.insuranceRepository.existsById(id);
    if (!insuranceExists) {
      throw new Error('Apólice não encontrada');
    }

    await this.insuranceRepository.delete(id);
  }

  validateInsuranceData(data: CreateInsuranceData | UpdateInsuranceData): void {
    if (
      'policyNumber' in data &&
      data.policyNumber &&
      data.policyNumber.trim().length === 0
    ) {
      throw new Error('Número da apólice é obrigatório');
    }

    if (
      'coverage' in data &&
      data.coverage &&
      data.coverage.trim().length === 0
    ) {
      throw new Error('Cobertura é obrigatória');
    }

    if (
      'startDate' in data &&
      'endDate' in data &&
      data.startDate &&
      data.endDate
    ) {
      this.checkDateRange(data.startDate, data.endDate);
    }
  }

  checkDateRange(startDate: Date, endDate: Date): void {
    if (endDate <= startDate) {
      throw new Error('Data de fim deve ser posterior à data de início');
    }
  }
}
