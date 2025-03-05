import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { CartItem } from '../types/cart-item';

// Query key
const CART_QUERY_KEY = ['cart'];

// Custom hook for cart operations
export const useCart = () => {
  const queryClient = useQueryClient();

  // Retrieve cart (default to empty array)
  const { data: cart = [] } = useQuery<CartItem[]>({
    queryKey: CART_QUERY_KEY,
    queryFn: () => [],
    staleTime: Infinity, // Data is always fresh
  });

  // Add to cart mutation
  const addToCart = useMutation({
    mutationFn: async (newItem: CartItem) => Promise.resolve(newItem), // Mock API function
    onMutate: (newItem: CartItem) => {
      queryClient.setQueryData<CartItem[]>(CART_QUERY_KEY, (oldCart = []) => {
        // Check if item already exists
        const existingItem = oldCart.find((item) => item.id === newItem.id);
        if (existingItem) {
          return oldCart.map((item) =>
            item.id === newItem.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          );
        }
        return [...oldCart, { ...newItem, quantity: 1 }];
      });
    },
  });
  // Update quantity in cart mutation
  const updateQuantity = useMutation({
    mutationFn: async (variables: { id: string; quantity: number }) =>
      Promise.resolve(variables), // Mock API function
    onMutate: (variables: { id: string; quantity: number }) => {
      queryClient.setQueryData<CartItem[]>(CART_QUERY_KEY, (oldCart = []) =>
        oldCart.map((item) =>
          item.id === variables.id
            ? { ...item, quantity: variables.quantity }
            : item,
        ),
      );
    },
  });

  // Remove from cart mutation
  const removeFromCart = useMutation({
    mutationFn: async (id: string) => Promise.resolve(id), // Mock API function
    onMutate: (id: string) => {
      queryClient.setQueryData<CartItem[]>(CART_QUERY_KEY, (oldCart = []) =>
        oldCart.filter((item) => item.id !== id),
      );
    },
  });

  return { cart, addToCart, removeFromCart, updateQuantity };
};
