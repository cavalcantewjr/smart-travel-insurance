export interface Client {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateClientData {
  name: string;
  email?: string;
  phone?: string;
}

export interface UpdateClientData {
  name?: string;
  email?: string;
  phone?: string;
}

export interface ClientFilters {
  name?: string;
  email?: string;
  phone?: string;
  page?: number;
  limit?: number;
}
