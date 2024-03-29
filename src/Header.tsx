export default function Header() {
  return (
    <div className="flex justify-between border-b p-3">
      <h1 className="font-bold text-2xl">Acme. Co</h1>
      <div>
        <p>Total</p>
        <button>View cart</button>
      </div>
    </div>
  );
}
