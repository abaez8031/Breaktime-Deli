import { useState } from "react";
import ColdCutSandwichBuilder from "../ColdCutSandwichBuilder/ColdCutSandwichBuilder";


const ProductsPage = () => {
  const [isColdCutModalOpen, setIsColdCutModalOpen] = useState(false);
  const openColdCutModal = () => setIsColdCutModalOpen(true);
  const closeColdCutModal = () => setIsColdCutModalOpen(false);
  return (
    <div className="products-page">
      <h1>Our Products</h1>
      <div className="product" onClick={openColdCutModal}>
        Cold Cut Sandwich
      </div>
      <ColdCutSandwichBuilder isOpen={isColdCutModalOpen} onClose={closeColdCutModal} />
    </div>
  );
}

export default ProductsPage;