import React from "react";

type ModalProps = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ title, isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0  flex items-center justify-center z-50">
      <div className="relative w-full max-w-lg mx-4 bg-white border-2 border-gray-300 rounded-lg ">

        {/* Header */}
        <div className="flex items-center justify-between px-7 py-5 bg-gray-200 rounded-t-[6px]">
          <h2 className="font-extrabold text-base uppercase tracking-widest text-black">
            {title}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-stone-100 text-xl leading-none px-2 py-0.5 rounded hover:bg-white/20 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="px-7 py-2">
          {children}
        </div>

      </div>
    </div>
  );
};

export default Modal;
