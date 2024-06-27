import "./CartItem.css"
import { formatIngredientName } from "../../../utils/utils";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../../../store/cart";

const CartItem = ({sandwich}) => {
  const dispatch = useDispatch();
  let {
    bread,
    cheese,
    condiments,
    eggs,
    hot,
    meat,
    toasted,
    totalPrice,
    veggies,
    id
  } = sandwich;

  bread = formatIngredientName(bread)
  cheese = cheese.map(cheese => formatIngredientName(cheese))
  condiments = condiments.map(condiment => formatIngredientName(condiment))
  meat = meat.map(meat => formatIngredientName(meat))
  veggies = veggies.map(veggie => formatIngredientName(veggie))

  const handleRemoveItem = () => {
    dispatch(removeFromCart(id))
  }

  return (
    <li className="cart-item">
      <div className="cart-item-header">
        <h2>{meat.join(', ')} Sandwich</h2>
        <span className="cart-item-price">${totalPrice.toFixed(2)}</span>
      </div>
      <div className="cart-item-details">
        <p><strong>Bread:</strong> {bread}</p>
        <p><strong>Cheese:</strong> {cheese.join(', ') || 'None'}</p>
        <p><strong>Veggies:</strong> {veggies.join(', ') || 'None'}</p>
        <p><strong>Condiments:</strong> {condiments.join(', ') || 'None'}</p>
        <p><strong>Eggs:</strong> {eggs ? eggs : 0}</p>
        <p><strong>Hot:</strong> {hot ? 'Yes' : 'No'}</p>
        <p><strong>Toasted:</strong> {toasted ? 'Yes' : 'No'}</p>
      </div>
      <button onClick={handleRemoveItem} className="remove-cart-item-btn">Remove Item</button>
    </li>
  )
}

export default CartItem;