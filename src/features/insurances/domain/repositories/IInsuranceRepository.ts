import {
  Insurance,
  CreateInsuranceData,
  UpdateInsuranceData,
  InsuranceFilters,
} from '../../../domain/entities';

export interface IInsuranceRepository {
  // Métodos básicos de CRUD
  create(data: CreateInsuranceData): Promise<Insurance>;
  findById(id: string): Promise<Insurance | null>;
  findByPolicyNumber(policyNumber: string): Promise<Insurance | null>;
  findAll(
    filters?: InsuranceFilters
  ): Promise<{ insurances: Insurance[]; total: number }>;
  update(id: string, data: UpdateInsuranceData): Promise<Insurance>;
  delete(id: string): Promise<void>;

  // Métodos de validação
  existsByPolicyNumber(policyNumber: string): Promise<boolean>;
  existsById(id: string): Promise<boolean>;

  // Métodos específicos de negócio
  findByClientId(clientId: string): Promise<Insurance[]>;
  updateStatus(
    id: string,
    status: 'active' | 'expired' | 'canceled'
  ): Promise<Insurance>;
}
