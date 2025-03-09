export type ProductType = {
  id: string;
  createdAt: string;
  name: string;
  description: string;
  price: string;
  stock: number;
  imageUrl: string;
};

export type Product = {
  id: string;
  createdAt: string;
  name: string;
  description: string;
  isDeleted: boolean;
  productTypes: ProductType[];
};

export const SERVER_IMAGE_URL = 'http://localhost:5001';
