export interface Product {
    sku: string;
    name: string;
    price: number;
  }

  export interface Cart extends Product {
    qty: number;
  } 