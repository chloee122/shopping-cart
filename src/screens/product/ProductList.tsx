import data from "../../../data/products.json";
import useAppContext from "../../hooks/useAppContext";
import getImage from "../../utils/image-util";

interface Product {
  sku: string;
  name: string;
  price: number;
}

export default function ProducList() {
  const { dispatch, REDUCER_ACTIONS, cart } = useAppContext();

  const addProduct = (product: Product) => {
    const containsProduct = cart.some((p) => p.sku === product.sku);
    if (containsProduct) {
      dispatch({ type: REDUCER_ACTIONS.ADD_MORE, payload: product });
    }
    if (!containsProduct) {
      dispatch({ type: REDUCER_ACTIONS.ADD_NEW, payload: product });
    }
  };

  const renderedProducts = data.products.map((product) => {
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
