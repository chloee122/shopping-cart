import data from "../../../data/products.json";
import useAppContext from "../../hooks/useAppContext";

export default function ProducList() {
  const { addProduct, cart } = useAppContext();

  const renderedProducts = data.products.map((product) => {
    const isAdded = cart.some(
      (addedProduct) => addedProduct.sku === product.sku
    );
    return (
      <div key={product.sku}>
        <img src={`src/images/${product.sku}.jpg`} />
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
