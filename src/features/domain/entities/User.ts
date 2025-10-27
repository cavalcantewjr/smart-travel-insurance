export interface User {
  id: string;
  email: string;
  passwordHash: string;
  role: 'ADMIN' | 'STAFF';
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserData {
  email: string;
  password: string;
  role?: 'ADMIN' | 'STAFF';
}

export interface UpdateUserData {
  email?: string;
  password?: string;
  role?: 'ADMIN' | 'STAFF';
}

export interface UserFilters {
  email?: string;
  role?: 'ADMIN' | 'STAFF';
  page?: number;
  limit?: number;
}
