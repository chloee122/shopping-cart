export interface ProductItem {
    sku: string;
    name: string;
    price: number;
  }

export interface CartItem extends ProductItem {
    qty: number;
  }