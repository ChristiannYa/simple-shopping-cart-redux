import cartReducer, {
  addItemToCart,
  incrementQuantity,
  removeItemFromCart,
  decrementQuantity,
  clearCart,
} from "../features/cart/cartSlice";

describe("cart reducer", () => {
  const initialState = {
    items: [],
  };

  // The store is first created and the reducer is called with
  // 'undefined' as the state
  test("returns the initial state", () => {
    expect(cartReducer(undefined, { type: "unknown" })).toEqual({
      items: [],
    });
  });

  test("adds an item to the empty cart", () => {
    const product = { id: 1, name: "Test Product", price: 19.99 };
    const newState = cartReducer(initialState, addItemToCart(product));

    expect(newState.items.length).toBe(1);
    expect(newState.items[0]).toEqual({
      id: 1,
      name: "Test Product",
      price: 19.99,
      quantity: 1,
    });
  });

  test("increments the cart item's amount", () => {
    const product = { id: 2, name: "Test Cart Item", price: 19.99 };
    let state = cartReducer(initialState, addItemToCart(product));

    state = cartReducer(state, incrementQuantity(2));

    expect(state.items.length).toBe(1);
    expect(state.items[0].quantity).toBe(2);
  });

  test("filters out the item from cart", () => {
    const product = { id: 10, name: "Test Cart Item", price: 1.99 };
    let state = cartReducer(initialState, addItemToCart(product));
    state = cartReducer(state, removeItemFromCart(10));

    expect(state.items.length).toBe(0);
  });

  test("decrements the cart item's amount", () => {
    let state = cartReducer(
      initialState,
      addItemToCart({ id: 5, name: "Test Cart Item", price: 4.0 })
    );
    state = cartReducer(state, incrementQuantity(5));
    state = cartReducer(state, decrementQuantity(5));

    expect(state.items.length).toBe(1);
    expect(state.items[0].quantity).toBe(1);
  });

  test("removes cart item when decrementing from quantity 1", () => {
    let state = cartReducer(
      initialState,
      addItemToCart({ id: 5, name: "Test Cart Item", price: 4.0 })
    );
    state = cartReducer(state, decrementQuantity(5));
    expect(state.items.length).toBe(0);
  });

  test("removes all items at once (clear cart)", () => {
    let state = cartReducer(
      initialState,
      addItemToCart({ id: 1, name: "Test Cart Item", price: 1.0 })
    );
    state = cartReducer(
      state,
      addItemToCart({ id: 2, name: "Test Cart Item", price: 2.0 })
    );
    state = cartReducer(state, clearCart());

    expect(state.items.length).toBe(0);
  });
});
