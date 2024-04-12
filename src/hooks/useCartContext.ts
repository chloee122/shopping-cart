import { useContext } from "react";
import CartContext from "../context/CartContext";
import type { CartContextType } from "../context/CartContext";

export default function useCartContext(): CartContextType  {
  const cartContext = useContext(CartContext);

  return cartContext;
}
