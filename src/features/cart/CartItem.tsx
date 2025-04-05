import { useDispatch } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
  removeItemFromCart,
} from "./cartSlice";

interface Item {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface ItemItemProps {
  item: Item;
}

const CartItem = ({ item }: ItemItemProps) => {
  const dispatch = useDispatch();

  return (
    <div className="w-full p-2">
      <div className="bg-black/8 px-2 py-1 flex justify-between items-center max-sm:flex-col max-sm:items-start">
        <div>
          <h3>{item.name}</h3>
          <p>${item.price.toFixed(2)}</p>
        </div>

        <div className="flex items-center gap-x-2 max-md:mt-1">
          <button
            className="w-[20px] h-[20px]"
            onClick={() => dispatch(decrementQuantity(item.id))}
          >
            -
          </button>
          <span>{item.quantity}</span>
          <button
            className="w-[20px] h-[20px]"
            onClick={() => dispatch(incrementQuantity(item.id))}
          >
            +
          </button>
          <button
            onClick={() => dispatch(removeItemFromCart(item.id))}
            className="text-sm px-2 py-0.5 ml-2 hover:cursor-pointer"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
