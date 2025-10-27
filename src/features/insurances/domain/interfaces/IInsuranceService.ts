import {
  Insurance,
  CreateInsuranceData,
  UpdateInsuranceData,
  InsuranceFilters,
} from '../../../domain/entities';

export interface IInsuranceService {
  create(data: CreateInsuranceData): Promise<Insurance>;
  findById(id: string): Promise<Insurance | null>;
  findAll(
    filters?: InsuranceFilters
  ): Promise<{ insurances: Insurance[]; total: number }>;
  update(id: string, data: UpdateInsuranceData): Promise<Insurance>;
  delete(id: string): Promise<void>;
  validateInsuranceData(data: CreateInsuranceData | UpdateInsuranceData): void;
  checkDateRange(startDate: Date, endDate: Date): void;
}
