import { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { Upload, X, ArrowLeft, Trash2, Loader2 } from "lucide-react";
import { 
  useGetFoodItemByIdQuery, 
  useUpdateFoodItemMutation, 
  useDeleteFoodItemMutation,
  useUploadFoodImageMutation 
} from "./foodItemsApi";
import { useGetCategoriesQuery } from "../category/categoriesApi";
import toast from "react-hot-toast";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useGetSubCategoriesQuery } from "../sub-categories/subCategoriesApi";

export function EditFoodItem() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category_id: "",
    sub_category_id: "",
    price: "",
    is_available: 1,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [currentImage, setCurrentImage] = useState<string | null>(null);

  // Fetch data
  const { data: foodItem, isLoading: isLoadingFoodItem, error: foodItemError } = useGetFoodItemByIdQuery(
    Number(id),
    { skip: !id }
  );
  const { data: categories = [] } = useGetCategoriesQuery();
  const { data: subcategories = [] } = useGetSubCategoriesQuery();
  
  // API mutations
  const [updateFoodItem, { isLoading: isUpdating }] = useUpdateFoodItemMutation();
  const [deleteFoodItem, { isLoading: isDeleting }] = useDeleteFoodItemMutation();
  const [uploadFoodImage, { isLoading: isUploading }] = useUploadFoodImageMutation();

  // Filter subcategories based on selected category
  const filteredSubcategories = subcategories.filter(
    (sub) => sub.category_id === Number(formData.category_id)
  );

  // Load food item data into form
  useEffect(() => {
    if (foodItem) {
      setFormData({
        name: foodItem.name,
        description: foodItem.description || "",
        category_id: foodItem.category_id.toString(),
        sub_category_id: foodItem.sub_category_id?.toString() || "",
        price: foodItem.price.toString(),
        is_available: foodItem.is_available,
      });
      if (foodItem.image) {
        const imageUrl = `${import.meta.env.VITE_API_URL}/${foodItem.image}`;

        setCurrentImage(imageUrl);
        setImagePreview(imageUrl);
      }
    }
  }, [foodItem]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error("Image size should be less than 10MB");
        return;
      }
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload a valid image file");
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (): Promise<string | null> => {
    if (!imageFile) return currentImage;
    
    const uploadFormData = new FormData();
    uploadFormData.append("image", imageFile);
    
    try {
      const response = await uploadFoodImage(uploadFormData).unwrap();
      return response.image_url;
    } catch (error) {
      const err = error as FetchBaseQueryError & {
        data?: { message?: string }
      };
      toast.error(err.data?.message || "Failed to upload image");
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name.trim()) {
      toast.error("Please enter food name");
      return;
    }
    if (!formData.category_id) {
      toast.error("Please select a category");
      return;
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      toast.error("Please enter a valid price");
      return;
    }

    try {
      // Upload image if changed
      let imageUrl = currentImage;
      if (imageFile) {
        imageUrl = await uploadImage();
        if (imageFile && !imageUrl) {
          return; // Image upload failed
        }
      }

      // Update food item
      const payload = {
        id: Number(id),
        name: formData.name,
        description: formData.description,
        category_id: Number(formData.category_id),
        sub_category_id: formData.sub_category_id ? Number(formData.sub_category_id) : undefined,
        price: parseFloat(formData.price),
        is_available: formData.is_available,
        ...(imageUrl && { image: imageUrl }),
      };

      await updateFoodItem(payload).unwrap();
      toast.success("Food item updated successfully");
      navigate("/food-items");
    } catch (error) {
      const err = error as FetchBaseQueryError & {
        data?: { message?: string }
      };
      toast.error(err.data?.message || "Failed to update food item");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this food item?")) return;
    
    try {
      await deleteFoodItem(Number(id)).unwrap();
      toast.success("Food item deleted successfully");
      navigate("/food-items");
    } catch (error) {
      const err = error as FetchBaseQueryError & {
        data?: { message?: string }
      };
      toast.error(err.data?.message || "Failed to delete food item");
    }
  };

  // Loading state
  if (isLoadingFoodItem) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-orange-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading food item...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (foodItemError) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-700 mb-2">Error loading food item</p>
          <Link
            to="/food-items"
            className="text-orange-600 hover:text-orange-700 underline"
          >
            Back to Food Items
          </Link>
        </div>
      </div>
    );
  }

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
            disabled={isDeleting}
            className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDeleting ? <Loader2 size={20} className="animate-spin" /> : <Trash2 size={20} />}
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
                    onClick={() => {
                      setImagePreview(null);
                      setImageFile(null);
                      setCurrentImage(null);
                    }}
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
            Description
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none resize-none"
            placeholder="Describe the food item, ingredients, and special features..."
          />
        </div>

        {/* Category and Subcategory */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <select
              id="category"
              value={formData.category_id}
              onChange={(e) => {
                setFormData({ 
                  ...formData, 
                  category_id: e.target.value,
                  sub_category_id: "" // Reset subcategory when category changes
                });
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none appearance-none bg-white"
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="subcategory" className="block text-sm font-medium text-gray-700 mb-2">
              Subcategory (Optional)
            </label>
            <select
              id="subcategory"
              value={formData.sub_category_id}
              onChange={(e) => setFormData({ ...formData, sub_category_id: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none appearance-none bg-white"
              disabled={!formData.category_id}
            >
              <option value="">Select a subcategory</option>
              {filteredSubcategories.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.name}
                </option>
              ))}
            </select>
            {formData.category_id && filteredSubcategories.length === 0 && (
              <p className="text-xs text-gray-500 mt-1">No subcategories available for this category</p>
            )}
          </div>
        </div>

        {/* Price */}
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
            Price * (₹)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
            <input
              id="price"
              type="number"
              step="0.01"
              min="0"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
              placeholder="0.00"
              required
            />
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
            onClick={() => setFormData({ 
              ...formData, 
              is_available: formData.is_available === 1 ? 0 : 1 
            })}
            className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
              formData.is_available === 1 ? "bg-green-500" : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                formData.is_available === 1 ? "translate-x-7" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={isUpdating || isUploading}
            className="flex-1 bg-orange-600 text-white py-3 rounded-lg font-medium hover:bg-orange-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {(isUpdating || isUploading) && <Loader2 size={20} className="animate-spin" />}
            {isUploading ? "Uploading Image..." : isUpdating ? "Updating..." : "Update Food Item"}
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