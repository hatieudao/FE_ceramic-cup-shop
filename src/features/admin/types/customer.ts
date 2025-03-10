export type CustomerStatus = 'active' | 'inactive' | 'blocked';

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  registeredAt: string;
  totalOrders: number;
  totalSpent: number;
  status: CustomerStatus;
  avatar?: string;
  lastOrderDate?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}
