import { useState } from "react";
import { useNavigate,Link } from "react-router";
import { Upload, X, ArrowLeft, Trash2 } from "lucide-react";

export function EditFoodItem() {
  const navigate = useNavigate();
  // const { id } = useParams();

  // Mock data - in a real app, fetch based on id
  const [formData, setFormData] = useState({
    name: "Margherita Pizza",
    description: "Classic pizza with tomato sauce and mozzarella cheese",
    category: "Pizza",
    price: "12.99",
    available: true,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(
    "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400"
  );

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock update - navigate back to list
    navigate("/food-items");
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this food item?")) {
      // Mock delete - navigate back to list
      navigate("/food-items");
    }
  };

  const categories = ["Pizza", "Burgers", "Salads", "Japanese", "Pasta", "Mexican", "Desserts", "Beverages"];

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <Link
          to="/food-items"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
        >
          <ArrowLeft size={20} />
          Back to Food Items
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Edit Food Item</h1>
            <p className="text-gray-600 mt-1">Update menu item details</p>
          </div>
          <button
            type="button"
            onClick={handleDelete}
            className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition-all"
          >
            <Trash2 size={20} />
            Delete Item
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-8 space-y-6">
        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Food Image</label>
          <div className="relative">
            {imagePreview ? (
              <div className="relative w-full h-64 rounded-lg overflow-hidden border-2 border-gray-300">
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                <div className="absolute top-3 right-3 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setImagePreview(null)}
                    className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-all"
                  >
                    <X size={20} />
                  </button>
                </div>
                <label className="absolute bottom-3 right-3 bg-white text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition-all cursor-pointer shadow-lg">
                  Change Image
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-orange-500 hover:bg-orange-50 transition-all">
                <Upload size={48} className="text-gray-400 mb-2" />
                <p className="text-gray-600 font-medium">Click to upload food image</p>
                <p className="text-sm text-gray-500 mt-1">PNG, JPG up to 10MB</p>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </label>
            )}
          </div>
        </div>

        {/* Food Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Food Name *
          </label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
            placeholder="e.g., Margherita Pizza"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Description *
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none resize-none"
            placeholder="Describe the food item, ingredients, and special features..."
            required
          />
        </div>

        {/* Category and Price */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none appearance-none bg-white"
              required
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
              Price *
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                placeholder="0.00"
                required
              />
            </div>
          </div>
        </div>

        {/* Availability Toggle */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-800">Availability Status</h4>
            <p className="text-sm text-gray-600 mt-1">Make this item available for ordering</p>
          </div>
          <button
            type="button"
            onClick={() => setFormData({ ...formData, available: !formData.available })}
            className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
              formData.available ? "bg-green-500" : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                formData.available ? "translate-x-7" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="flex-1 bg-orange-600 text-white py-3 rounded-lg font-medium hover:bg-orange-700 transition-all shadow-lg hover:shadow-xl"
          >
            Update Food Item
          </button>
          <Link
            to="/food-items"
            className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
