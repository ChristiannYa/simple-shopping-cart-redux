import { useSelector } from "react-redux";
import { selectCartTotal } from "./cartSlice";

const CartTotal = () => {
  const totalPrice = useSelector(selectCartTotal);

  return (
    <div className="mr-2 text-right">
      <p>
        Total price: <span>{totalPrice.toFixed(2)}</span>
      </p>
    </div>
  );
};

export default CartTotal;
