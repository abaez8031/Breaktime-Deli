import { useState } from "react";
import { useDispatch } from "react-redux";
import "./ColdCutSandwichBuilder.css";
import sandwich from "../../../assets/sandwich.jpg"

const ingredientPrices = {
  bread: {
    white: 1.00,
    roll: 1.50,
    hero: 2.00,
  },
  meat: {
    pastrami: 2.00,
    turkey: 2.00,
    ham: 2.00,
    salami: 2.00,
    chicken: 2.50,
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
    hot: 0.00
  },
  hot: 0.00,
  toasted: 0.00
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

  return total;
};

const ColdCutSandwichBuilder = () => {
  const [ingredients, setIngredients] = useState({
    bread: '',
    meat: [],
    cheese: [],
    veggies: [],
    condiments: [],
    hot: false,
    toasted: false
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const dispatch = useDispatch();

  const updateTotalPrice = (updatedIngredients) => {
    const price = calculateTotalPrice(updatedIngredients);
    setTotalPrice(price);
  };

  const handleIngredientChange = (key, value) => {
    const updatedIngredients = {
      ...ingredients,
      [key]: value
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

  return (
    <div className="sandwich-builder-container">
      <h2 className="sandwich-builder-header">Build your own cold cut sandwich</h2>
      <img alt="sandwich" src={sandwich}/>


      <form className="sandwich-builder-form">

        <div className="ingredient-selector">
          <label>Bread:</label>
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
                <label>{bread.charAt(0).toUpperCase() + bread.slice(1)} ( + ${ingredientPrices.bread[bread].toFixed(2)} )</label>
              </div>
            ))}
          </div>
        </div>

        <div className="ingredient-selector">
          <label>Meat:</label>
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
                <label>{meat.charAt(0).toUpperCase() + meat.slice(1)} ( + ${ingredientPrices.meat[meat].toFixed(2)} )</label>
              </div>
            ))}
          </div>
        </div>

        <div className="ingredient-selector">
          <label>Cheese:</label>
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
                <label>{cheese.charAt(0).toUpperCase() + cheese.slice(1)} ( + ${ingredientPrices.cheese[cheese].toFixed(2)})</label>
              </div>
            ))}
          </div>
        </div>

        <div className="ingredient-selector">
          <label>Veggies:</label>
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
                <label>{veggie.charAt(0).toUpperCase() + veggie.slice(1)} ( + ${ingredientPrices.veggies[veggie].toFixed(2)})</label>
              </div>
            ))}
          </div>
        </div>

        <div className="ingredient-selector">
          <label>Condiments:</label>
          <div className="checkbox-buttons">
            {Object.keys(ingredientPrices.condiments).map(condiment => (
              <div key={condiment} className="checkbox-button">
                <input 
                  type="checkbox" 
                  name="condiments" 
                  value={condiment} 
                  checked={ingredients.condiments.includes(condiment)} 
                  onChange={(e) => handleCheckboxChange('condiments', e.target.value)} 
                />
                <label>{condiment.charAt(0).toUpperCase() + condiment.slice(1)}</label>
              </div>
            ))}
          </div>
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
        <button type="submit" className="add-to-cart-btn">Add to Cart</button>
      </form>
    </div>
  );
};

export default ColdCutSandwichBuilder;