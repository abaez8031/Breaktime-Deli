import "./CartSidebar.css"
import CartItem from "../CartItem/CartItem"
import { useDispatch } from "react-redux"
import { clearCart } from "../../../store/cart";

const CartSidebar = ({sandwiches, isOpen, onClose}) => {
  const dispatch = useDispatch();
  const handleClearCart = () => {
    dispatch(clearCart())
  }

  return (
    <div className={`cart-sidebar-container ${isOpen ? "open" : ""}`}>
      <button className="close-sidebar-btn" onClick={onClose}>x</button>
      <h2 className="cart-sidebar-header">Your Cart</h2>
      {sandwiches.length === 0 && <p className="empty-cart-text">Your cart is empty</p>}
      {sandwiches.length > 0 && 
      <>
      <ul className="cart-list">
        {sandwiches.map((sandwich) => (
          <CartItem sandwich={sandwich}/>
        ))}
      </ul>
      <button className="clear-cart-btn" onClick={handleClearCart}>Clear Cart</button>
      </>}
    </div>
  )
}

export default CartSidebar;