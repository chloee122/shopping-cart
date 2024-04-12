import { createContext, useState, ReactElement, useEffect } from "react";
import type { Product } from "../common/types";

export interface ProductContextType {
  products: Product[];
}

const initProductContext: ProductContextType = {
  products: [],
};

interface ProductProviderProps {
  children: ReactElement | ReactElement[];
}

const ProductContext = createContext<ProductContextType>(initProductContext);
export function ProductProvider({ children }: ProductProviderProps) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await fetch("http://localhost:3500/products").then((res) =>
          res.json()
        );
        return data;
      } catch (err) {
        if (err instanceof Error) throw new Error("Error occured");
      }
    };

    fetchProducts().then((p) => setProducts(p));
  }, []);

  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
}

export default ProductContext;
