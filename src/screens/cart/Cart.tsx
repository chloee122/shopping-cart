import useCartContext from "../../hooks/useCartContext";
import CartListItem from "./CartListItem";

export default function Cart() {
  const { cart, dispatch } = useCartContext();

  const renderedCartItems = cart.map((item) => {
    return (
      <CartListItem
        key={item.sku}
        item={item}
        dispatch={dispatch}
      />
    );
  });

  return <div>{renderedCartItems}</div>;
}
