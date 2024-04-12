import getImage from "../../utils/image-util";
import useProductContext from "../../hooks/useProductContext";
import type { Product } from "../../common/types";
import useCartContext from "../../hooks/useCartContext";

export default function ProducList() {
  const { dispatch, REDUCER_ACTIONS, cart } = useCartContext();
  const { products } = useProductContext();

  const addProduct = (product: Product) => {
    dispatch({
      type: REDUCER_ACTIONS.ADD,
      payload: { ...product, qty: 1 },
    });
  };

  const renderedProducts = products.map((product) => {
    const isAdded = cart.some(
      (addedProduct) => addedProduct.sku === product.sku
    );
    return (
      <div key={product.sku}>
        {/* <img src={`src/images/${product.sku}.jpg`} /> */}
        <img src={getImage(product.sku)} />
        <div>
          ${product.price} → {isAdded ? "item in Cart ✅" : null}
        </div>

        <button
          className="border rounded p-1 bg-slate-200"
          onClick={() => addProduct(product)}
        >
          Add to Cart
        </button>
      </div>
    );
  });
  return <div className="flex justify-evenly">{renderedProducts}</div>;
}
