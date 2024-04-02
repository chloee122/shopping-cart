import { Link } from "react-router-dom";
import useAppContext from "../hooks/useAppContext";

export default function Header() {
  const { totalItem, totalPrice } = useAppContext();

  return (
    <div className="flex justify-between border-b p-3 items-center">
      <h1 className="font-bold text-2xl">Acme. Co</h1>
      <Link to="/products" className="font-bold">
        Products
      </Link>
      <div>
        <p>Total Items:{totalItem}</p>
        <p>Total Price:{totalPrice.toFixed(2)}</p>
        <Link to="/cart" className="font-bold">
          View cart
        </Link>
      </div>
    </div>
  );
}
