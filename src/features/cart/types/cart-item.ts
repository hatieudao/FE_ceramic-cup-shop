interface ProductType {
  id: string;
  createdAt: string;
  name: string;
  description: string;
  price: string;
  stock: number;
  imageUrl: string;
}

export interface CartItem {
  id: string;
  createdAt: string;
  cartId: string;
  productType: ProductType;
  productTypeId: string;
  quantity: number;
  price: string;
}

export interface Cart {
  cartItems: CartItem[];
  totalItem: number;
}
