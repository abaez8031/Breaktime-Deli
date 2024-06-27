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
  return (
    <div className="cart-item-container">
    <li>{sandwich.totalPrice}</li>
    </div>
  )
}

export default CartItem;