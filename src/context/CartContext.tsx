import { createContext, useReducer } from "react";
import type { Cart } from "../common/types";

enum CartActionKind {
  ADD = "ADD",
  QUANTITY = "QUANTITY",
  REMOVE = "REMOVE",
}

export type CartActionKindType = typeof CartActionKind;

export interface CartAction {
  type: CartActionKind;
  payload: Cart;
}

type CartState = { cart: Cart[] };

const initCartState: CartState = {
  cart: [{ sku: "item0001", name: "Widget", price: 9.99, qty: 1 }],
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case CartActionKind.ADD: {
      const { sku, name, price } = action.payload;

      const filteredItems: Cart[] = state.cart.filter(
        (item) => item.sku !== sku
      );

      const itemExists: Cart | undefined = state.cart.find(
        (item) => item.sku === sku
      );

      const qty = itemExists ? itemExists.qty + 1 : 1;

      return {
        ...state,
        cart: [...filteredItems, { sku, name, price, qty }],
      };
    }

    case CartActionKind.QUANTITY: {
      const { sku, name, price, qty } = action.payload;

      const filteredItems = state.cart.filter((item) => item.sku !== sku);

      return {
        ...state,
        cart: [...filteredItems, { sku, name, price, qty }],
      };
    }

    case CartActionKind.REMOVE: {
      const { sku } = action.payload;
      const filteredCart = state.cart.filter((product) => {
        return product.sku !== sku;
      });
      return { ...state, cart: filteredCart };
    }
    default:
      return state;
  }
};

export interface CartContextType {
  cart: Cart[];
  dispatch: React.Dispatch<CartAction>;
  REDUCER_ACTIONS: typeof CartActionKind;
  totalItem: number;
  totalPrice: number;
}

interface CartProviderProps {
  children: React.ReactNode;
}

const initCartContext: CartContextType = {
  cart: [],
  dispatch: () => {},
  REDUCER_ACTIONS: CartActionKind,
  totalItem: 0,
  totalPrice: 0,
};

const CartContext = createContext<CartContextType>(initCartContext);
export function CartProvider({ children }: CartProviderProps) {
  const [state, dispatch] = useReducer(cartReducer, initCartState);

  const cart = state.cart.sort((a, b) => {
    const itemA = Number(a.sku.slice(-4));
    const itemB = Number(b.sku.slice(-4));
    return itemA - itemB;
  });

  const REDUCER_ACTIONS = CartActionKind;

  const totalItem = state.cart.reduce(
    (acc, product) => (acc += product.qty),
    0
  );

  const totalPrice = state.cart.reduce(
    (acc, product) => (acc += product.price * product.qty),
    0
  );

  return (
    <CartContext.Provider
      value={{ cart, dispatch, REDUCER_ACTIONS, totalItem, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
