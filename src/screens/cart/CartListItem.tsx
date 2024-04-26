import getImage from "../../utils/image-util";
import type { CartItem } from "../../common/types";
import { Dispatch, ReactElement } from "react";
import type { CartAction } from "../../context/CartContext";
import { CartActionKind } from "../../common/constants";

interface CastListItemProps {
  item: CartItem;
  dispatch: Dispatch<CartAction>;
}

const HIGHEST_CART_QUANTITY = 20;

export default function CartListItem({ item, dispatch }: CastListItemProps) {
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
      type: CartActionKind.QUANTITY,
      payload: { ...item, qty: Number(e.target.value) },
    });
  };

  const removeItem = () => {
    dispatch({
      type: CartActionKind.REMOVE,
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
