import { useState } from "react";
import ColdCutSandwichBuilder from "../ColdCutSandwichBuilder/ColdCutSandwichBuilder";
import "./ProductsPage.css"
import sandwich from "../../../assets/sandwich.jpg"


const ProductsPage = () => {
  const [isColdCutModalOpen, setIsColdCutModalOpen] = useState(false);
  const openColdCutModal = () => setIsColdCutModalOpen(true);
  const closeColdCutModal = () => setIsColdCutModalOpen(false);
  return (
    <div className="products-page">
      <h2 className="products-page-header">Our Products</h2>
      <div className="product" onClick={openColdCutModal}>
        <img className="product-img" src={sandwich} alt="sandwich"></img>
        <p>Customize a cold cut sandwich</p>
      </div>

      <div className="product">

      </div>
      <ColdCutSandwichBuilder isOpen={isColdCutModalOpen} onClose={closeColdCutModal} />
    </div>
  );
}

export default ProductsPage;