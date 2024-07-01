import { useState } from "react";
import { useDispatch } from "react-redux";
import "./BreakfastSandwichBuilder.css";
import breakfastSandwich from "../../../assets/breakfastsandwich.jpg";
import Modal from "../../Modal/Modal";
import { formatIngredientName } from "../../../utils/utils";
import { addToCart } from "../../../store/cart";

const ingredientPrices = {
  bread: {
    white: 1.00,
    bagel: 1.00,
    roll: 1.50,
    hero: 2.00,
  },
  meat: {
    pastrami: 2.00,
    turkey: 2.00,
    ham: 2.00,
    salami: 2.00,
    pork_bacon: 1.00,
    turkey_bacon: 1.00,
    patty_sausage: 1.00,
    link_sausage: 1.00
  },
  cheese: {
    american: 1.00,
    cheddar: 1.00,
    swiss: 1.00,
    pepper: 1.00,
    mozzarella: 1.00,
    meunster: 1.00
  },
  veggies: {
    lettuce: 0.50,
    tomato: 0.50,
    onion: 0.50,
    pickles: 0.50,
    jalapeno: 0.50
  },
  condiments: {
    mayo: 0.00,
    mustard: 0.00,
    ketchup: 0.00,
    barbecue: 0.00,
    hot: 0.00,
    butter: 0.00
  },
  hot: 0.00,
  toasted: 0.00,
  eggs: 0.50
};


const calculateTotalPrice = (ingredients) => {
  let total = 0;

  if (ingredients.bread) total += ingredientPrices.bread[ingredients.bread];
  ingredients.meat.forEach(item => {
    total += ingredientPrices.meat[item];
  });
  ingredients.cheese.forEach(item => {
    total += ingredientPrices.cheese[item];
  });
  ingredients.veggies.forEach(item => {
    total += ingredientPrices.veggies[item];
  });
  total += ingredients.eggs * ingredientPrices.eggs; // Include the cost of eggs

  return total;
};

const BreakfastSandwichBuilder = ({ isOpen, onClose }) => {
  const [ingredients, setIngredients] = useState({
    bread: '',
    meat: [],
    cheese: [],
    veggies: [],
    condiments: [],
    eggs: 0,
    hot: false,
    toasted: false,
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState('');

  const updateTotalPrice = (updatedIngredients) => {
    const price = calculateTotalPrice(updatedIngredients);
    setTotalPrice(price);
  };

  const handleIngredientChange = (key, value) => {
    const updatedIngredients = {
      ...ingredients,
      [key]: value,
    };
    setIngredients(updatedIngredients);
    updateTotalPrice(updatedIngredients);
  };

  const handleCheckboxChange = (key, value) => {
    const updatedArray = ingredients[key].includes(value)
      ? ingredients[key].filter(item => item !== value)
      : [...ingredients[key], value];
    handleIngredientChange(key, updatedArray);
  };

  const handleEggsChange = (e) => {
    let eggs = parseInt(e.target.value, 10);
    if (isNaN(eggs) || eggs < 0) {
      eggs = 0;
    }
    handleIngredientChange('eggs', eggs);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!ingredients.bread) {
      setErrorMessage("Please select a type of bread")
      return;
    }
    if (ingredients.meat.length === 0 && ingredients.cheese.length === 0) {
      setErrorMessage("Please select at least one meat or cheese")
      return;
    }
    const sandwich = {...ingredients, totalPrice};
    dispatch(addToCart(sandwich));
    onClose();
    setIngredients({
      bread: '',
      meat: [],
      cheese: [],
      veggies: [],
      condiments: [],
      eggs: 0,
      hot: false,
      toasted: false,
    });
    setTotalPrice(0);
    setErrorMessage("")
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="sandwich-builder-container">
        <h2 className="sandwich-builder-header">Build your own breakfast sandwich</h2>
        <img alt="breakfast sandwich" src={breakfastSandwich} />
        {errorMessage && <div className="errors">{errorMessage}</div>}

        <form className="sandwich-builder-form">
          <div className="ingredient-selector">
            <label className="category-label">Bread:</label>
            <div className="radio-buttons">
              {Object.keys(ingredientPrices.bread).map(bread => (
                <div key={bread} className="radio-button">
                  <input 
                    type="radio" 
                    name="bread" 
                    value={bread} 
                    checked={ingredients.bread === bread} 
                    onChange={(e) => handleIngredientChange('bread', e.target.value)} 
                  />
                  <label>{formatIngredientName(bread)} ( + ${ingredientPrices.bread[bread].toFixed(2)} )</label>
                </div>
              ))}
            </div>
          </div>

          <div className="ingredient-selector">
            <label className="category-label">Meat:</label>
            <div className="checkbox-buttons">
              {Object.keys(ingredientPrices.meat).map(meat => (
                <div key={meat} className="checkbox-button">
                  <input 
                    type="checkbox" 
                    name="meat" 
                    value={meat} 
                    checked={ingredients.meat.includes(meat)} 
                    onChange={(e) => handleCheckboxChange('meat', e.target.value)} 
                  />
                  <label>{formatIngredientName(meat)} ( + ${ingredientPrices.meat[meat].toFixed(2)} )</label>
                </div>
              ))}
            </div>
          </div>

          <div className="ingredient-selector">
            <label className="category-label">Cheese:</label>
            <div className="checkbox-buttons">
              {Object.keys(ingredientPrices.cheese).map(cheese => (
                <div key={cheese} className="checkbox-button">
                  <input 
                    type="checkbox" 
                    name="cheese" 
                    value={cheese} 
                    checked={ingredients.cheese.includes(cheese)} 
                    onChange={(e) => handleCheckboxChange('cheese', e.target.value)} 
                  />
                  <label>{formatIngredientName(cheese)} ( + ${ingredientPrices.cheese[cheese].toFixed(2)})</label>
                </div>
              ))}
            </div>
          </div>

          <div className="ingredient-selector">
            <label className="category-label">Veggies:</label>
            <div className="checkbox-buttons">
              {Object.keys(ingredientPrices.veggies).map(veggie => (
                <div key={veggie} className="checkbox-button">
                  <input 
                    type="checkbox" 
                    name="veggies" 
                    value={veggie} 
                    checked={ingredients.veggies.includes(veggie)} 
                    onChange={(e) => handleCheckboxChange('veggies', e.target.value)} 
                  />
                  <label>{formatIngredientName(veggie)} ( + ${ingredientPrices.veggies[veggie].toFixed(2)})</label>
                </div>
              ))}
            </div>
          </div>

          <div className="ingredient-selector">
            <label className="category-label">Eggs:</label>
            <input 
              type="number" 
              name="eggs" 
              min="1" 
              max="5" 
              value={ingredients.eggs} 
              onChange={handleEggsChange} 
            />
            <label>( + ${ingredientPrices.eggs.toFixed(2)} per egg )</label>
          </div>

          <div className="hot-toasted-checkbox">
            <label>
              Hot:
              <input type="checkbox" checked={ingredients.hot} onChange={(e) => handleIngredientChange('hot', e.target.checked)} />
            </label>
          </div>
          <div className="hot-toasted-checkbox">
            <label>
              Toasted:
              <input type="checkbox" checked={ingredients.toasted} onChange={(e) => handleIngredientChange('toasted', e.target.checked)} />
            </label>
          </div>
          <div className="total-price">Total Price: ${totalPrice.toFixed(2)}</div>
          <button type="submit" className="add-to-cart-btn" onClick={handleAddToCart}>Add to Cart</button>
        </form>
      </div>
    </Modal>
  );
};

export default BreakfastSandwichBuilder;