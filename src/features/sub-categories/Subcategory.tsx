import { useState } from "react";
import { Plus, Loader2, Edit, Trash2 } from "lucide-react";
import Modal from "../../components/Modal";
import {
  useGetSubCategoriesQuery,
  useCreateSubCategoryMutation,
  useUpdateSubCategoryMutation,
  useDeleteSubCategoryMutation
} from "./subCategoriesApi";
import { useGetCategoriesQuery } from "../category/categoriesApi";
import toast from "react-hot-toast";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export function Subcategory() {
  const [open, setOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [subcategoryName, setSubcategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // GET APIs only
  const { data: subcategories = [], isLoading, error, refetch } = useGetSubCategoriesQuery();
  const { data: categories = [] } = useGetCategoriesQuery();
  const [createSubCategory, { isLoading: isCreating }] = useCreateSubCategoryMutation();
  const [updateSubCategory, { isLoading: isUpdating }] = useUpdateSubCategoryMutation();
  const [deleteSubCategory] = useDeleteSubCategoryMutation();

  const handleClose = () => {
    setOpen(false);
    setIsEditMode(false);
    setEditingId(null);
    setSubcategoryName("");
    setDescription("");
    setSelectedCategory("");
  };

  const isValid = subcategoryName.trim() && selectedCategory;

  // Handle create/update
  const handleSubmit = async () => {
    if (!isValid) return;

    try {
      let response;
      if (isEditMode && editingId) {
        // Update existing subcategory
        const payload = {
          id: editingId,
          name: subcategoryName,
          description,
          category_id: Number(selectedCategory),
        };
        response = await updateSubCategory(payload).unwrap();
        toast.success(response?.message || "Subcategory updated successfully");
        refetch();
      } else {
        // Create new subcategory
        const payload = {
          name: subcategoryName,
          description,
          category_id: Number(selectedCategory),
        };
        response = await createSubCategory(payload).unwrap();
        toast.success(response?.message || "Subcategory created successfully");
        refetch();
      }
      handleClose();
    } catch (error) {
      const err = error as FetchBaseQueryError & {
        data?: { message?: string }
      };
      toast.error(err.data?.message || `Failed to ${isEditMode ? 'update' : 'create'} subcategory`);
    }
  };

  const handleEdit = (subcategory: any) => {
    setIsEditMode(true);
    setEditingId(subcategory.id);
    setSelectedCategory(subcategory.category_id.toString());
    setSubcategoryName(subcategory.name);
    setDescription(subcategory.description || "");
    setOpen(true);
  };

  const handleDeleteSubcategory = async (id: number) => {
    if (!window.confirm("Delete this subcategory?")) return;
    try {
      await deleteSubCategory(id).unwrap();
      toast.success("Subcategory deleted successfully");
      refetch();
    } catch (error: any) {
      toast.error(error.data?.message || "Failed to delete subcategory");
    }
  };

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          Error loading subcategories. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-neutral-800">Subcategories</h1>

        {/* Trigger Button */}
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 rounded-full px-6 py-3 bg-orange-600 text-white text-sm font-semibold shadow-md border border-orange-500 hover:bg-orange-500 hover:shadow-lg active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
        >
          <Plus size={20} /> Add Subcategory
        </button>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-orange-600" />
        </div>
      )}

      {/* Subcategories Table */}
      {!isLoading && subcategories.length === 0 && (
        <div className="text-center py-12 bg-neutral-50 rounded-lg">
          <p className="text-neutral-500">No subcategories found. Create your first subcategory!</p>
        </div>
      )}

      {!isLoading && subcategories.length > 0 && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th> */}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subcategory Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {subcategories.map((subcategory) => (
                <tr key={subcategory.id} className="hover:bg-gray-50">
                  {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{subcategory.id}</td> */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      {subcategory.category_name || `Category ${subcategory.category_id}`}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {subcategory.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {subcategory.description || "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(subcategory.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEdit(subcategory)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                      title="Edit subcategory"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteSubcategory(subcategory.id)}
                      className="text-red-600 hover:text-red-900"
                      title="Delete subcategory"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add/Edit Subcategory Modal */}
      <Modal title={isEditMode ? "Edit Subcategory" : "Add Subcategory"} isOpen={open} onClose={handleClose}>
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
              autoFocus
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
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div className="py-3 border-t border-neutral-200">
            <h3 className="text-sm font-semibold text-neutral-700 mb-2">
              Description
            </h3>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter The Subcategory Description"
              rows={4}
              className="w-full px-4 py-3 border-2 border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Confirm Button */}
          <div className="py-4 border-t border-neutral-200 flex justify-end gap-3">
            <button
              onClick={handleClose}
              className="px-6 py-3 bg-neutral-100 text-neutral-700 text-sm font-semibold rounded-lg hover:bg-neutral-200 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!isValid || isCreating || isUpdating}
              className={`px-6 py-3 bg-orange-600 text-white text-sm font-semibold rounded-lg shadow-md border border-orange-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 flex items-center gap-2
                ${!isValid || isCreating || isUpdating
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-orange-500 cursor-pointer hover:shadow-lg active:scale-95"
                }`}
            >
              {(isCreating || isUpdating) && <Loader2 className="w-4 h-4 animate-spin" />}
              {isCreating ? 'Creating...' : isUpdating ? 'Updating...' : (isEditMode ? 'Update Subcategory' : 'Add Subcategory')}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}