/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from "react";

import { IOrderProduct } from "../types/types";

interface CartContextType {
  cart: IOrderProduct[];
  addToCart: (product: IOrderProduct) => void;
  removeFromCart: (name: string) => void;
  clearCart: () => void;
  incrementQuantity: (name: string) => void;
  decrementQuantity: (name: string) => void;
  totalPrice: number;
  store: string;
  setStore: (storeId: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<IOrderProduct[]>([]);
  const [store, setStore] = useState<string>("");

  const addToCart = (product: IOrderProduct) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.name === product.name);
      if (exists) {
        return prev.map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (name: string) => {
    setCart((prev) => prev.filter((p) => p.name !== name));
  };

  const clearCart = () => {
    setCart([]);
  };

  const incrementQuantity = (name: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item.name === name ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (name: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item.name === name && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const totalPrice = cart.reduce((acc, p) => acc + p.price * p.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        incrementQuantity,
        decrementQuantity,
        totalPrice,
        store,
        setStore,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
