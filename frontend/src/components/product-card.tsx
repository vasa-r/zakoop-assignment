import React, { useState } from "react";
import { Product } from "../types/types";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/cart-context";

const ProductCard = ({
  name,
  image,
  price,
  quantity,
  storeId,
}: Product & { storeId: string }) => {
  const { addToCart, cart, setStore } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    setStore(storeId);
    addToCart({ name, price, quantity: 1, image });
    setIsAdded(true);
  };

  const isProductInCart = cart.some((item) => item.name === name);

  return (
    <div className="border border-neutral-200 p-2 sm:p-3 rounded-md flex relative">
      <div className="flex items-stretch gap-2 sm:gap-3">
        <img src={image} alt={name} className="h-24 rounded-sm w-36 sm:w-40" />
        <div className="flex flex-col py-2">
          <h2 className="font-semibold text-lg sm:text-2xl">{name}</h2>
          <h2 className="font-bold px-1 bg-red-100 w-fit rounded-sm">
            ₹ {price}
          </h2>
          <h2 className="text-sm sm:text-base font-medium">
            Available Quantity: {quantity}
          </h2>
        </div>
        <div
          onClick={handleAddToCart}
          className={`absolute right-2 top-2 sm:hidden ${
            isAdded || isProductInCart ? "bg-green-500" : "bg-red-500"
          } p-2 rounded-sm cursor-pointer`}
        >
          <ShoppingCart className="text-white" />
        </div>
        <div
          onClick={handleAddToCart}
          className={`absolute right-2 top-1/3 hidden sm:flex items-center gap-2 p-1 rounded-sm cursor-pointer ${
            isAdded || isProductInCart
              ? "bg-green-500 text-white"
              : "bg-red-100"
          }`}
        >
          <ShoppingCart
            className={`text-red-500 ${
              isAdded || isProductInCart
                ? "bg-green-500 text-white"
                : "bg-red-100"
            }`}
          />
          <h3 className="text-sm sm:text-base font-medium">
            {isAdded || isProductInCart ? "Added" : "Add to cart"}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
