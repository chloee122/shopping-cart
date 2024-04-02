import { createContext, useReducer } from "react";
import Cart from "./screens/cart/Cart";

enum ProductActionKind {
  ADD_NEW = "ADD_NEW",
  ADD_MORE = "ADD_MORE",
}

enum CartActionKind {
  ADJUST_AMOUNT = "ADJUST_AMOUNT",
  REMOVE_PRODUCT = "REMOVE_PRODUCT",
}

interface CartPageAction {
  type: CartActionKind;
  productSku?: string;
  payload: string;
}

interface ProductPageAction {
  type: ProductActionKind;
  payload: Product;
}

interface Product {
  sku: string;
  name: string;
  price: number;
}

interface Cart extends Product {
  amount: number;
}

type CartAction = CartPageAction | ProductPageAction;

const initialCartState: Cart[] = [
  { sku: "item0001", name: "Widget", price: 9.99, amount: 1 },
];

const cartReducer = (state: Cart[], action: CartAction): Cart[] => {
  switch (action.type) {
    case ProductActionKind.ADD_NEW:
      return [...state, { ...action.payload, amount: 1 }];
    case ProductActionKind.ADD_MORE:
      return state.map((product) => {
        if (product.sku === action.payload.sku)
          return { ...product, amount: product.amount + 1 };
        return product;
      });
    case CartActionKind.ADJUST_AMOUNT:
      return state.map((product) => {
        if (product.sku === action.productSku)
          return { ...product, amount: Number(action.payload) };
        return product;
      });
    case CartActionKind.REMOVE_PRODUCT:
      return state.filter((product) => {
        return product.sku !== action.payload;
      });
    default:
      return state;
  }
};

interface ContextType {
  cart: Cart[];
  addProduct: (product: Product) => void;
  adjustAmount: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  removeProduct: (productSku: string) => void;
  totalItem: number;
  totalPrice: number;
}

interface AppProviderProps {
  children: React.ReactNode;
}

const AppContext = createContext<ContextType | null>(null);
export function AppProvider({ children }: AppProviderProps) {
  const [cart, dispatch] = useReducer(cartReducer, initialCartState);

  const amount = 0;
  const totalItem = cart.reduce(
    (acc, product) => (acc += product.amount),
    amount
  );

  const value = 0;
  const totalPrice = cart.reduce(
    (acc, product) => (acc += product.price * product.amount),
    value
  );

  const addProduct = (product: Product) => {
    const containsProduct = cart.some((p) => p.sku === product.sku);
    if (containsProduct) {
      dispatch({ type: ProductActionKind.ADD_MORE, payload: product });
    }
    if (!containsProduct) {
      dispatch({ type: ProductActionKind.ADD_NEW, payload: product });
    }
  };

  const adjustAmount = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: CartActionKind.ADJUST_AMOUNT,
      productSku: e.target.id,
      payload: e.target.value,
    });
  };

  const removeProduct = (sku: string) => {
    dispatch({ type: CartActionKind.REMOVE_PRODUCT, payload: sku });
  };

  return (
    <AppContext.Provider
      value={{
        cart,
        addProduct,
        totalItem,
        totalPrice,
        adjustAmount,
        removeProduct,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppContext;
