"use client";
import { ReactNode } from "react";

const BookModal = ({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <div className={`modal ${isOpen ? "is-active" : ""}`}>
      <div className="modal-background" onClick={handleClose}></div>
      <div className="modal-content">
        <div className="px-12 py-12 pb-4 border rounded shadow-sm bg-white max-w-3xl mx-auto relative">
          <div className="absolute right-10 top-6">
            <button
              className="modal-close is-large border border-knightsarmor text-knightsarmor rounded-full"
              style={{ width: "2em", height: "2em" }}
              aria-label="close"
              onClick={handleClose}
            >
              X
            </button>
          </div>
          <div className="mb-9">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default BookModal;
