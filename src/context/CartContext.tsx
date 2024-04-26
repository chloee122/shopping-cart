import { createContext, useReducer } from "react";
import type { CartItem } from "../common/types";
import { CartActionKind } from "../common/constants";

export interface CartAction {
  type: CartActionKind;
  payload: CartItem;
}

type CartState = { cart: CartItem[] };

const initCartState: CartState = {
  cart: [{ sku: "item0001", name: "Widget", price: 9.99, qty: 1 }],
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case CartActionKind.ADD: {
      const { sku, name, price } = action.payload;

      const { filteredItems, itemExists } = state.cart.reduce(
        (acc, item) => {
          if (item.sku !== sku) {
            acc.filteredItems.push(item);
          } else {
            acc.itemExists = item;
          }
          return acc;
        },
        {
          filteredItems: [] as CartItem[],
          itemExists: undefined as CartItem | undefined,
        }
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
  cart: CartItem[];
  dispatch: React.Dispatch<CartAction>;
  totalItem: number;
  totalPrice: number;
}

interface CartProviderProps {
  children: React.ReactNode;
}

const initCartContext: CartContextType = {
  cart: [],
  dispatch: () => {},
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

  const totalItem = state.cart.reduce(
    (acc, product) => (acc += product.qty),
    0
  );

  const totalPrice = state.cart.reduce(
    (acc, product) => (acc += product.price * product.qty),
    0
  );

  return (
    <CartContext.Provider value={{ cart, dispatch, totalItem, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
