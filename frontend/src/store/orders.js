import jwtFetch from "./jwt";

const RECEIVE_ORDER = "orders/RECEIVE_ORDER";
const RECEIVE_ORDER_ERROR = "orders/RECEIVE_ORDER_ERROR";

const receiveOrder = order => ({
  type: RECEIVE_ORDER,
  order
});


const receiveOrderError = err => ({
  type: RECEIVE_ORDER_ERROR,
  err
})

export const createOrder = order => async dispatch => {
  try {
    const res = await jwtFetch("/api/orders", {
      method: "POST",
      body: JSON.stringify(order),
      headers: {
        "Content-Type": "application/json"
      }
    })
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || "Failed to create order");
    }
    const data = await res.json();
    dispatch(receiveOrder(data));
  } catch(err) {
    const error = await err.json()
    dispatch(receiveOrderError(error))
  }
}

const initialState = {
  orders: [],
  error: null,
};

const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_ORDER:
      return {
        ...state,
        orders: [...state.orders, action.order],
        error: null,
      };
    case RECEIVE_ORDER_ERROR:
      return {
        ...state,
        error: action.err.message,
      };
    default:
      return state;
  }
};

export default ordersReducer;