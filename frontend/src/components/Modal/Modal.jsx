import "./Modal.css";
import { useRef } from "react";

const Modal = ({isOpen, onClose, children}) => {
  const modalRef = useRef(null);
  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };
  if (!isOpen) return null;
  return (
    <div className="modal-overlay" onClick={handleClickOutside}>
      <div className="modal-content" ref={modalRef}>
        <button className="close-modal-btn" onClick={onClose}>&times;</button>
        {children}
      </div>
    </div>
  )
}

export default Modal;