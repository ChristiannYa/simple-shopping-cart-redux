import ProductList from "./components/ProductList";
import Cart from "./features/cart/Cart";

function App() {
  return (
    <div className="w-screen min-h-screen p-10">
      <div className="w-[min(100%, 1200px)] mx-auto flex justify-between items-start gap-x-16">
        <ProductList />
        <Cart />
      </div>
    </div>
  );
}

export default App;
