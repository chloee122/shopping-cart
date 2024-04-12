import useCartContext from "../../hooks/useCartContext";
import CartListItem from "./CartListItem";

export default function Cart() {
  const { cart, dispatch, REDUCER_ACTIONS } = useCartContext();

  const renderedCartItems = cart.map((item) => {
    return (
      <CartListItem
        key={item.sku}
        item={item}
        dispatch={dispatch}
        REDUCER_ACTIONS={REDUCER_ACTIONS}
      />
    );
  });

  return <div>{renderedCartItems}</div>;
}
