import "./CartSidebar.css";
import CartItem from "../CartItem/CartItem";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../../store/cart";
import { createOrder } from "../../../store/orders";
import { useState } from "react";

const CartSidebar = ({ sandwiches, isOpen, onClose }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.session.user?._id);
  const orderError = useSelector((state) => state.orders.error);
  const [errorMessage, setErrorMessage] = useState('');
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  const calculateTotalPrice = (sandwiches) => {
    return sandwiches.reduce((acc, curr) => acc + curr.totalPrice, 0);
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    setOrderSubmitted(false)
  };

  const handleCreateOrder = async () => {
    if (!userId) {
      setErrorMessage("You must be logged in to submit an order");
      return;
    }
    const order = {
      sandwiches,
      userId,
      totalPrice: calculateTotalPrice(sandwiches),
    };
    dispatch(createOrder(order));
    if (!orderError) {
      setOrderSubmitted(true);
      dispatch(clearCart())
    } else {
      setErrorMessage(orderError);
    }
  };

  return (
    <div className={`cart-sidebar-container ${isOpen ? "open" : ""}`}>
      <button className="close-sidebar-btn" onClick={onClose}>x</button>
      <h2 className="cart-sidebar-header">Your Cart</h2>
      {errorMessage && <div className="errors">{errorMessage}</div>}
      {orderSubmitted && <div className="success">Order submitted successfully!</div>}
      {sandwiches.length === 0 && <p className="empty-cart-text">Your cart is empty</p>}
      {sandwiches.length > 0 && 
      <>
        <ul className="cart-list">
          {sandwiches.map((sandwich) => (
            <CartItem key={sandwich.id} sandwich={sandwich} />
          ))}
        </ul>
        <button className="clear-cart-btn" onClick={handleClearCart}>Clear Cart</button>
        <button className="clear-cart-btn" onClick={handleCreateOrder}>Create Order</button>
      </>}
    </div>
  );
};

export default CartSidebar;