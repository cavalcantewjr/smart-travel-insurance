import {
  Client,
  CreateClientData,
  UpdateClientData,
  ClientFilters,
} from '../../../domain/entities';

export interface IClientRepository {
  // Métodos básicos de CRUD
  create(data: CreateClientData): Promise<Client>;
  findById(id: string): Promise<Client | null>;
  findAll(
    filters?: ClientFilters
  ): Promise<{ clients: Client[]; total: number }>;
  update(id: string, data: UpdateClientData): Promise<Client>;
  delete(id: string): Promise<void>;

  // Métodos de validação
  existsByEmail(email: string): Promise<boolean>;
  existsById(id: string): Promise<boolean>;
}
