import { useContext } from "react";
import ProductContext, { ProductContextType } from "../context/ProductContext";

export default function useProductContext(): ProductContextType {
  const productContext = useContext(ProductContext);

  return productContext;
}
