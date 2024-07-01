import { useState } from "react";
import ColdCutSandwichBuilder from "../ColdCutSandwichBuilder/ColdCutSandwichBuilder";
import BreakfastSandwichBuilder from "../BreakfastSandwichBuilder/BreakfastSandwichBuilder";
import "./ProductsPage.css"
import coldCutSandwich from "../../../assets/sandwich.jpg"
import breakfastSandwich from "../../../assets/breakfastsandwich.jpg";
import CartSidebar from "../CartSidebar/CartSidebar";
import { useSelector } from "react-redux";


const ProductsPage = () => {
  const [isColdCutModalOpen, setIsColdCutModalOpen] = useState(false);
  const [isBreakfastModalOpen, setIsBreakfastModalOpen] = useState(false);
  const [isCartSidebarOpen, setIsCartSidebarOpen] = useState(false);
  
  
  const openColdCutModal = () => setIsColdCutModalOpen(true);
  const closeColdCutModal = () => setIsColdCutModalOpen(false);
  const openBreakfastModal = () => setIsBreakfastModalOpen(true);
  const closeBreakfastModal = () => setIsBreakfastModalOpen(false);
  const closeCartSidebar = () => setIsCartSidebarOpen(false);
  const openCartSidebar = () => setIsCartSidebarOpen(true);

  const sandwiches = useSelector(state => state.cart.sandwiches)

  return (
    <div className="products-page">
      <h2 className="products-page-header">Our Products</h2>
      <div className="product" onClick={openColdCutModal}>
        <img className="product-img" src={coldCutSandwich} alt="sandwich"></img>
        <p>Customize a cold cut sandwich</p>
      </div>

      <div className="product" onClick={openBreakfastModal}>
        <img className="product-img" src={breakfastSandwich} alt="breakfast-sandwich"></img>
        <p>Customize a breakfast sandwich</p>
      </div>
      <ColdCutSandwichBuilder isOpen={isColdCutModalOpen} onClose={closeColdCutModal} />
      <BreakfastSandwichBuilder isOpen={isBreakfastModalOpen} onClose={closeBreakfastModal}/>
      {!isCartSidebarOpen &&<button className="cart-open-btn" onClick={openCartSidebar}>
      &lt;
      </button>}
      {<CartSidebar sandwiches={sandwiches} isOpen={isCartSidebarOpen} onClose={closeCartSidebar}/>}
    </div>
  );
}

export default ProductsPage;