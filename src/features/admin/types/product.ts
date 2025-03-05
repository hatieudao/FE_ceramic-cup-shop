export interface ProductType {
  id: string;
  createdAt: string;
  name: string;
  description: string;
  price: string;
  stock: number;
  imageUrl: string;
}

export interface ProductTypeRelation {
  id: string;
  createdAt: string;
  cartId: string;
  productType: ProductType;
}

export interface Product {
  id: string;
  createdAt: string;
  totalItem: number;
  name: string;
  description: string;
  productTypes: ProductTypeRelation[];
}
