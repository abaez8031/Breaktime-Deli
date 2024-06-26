import "./CartSidebar.css"

const CartSidebar = ({isOpen, onClose}) => {
  return (
    <div className="cart-sidebar-container">
      <button className="close-sidebar-btn" onClick={onClose}>x</button>
      <h2 className="cart-sidebar-header">Your Cart</h2>
    </div>
  )
}

export default CartSidebar;