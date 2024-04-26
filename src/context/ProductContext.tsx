import { createContext, useState, ReactElement, useEffect } from "react";
import type { ProductItem } from "../common/types";
import * as api from "../api/api";

export interface ProductContextType {
  products: ProductItem[];
  error: string | null;
}

const initProductContext: ProductContextType = {
  products: [],
  error: null,
};

interface ProductProviderProps {
  children: ReactElement | ReactElement[];
}

const ProductContext = createContext<ProductContextType>(initProductContext);
export function ProductProvider({ children }: ProductProviderProps) {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error) {
      return error.message;
    } else if (error && typeof error === "object" && "message" in error) {
      return String(error.message);
    } else if (typeof error === "string") {
      return error;
    } else {
      return "Something went wrong.";
    }
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        setError(null);
        const products = await api.getProducts();
        setProducts(products);
      } catch (err) {
        const errorMessage = getErrorMessage(err);
        setError(errorMessage);
      }
    };

    getProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, error }}>
      {children}
    </ProductContext.Provider>
  );
}

export default ProductContext;
