import { useDispatch, useSelector } from "react-redux";
import { selectCartItems, clearCart } from "./cartSlice";
import CartItem from "./CartItem";
import CartTotal from "./CartTotal";

const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  return (
    <div className="bg-neutral-700 w-full p-2">
      <h2 className="text-2xl text-center">Your Cart</h2>

      <div>
        {cartItems.length === 0 ? (
          <p className="text-center mt-2">Your Cart is empty</p>
        ) : (
          <div>
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
            <hr className="my-3 text-white/20" />
            <CartTotal />
            <div className="p-2 text-end">
              <button
                onClick={() => dispatch(clearCart())}
                className="text-xs hover:cursor-pointer hover:underline"
              >
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
