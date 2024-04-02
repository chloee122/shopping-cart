import useAppContext from "../../hooks/useAppContext";
import { GoX } from "react-icons/go";

export default function Cart() {
  const { cart, adjustAmount, removeProduct } = useAppContext();

  const numberOption = Array.from({ length: 10 }, (_, i) => i + 1);

  const renderedAddedProducts = cart.map((product) => {
    const productTotal = product.amount * product.price;
    return (
      <div key={product.sku} className="grid grid-cols-6">
        <img src={`src/images/${product.sku}.jpg`} />

        <div>{product.name}</div>
        <div>${product.price}</div>
        <select id={product.sku} value={product.amount} onChange={adjustAmount}>
          {numberOption.map((number) => (
            <option key={number}>{number}</option>
          ))}
        </select>
        <div>{productTotal}</div>
        <div
          className="flex flex-cols items-center border"
          onClick={() => removeProduct(product.sku)}
        >
          <GoX />
        </div>
      </div>
    );
  });

  return <div className="">{renderedAddedProducts}</div>;
}
