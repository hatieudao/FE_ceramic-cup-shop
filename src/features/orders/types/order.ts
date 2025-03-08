export type OrderStatus = 'pending' | 'completed' | 'canceled';

export interface Product {
  id: string;
  createdAt: string;
  name: string;
  description: string;
  isDeleted: boolean;
}

export interface ProductType {
  id: string;
  createdAt: string;
  product: Product;
  name: string;
  description: string;
  price: string;
  stock: number;
  imageUrl: string;
}

export interface OrderItem {
  id: string;
  createdAt: string;
  orderId: string;
  productTypeId: string;
  quantity: number;
  price: string;
  productType: ProductType;
}

export interface Order {
  id: string;
  createdAt: string;
  status: OrderStatus;
  deliveryAddressId: string;
  deliveryCharge: string;
  totalPrice: string;
  orderNote: string | null;
  orderItems: OrderItem[];
}

export interface FilterOptions {
  status: 'all' | OrderStatus;
  dateRange: {
    startDate: Date | null;
    endDate: Date | null;
  };
  searchTerm: string;
}
