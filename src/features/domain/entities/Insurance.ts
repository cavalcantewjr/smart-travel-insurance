export interface Insurance {
  id: string;
  clientId: string;
  policyNumber: string;
  coverage: string;
  startDate: Date;
  endDate: Date;
  status: 'active' | 'expired' | 'canceled';
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateInsuranceData {
  clientId: string;
  policyNumber: string;
  coverage: string;
  startDate: Date;
  endDate: Date;
}

export interface UpdateInsuranceData {
  clientId?: string;
  policyNumber?: string;
  coverage?: string;
  startDate?: Date;
  endDate?: Date;
  status?: 'active' | 'expired' | 'canceled';
}

export interface InsuranceFilters {
  clientId?: string;
  policyNumber?: string;
  coverage?: string;
  status?: 'active' | 'expired' | 'canceled';
  startDateFrom?: Date;
  startDateTo?: Date;
  endDateFrom?: Date;
  endDateTo?: Date;
  page?: number;
  limit?: number;
}
