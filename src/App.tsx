import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductList from "./screens/product/ProductList";
import Cart from "./screens/cart/Cart";
import Layout from "./components/Layout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/products" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
