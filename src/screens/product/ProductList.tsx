import getImage from "../../utils/image-util";
import useProductContext from "../../hooks/useProductContext";
import type { ProductItem } from "../../common/types";
import useCartContext from "../../hooks/useCartContext";
import { CartActionKind } from "../../common/constants";

export default function ProducList() {
  const { dispatch, cart } = useCartContext();
  const { products, error } = useProductContext();

  const addProduct = (product: ProductItem) => {
    dispatch({
      type: CartActionKind.ADD,
      payload: { ...product, qty: 1 },
    });
  };

  const renderedError = <div>{error}</div>;

  const renderedProducts = products.map((product) => {
    const isAdded = cart.some(
      (addedProduct) => addedProduct.sku === product.sku
    );
    return (
      <div key={product.sku}>
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
  return (
    <div className="flex justify-evenly">
      {error ? renderedError : renderedProducts}
    </div>
  );
}
