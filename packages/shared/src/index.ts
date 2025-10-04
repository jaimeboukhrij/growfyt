// Tipos compartidos
export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Constantes compartidas
export const APP_NAME = 'Growfit';
