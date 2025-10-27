import { PrismaClient } from '@prisma/client';
import { IInsuranceRepository } from '../../domain/repositories/IInsuranceRepository';
import {
  Insurance,
  CreateInsuranceData,
  UpdateInsuranceData,
  InsuranceFilters,
} from '../../../domain/entities';

export class PrismaInsuranceRepository implements IInsuranceRepository {
  constructor(private prisma: PrismaClient) {}

  async create(data: CreateInsuranceData): Promise<Insurance> {
    const insurance = await this.prisma.insurance.create({
      data: {
        clientId: data.clientId,
        policyNumber: data.policyNumber,
        coverage: data.coverage,
        startDate: data.startDate,
        endDate: data.endDate,
        status: 'active',
      },
    });

    return {
      id: insurance.id,
      clientId: insurance.clientId,
      policyNumber: insurance.policyNumber,
      coverage: insurance.coverage,
      startDate: insurance.startDate,
      endDate: insurance.endDate,
      status: insurance.status as 'active' | 'expired' | 'canceled',
      createdAt: insurance.createdAt,
      updatedAt: insurance.updatedAt,
    };
  }

  async findById(id: string): Promise<Insurance | null> {
    const insurance = await this.prisma.insurance.findUnique({
      where: { id },
    });

    if (!insurance) return null;

    return {
      id: insurance.id,
      clientId: insurance.clientId,
      policyNumber: insurance.policyNumber,
      coverage: insurance.coverage,
      startDate: insurance.startDate,
      endDate: insurance.endDate,
      status: insurance.status as 'active' | 'expired' | 'canceled',
      createdAt: insurance.createdAt,
      updatedAt: insurance.updatedAt,
    };
  }

  async findByPolicyNumber(policyNumber: string): Promise<Insurance | null> {
    const insurance = await this.prisma.insurance.findUnique({
      where: { policyNumber },
    });

    if (!insurance) return null;

    return {
      id: insurance.id,
      clientId: insurance.clientId,
      policyNumber: insurance.policyNumber,
      coverage: insurance.coverage,
      startDate: insurance.startDate,
      endDate: insurance.endDate,
      status: insurance.status as 'active' | 'expired' | 'canceled',
      createdAt: insurance.createdAt,
      updatedAt: insurance.updatedAt,
    };
  }

  async findAll(
    filters?: InsuranceFilters
  ): Promise<{ insurances: Insurance[]; total: number }> {
    const page = filters?.page || 1;
    const limit = filters?.limit || 10;
    const skip = (page - 1) * limit;

    const where: any = {
      ...(filters?.clientId && { clientId: filters.clientId }),
      ...(filters?.policyNumber && {
        policyNumber: { contains: filters.policyNumber },
      }),
      ...(filters?.coverage && { coverage: { contains: filters.coverage } }),
      ...(filters?.status && { status: filters.status }),
      ...(filters?.startDateFrom && {
        startDate: { gte: filters.startDateFrom },
      }),
      ...(filters?.startDateTo && { startDate: { lte: filters.startDateTo } }),
      ...(filters?.endDateFrom && { endDate: { gte: filters.endDateFrom } }),
      ...(filters?.endDateTo && { endDate: { lte: filters.endDateTo } }),
    };

    const [insurances, total] = await Promise.all([
      this.prisma.insurance.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.insurance.count({ where }),
    ]);

    const formattedInsurances = insurances.map((insurance) => ({
      id: insurance.id,
      clientId: insurance.clientId,
      policyNumber: insurance.policyNumber,
      coverage: insurance.coverage,
      startDate: insurance.startDate,
      endDate: insurance.endDate,
      status: insurance.status as 'active' | 'expired' | 'canceled',
      createdAt: insurance.createdAt,
      updatedAt: insurance.updatedAt,
    }));

    return {
      insurances: formattedInsurances,
      total,
    };
  }

  async update(id: string, data: UpdateInsuranceData): Promise<Insurance> {
    const updateData: any = {};

    if (data.clientId) updateData.clientId = data.clientId;
    if (data.policyNumber) updateData.policyNumber = data.policyNumber;
    if (data.coverage) updateData.coverage = data.coverage;
    if (data.startDate) updateData.startDate = data.startDate;
    if (data.endDate) updateData.endDate = data.endDate;
    if (data.status) updateData.status = data.status;

    const insurance = await this.prisma.insurance.update({
      where: { id },
      data: updateData,
    });

    return {
      id: insurance.id,
      clientId: insurance.clientId,
      policyNumber: insurance.policyNumber,
      coverage: insurance.coverage,
      startDate: insurance.startDate,
      endDate: insurance.endDate,
      status: insurance.status as 'active' | 'expired' | 'canceled',
      createdAt: insurance.createdAt,
      updatedAt: insurance.updatedAt,
    };
  }

  async delete(id: string): Promise<void> {
    await this.prisma.insurance.delete({
      where: { id },
    });
  }

  async existsByPolicyNumber(policyNumber: string): Promise<boolean> {
    const insurance = await this.prisma.insurance.findUnique({
      where: { policyNumber },
      select: { id: true },
    });
    return !!insurance;
  }

  async existsById(id: string): Promise<boolean> {
    const insurance = await this.prisma.insurance.findUnique({
      where: { id },
      select: { id: true },
    });
    return !!insurance;
  }

  async findByClientId(clientId: string): Promise<Insurance[]> {
    const insurances = await this.prisma.insurance.findMany({
      where: { clientId },
      orderBy: { createdAt: 'desc' },
    });

    return insurances.map((insurance) => ({
      id: insurance.id,
      clientId: insurance.clientId,
      policyNumber: insurance.policyNumber,
      coverage: insurance.coverage,
      startDate: insurance.startDate,
      endDate: insurance.endDate,
      status: insurance.status as 'active' | 'expired' | 'canceled',
      createdAt: insurance.createdAt,
      updatedAt: insurance.updatedAt,
    }));
  }

  async updateStatus(
    id: string,
    status: 'active' | 'expired' | 'canceled'
  ): Promise<Insurance> {
    const insurance = await this.prisma.insurance.update({
      where: { id },
      data: { status },
    });

    return {
      id: insurance.id,
      clientId: insurance.clientId,
      policyNumber: insurance.policyNumber,
      coverage: insurance.coverage,
      startDate: insurance.startDate,
      endDate: insurance.endDate,
      status: insurance.status as 'active' | 'expired' | 'canceled',
      createdAt: insurance.createdAt,
      updatedAt: insurance.updatedAt,
    };
  }
}
