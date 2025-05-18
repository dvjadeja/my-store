import { create } from 'zustand';
import type { Product } from '../api/mockData';
import { persist } from 'zustand/middleware';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (product: Product) => void;
  removeItem: (product: Product) => void;
  updateItemQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  removeProduct: (productId: string) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,
      addItem: (product) => {
        const existingItem = get().items.find(
          (item) => item.product.id === product.id
        );
        if (existingItem) {
          set((state) => ({
            items: state.items.map((item) =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
            totalItems: state.totalItems + 1,
            totalPrice: state.totalPrice + product.price,
          }));
        } else {
          set((state) => ({
            items: [...state.items, { product, quantity: 1 }],
            totalItems: state.totalItems + 1,
            totalPrice: state.totalPrice + product.price,
          }));
        }
      },
      removeItem: (product) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product.id === product.id
          );
          if (existingItem) {
            if (existingItem.quantity === 1) {
              return {
                items: state.items.filter(
                  (item) => item.product.id !== product.id
                ),
                totalItems: state.totalItems - 1,
                totalPrice: state.totalPrice - product.price,
              };
            }

            return {
              items: state.items.map((item) =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity - 1 }
                  : item
              ),
              totalItems: state.totalItems - 1,
              totalPrice: state.totalPrice - product.price,
            };
          }
          return state;
        }),
      updateItemQuantity: (productId: string, quantity: number) => {
        if (quantity < 1) return;

        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product.id === productId
          );
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product.id === productId ? { ...item, quantity } : item
              ),
            };
          }
          return state;
        });
      },
      clearCart: () => set({ items: [], totalItems: 0, totalPrice: 0 }),
      removeProduct: (productId) => {
        // Find Product
        const product = get().items.find(
          (item) => item.product.id === productId
        );

        if (product) {
          const remainingItems = get().items.filter(
            (item) => item.product.id !== productId
          );

          const totalItems = remainingItems.reduce(
            (acc, item) => acc + item.quantity,
            0
          );

          const totalPrice = remainingItems.reduce(
            (acc, item) => acc + item.product.price * item.quantity,
            0
          );
          set({
            items: remainingItems,
            totalItems: totalItems,
            totalPrice: totalPrice,
          });
        }
      },
    }),
    {
      name: 'cart',
    }
  )
);
