export type OrderStatus = 'pending' | 'in-progress' | 'completed' | 'cancelled';

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  customer: string;
  date: string;
  totalPrice: number;
  status: OrderStatus;
  orderItems: OrderItem[];
}
