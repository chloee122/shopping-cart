import getImage from "../../utils/image-util";
import type { Cart } from "../../common/types";
import { Dispatch, ReactElement } from "react";
import type { CartAction, CartActionKindType } from "../../context/CartContext";

interface CastListItemProps {
  item: Cart;
  dispatch: Dispatch<CartAction>;
  REDUCER_ACTIONS: CartActionKindType;
}

const HIGHEST_CART_QUANTITY = 20;

export default function CartListItem({
  item,
  dispatch,
  REDUCER_ACTIONS,
}: CastListItemProps) {
  const itemTotal: number = item.qty * item.price;

  const highestQty: number =
    HIGHEST_CART_QUANTITY < item.qty ? item.qty : HIGHEST_CART_QUANTITY;

  const optionValues: number[] = [...Array(highestQty)].map((_, i) => i + 1);

  const options: ReactElement[] = optionValues.map((val) => {
    return (
      <option key={val} value={val}>
        {val}
      </option>
    );
  });

  const adjustQty = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: REDUCER_ACTIONS.QUANTITY,
      payload: { ...item, qty: Number(e.target.value) },
    });
  };

  const removeItem = () => {
    dispatch({
      type: REDUCER_ACTIONS.REMOVE,
      payload: item,
    });
  };

  return (
    <div key={item.sku} className="grid grid-cols-6">
      <img src={getImage(item.sku)} />
      <div>{item.name}</div>
      <div>${item.price}</div>
      <select id={item.sku} value={item.qty} onChange={adjustQty}>
        {options}
      </select>
      <div>{itemTotal}</div>
      <div className="flex flex-cols items-center border" onClick={removeItem}>
        ❌
      </div>
    </div>
  );
}
