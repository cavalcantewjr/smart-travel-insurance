import { IClientRepository } from '../../domain/repositories/IClientRepository';
import { IClientService } from '../../domain/interfaces/IClientService';
import {
  Client,
  CreateClientData,
  UpdateClientData,
  ClientFilters,
} from '../../../domain/entities';

export class ClientService implements IClientService {
  constructor(private clientRepository: IClientRepository) {}

  async create(data: CreateClientData): Promise<Client> {
    // Validações de negócio
    if (!data.name || data.name.trim().length === 0) {
      throw new Error('Nome é obrigatório');
    }

    // Se email foi fornecido, verificar se já existe
    if (data.email) {
      const emailExists = await this.clientRepository.existsByEmail(data.email);
      if (emailExists) {
        throw new Error('Email já está em uso');
      }
    }

    return await this.clientRepository.create(data);
  }

  async findById(id: string): Promise<Client | null> {
    return await this.clientRepository.findById(id);
  }

  async findAll(
    filters?: ClientFilters
  ): Promise<{ clients: Client[]; total: number }> {
    return await this.clientRepository.findAll(filters);
  }

  async update(id: string, data: UpdateClientData): Promise<Client> {
    // Verificar se cliente existe
    const existingClient = await this.clientRepository.findById(id);
    if (!existingClient) {
      throw new Error('Cliente não encontrado');
    }

    // Se email está sendo alterado, verificar se já existe
    if (data.email && data.email !== existingClient.email) {
      const emailExists = await this.clientRepository.existsByEmail(data.email);
      if (emailExists) {
        throw new Error('Email já está em uso');
      }
    }

    // Validação de nome
    if (data.name && data.name.trim().length === 0) {
      throw new Error('Nome não pode estar vazio');
    }

    return await this.clientRepository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    // Verificar se cliente existe
    const clientExists = await this.clientRepository.existsById(id);
    if (!clientExists) {
      throw new Error('Cliente não encontrado');
    }

    await this.clientRepository.delete(id);
  }

  validateClientData(data: CreateClientData | UpdateClientData): void {
    if ('name' in data && data.name && data.name.trim().length === 0) {
      throw new Error('Nome não pode estar vazio');
    }

    if ('email' in data && data.email && !this.isValidEmail(data.email)) {
      throw new Error('Email inválido');
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
