// {
// bread: "white"
// cheese: ['american']
// condiments: []
// eggs: 0
// hot: false
// meat: ['pastrami']
// toasted: false
// totalPrice: 5
// veggies: ['lettuce', 'tomato']
// }

import "./CartItem.css"

const CartItem = ({sandwich}) => {
  const {
    bread,
    cheese,
    condiments,
    eggs,
    hot,
    meat,
    toasted,
    totalPrice,
    veggies
  } = sandwich;
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
    </li>
  )
}

export default CartItem;