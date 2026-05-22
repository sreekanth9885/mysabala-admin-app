import { useState } from "react";
import { Plus } from "lucide-react";
import Modal from "../../components/Modal";

export function Categories() {
  const [open, setOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
 

 
  const handleClose = () => {
    setOpen(false);
    setCategoryName("");
  };

  return (
    <div>
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-full px-6 py-3 bg-orange-600 text-white text-sm font-semibold shadow-md border border-orange-500 hover:bg-orange-500 hover:shadow-lg active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
      >
        <Plus size={20} /> Add Category
      </button>

      {/* Modal */}
      <Modal title="Add Category" isOpen={open} onClose={handleClose}>
        <div className="relative">

          {/* Category Name */}
          <div className="py-3">
            <h3 className="text-sm font-semibold text-neutral-700 mb-2">
              Category Name <span className="text-red-500">*</span>
            </h3>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Enter The Category Name"
              className="w-full px-4 py-3 border-2 border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Description */}
          <div className="py-3 border-t border-neutral-200">
            <h3 className="text-sm font-semibold text-neutral-700 mb-2">
              Description
            </h3>
            <textarea
              placeholder="Enter The Category Description"
              rows={4}
              className="w-full px-4 py-3 border-2 border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Confirm Button */}
          <div className="py-4 border-t border-neutral-200 flex justify-end">
            <button

              disabled={!categoryName.trim()}
              className={`px-6 py-3 bg-orange-600 text-white text-sm font-semibold rounded-lg shadow-md border border-orange-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2
                ${!categoryName.trim()
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-orange-500 cursor-pointer hover:shadow-lg active:scale-95"
                }`}
            >
              Add
            </button>
          </div>

          

        </div>
      </Modal>
    </div>
  );
}
