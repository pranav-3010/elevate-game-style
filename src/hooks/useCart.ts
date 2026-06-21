import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/lib/catalog";

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

interface CartState {
  cart: CartItem[];
  wishlist: Product[];
  isOpen: boolean;
  addToCart: (product: Product, size: string, quantity?: number) => void;
  removeFromCart: (handle: string, size: string) => void;
  updateQuantity: (handle: string, size: string, quantity: number) => void;
  clearCart: () => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (handle: string) => void;
  toggleCart: (open?: boolean) => void;
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      wishlist: [],
      isOpen: false,
      addToCart: (product, size, quantity = 1) =>
        set((state) => {
          const existingIndex = state.cart.findIndex(
            (item) => item.product.handle === product.handle && item.size === size
          );
          if (existingIndex > -1) {
            const newCart = [...state.cart];
            newCart[existingIndex].quantity += quantity;
            return { cart: newCart, isOpen: true };
          }
          return {
            cart: [...state.cart, { product, size, quantity }],
            isOpen: true,
          };
        }),
      removeFromCart: (handle, size) =>
        set((state) => ({
          cart: state.cart.filter(
            (item) => !(item.product.handle === handle && item.size === size)
          ),
        })),
      updateQuantity: (handle, size, quantity) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.product.handle === handle && item.size === size
              ? { ...item, quantity: Math.max(1, quantity) }
              : item
          ),
        })),
      clearCart: () => set({ cart: [] }),
      addToWishlist: (product) =>
        set((state) => {
          if (state.wishlist.some((item) => item.handle === product.handle)) {
            return {};
          }
          return { wishlist: [...state.wishlist, product] };
        }),
      removeFromWishlist: (handle) =>
        set((state) => ({
          wishlist: state.wishlist.filter((item) => item.handle !== handle),
        })),
      toggleCart: (open) =>
        set((state) => ({ isOpen: open !== undefined ? open : !state.isOpen })),
    }),
    {
      name: "one8-cart-storage",
    }
  )
);
