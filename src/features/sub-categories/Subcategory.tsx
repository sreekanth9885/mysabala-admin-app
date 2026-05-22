import { useState } from "react";
import { Plus } from "lucide-react";
import  Modal  from "../../components/Modal";

export function Subcategory() {
  const [open, setOpen] = useState(false);
  const [subcategoryName, setSubcategoryName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  

  const handleClose = () => {
    setOpen(false);
    setSubcategoryName("");
    setSelectedCategory("");
    
  };

  const isValid = subcategoryName.trim() && selectedCategory;

  return (
    <div>
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-full px-6 py-3 bg-orange-600 text-white text-sm font-semibold shadow-md border border-orange-500 hover:bg-orange-500 hover:shadow-lg active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
      >
        <Plus size={20} /> Add Subcategory
      </button>

      {/* Modal */}
      <Modal title="Add Subcategory" isOpen={open} onClose={handleClose}>
        <div className="relative">

          {/* Subcategory Name */}
          <div className="py-3">
            <h3 className="text-sm font-semibold text-neutral-700 mb-2">
              Subcategory Name <span className="text-red-500">*</span>
            </h3>
            <input
              type="text"
              value={subcategoryName}
              onChange={(e) => setSubcategoryName(e.target.value)}
              placeholder="Enter The Subcategory Name"
              className="w-full px-4 py-3 border-2 border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Select Category */}
          <div className="py-3 border-t border-neutral-200">
            <h3 className="text-sm font-semibold text-neutral-700 mb-2">
              Select Category <span className="text-red-500">*</span>
            </h3>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 border-2 border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200 bg-white text-neutral-700"
            >
              <option value="">-- Select a Category --</option>
              {/* API will populate these options later */}
              <option value="food">Food</option>
              <option value="drinks">Drinks</option>
              <option value="snacks">Snacks</option>
            </select>
          </div>

          {/* Description */}
          <div className="py-3 border-t border-neutral-200">
            <h3 className="text-sm font-semibold text-neutral-700 mb-2">
              Description
            </h3>
            <textarea
              placeholder="Enter The Subcategory Description"
              rows={4}
              className="w-full px-4 py-3 border-2 border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Confirm Button */}
          <div className="py-4 border-t border-neutral-200 flex justify-end">
            <button

              disabled={!isValid}
              className={`px-6 py-3 bg-orange-600 text-white text-sm font-semibold rounded-lg shadow-md border border-orange-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2
                ${!isValid
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-orange-500 cursor-pointer hover:shadow-lg active:scale-95"
                }`}
            >
              Confirm
            </button>
          </div>

          

        </div>
      </Modal>
    </div>
  );
}
