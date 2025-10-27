import { PrismaClient } from '@prisma/client';
import { IClientRepository } from '../../domain/repositories/IClientRepository';
import {
  Client,
  CreateClientData,
  UpdateClientData,
  ClientFilters,
} from '../../../domain/entities';

export class PrismaClientRepository implements IClientRepository {
  constructor(private prisma: PrismaClient) {}

  async create(data: CreateClientData): Promise<Client> {
    const client = await this.prisma.client.create({
      data: {
        name: data.name,
        email: data.email || null,
        phone: data.phone || null,
      },
    });

    return {
      id: client.id,
      name: client.name,
      email: client.email,
      phone: client.phone,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    };
  }

  async findById(id: string): Promise<Client | null> {
    const client = await this.prisma.client.findUnique({
      where: { id },
    });

    if (!client) return null;

    return {
      id: client.id,
      name: client.name,
      email: client.email,
      phone: client.phone,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    };
  }

  async findAll(
    filters?: ClientFilters
  ): Promise<{ clients: Client[]; total: number }> {
    const page = filters?.page || 1;
    const limit = filters?.limit || 10;
    const skip = (page - 1) * limit;

    const where = {
      ...(filters?.name && { name: { contains: filters.name } }),
      ...(filters?.email && { email: { contains: filters.email } }),
      ...(filters?.phone && { phone: { contains: filters.phone } }),
    };

    const [clients, total] = await Promise.all([
      this.prisma.client.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.client.count({ where }),
    ]);

    const formattedClients = clients.map((client) => ({
      id: client.id,
      name: client.name,
      email: client.email,
      phone: client.phone,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    }));

    return {
      clients: formattedClients,
      total,
    };
  }

  async update(id: string, data: UpdateClientData): Promise<Client> {
    const updateData: any = {};

    if (data.name) updateData.name = data.name;
    if (data.email !== undefined) updateData.email = data.email;
    if (data.phone !== undefined) updateData.phone = data.phone;

    const client = await this.prisma.client.update({
      where: { id },
      data: updateData,
    });

    return {
      id: client.id,
      name: client.name,
      email: client.email,
      phone: client.phone,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    };
  }

  async delete(id: string): Promise<void> {
    await this.prisma.client.delete({
      where: { id },
    });
  }

  async existsByEmail(email: string): Promise<boolean> {
    const client = await this.prisma.client.findUnique({
      where: { email },
      select: { id: true },
    });
    return !!client;
  }

  async existsById(id: string): Promise<boolean> {
    const client = await this.prisma.client.findUnique({
      where: { id },
      select: { id: true },
    });
    return !!client;
  }
}
