import { useState } from "react";
import { Plus, Trash2, Edit, Loader2 } from "lucide-react";
import Modal from "../../components/Modal";
import {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation
} from "./categoriesApi";
import toast from "react-hot-toast";

export function Categories() {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<any>(null);

  const { data: categories = [], isLoading, refetch } = useGetCategoriesQuery();
  const [createCategory, { isLoading: isCreating }] = useCreateCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleCreateCategory = async () => {
    if (!categoryName.trim()) return;
    try {
      await createCategory({ name: categoryName.trim(), description: description.trim() || undefined }).unwrap();
      toast.success("Category created");
      handleClose();
      refetch();
    } catch (error: any) {
      toast.error(error.data?.message || "Failed to create");
    }
  };

  const handleUpdateCategory = async () => {
    if (!categoryName.trim() || !selectedCategory) return;
    try {
      await updateCategory({ id: selectedCategory.id, name: categoryName.trim(), description: description.trim() || undefined }).unwrap();
      toast.success("Category updated");
      handleEditClose();
      refetch();
    } catch (error: any) {
      toast.error(error.data?.message || "Failed to update");
    }
  };

  const handleDeleteCategory = async (id: number) => {
    if (!window.confirm("Delete this category?")) return;
    try {
      await deleteCategory(id).unwrap();
      toast.success("Category deleted");
      refetch();
    } catch (error: any) {
      toast.error(error.data?.message || "Failed to delete");
    }
  };

  const handleClose = () => {
    setOpen(false);
    setCategoryName("");
    setDescription("");
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setCategoryName("");
    setDescription("");
    setSelectedCategory(null);
  };

  const handleEdit = (category: any) => {
    setSelectedCategory(category);
    setCategoryName(category.name);
    setDescription(category.description || "");
    setEditOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-neutral-800">Categories</h1>
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-full hover:bg-orange-500"
        >
          <Plus size={20} /> Add Category
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-orange-600" />
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {categories.map((category) => (
                <tr key={category.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{category.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{category.description || "-"}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(category.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button onClick={() => handleEdit(category)} className="text-blue-600 hover:text-blue-900 mr-3">
                      <Edit size={18} />
                    </button>
                    <button onClick={() => handleDeleteCategory(category.id)} className="text-red-600 hover:text-red-900">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {categories.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    No categories found. Create your first category!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Create Modal */}
      <Modal title="Add Category" isOpen={open} onClose={handleClose}>
        <div className="space-y-4">
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Category Name *"
            className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            autoFocus
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            rows={4}
            className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <div className="flex justify-end gap-3 pt-4">
            <button onClick={handleClose} className="px-6 py-3 bg-gray-100 rounded-lg hover:bg-gray-200">
              Cancel
            </button>
            <button
              onClick={handleCreateCategory}
              disabled={!categoryName.trim() || isCreating}
              className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-500 disabled:opacity-50"
            >
              {isCreating ? "Adding..." : "Add"}
            </button>
          </div>
        </div>
      </Modal>

      {/* Edit Modal */}
      <Modal title="Edit Category" isOpen={editOpen} onClose={handleEditClose}>
        <div className="space-y-4">
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Category Name *"
            className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            autoFocus
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            rows={4}
            className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <div className="flex justify-end gap-3 pt-4">
            <button onClick={handleEditClose} className="px-6 py-3 bg-gray-100 rounded-lg hover:bg-gray-200">
              Cancel
            </button>
            <button
              onClick={handleUpdateCategory}
              disabled={!categoryName.trim() || isUpdating}
              className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-500 disabled:opacity-50"
            >
              {isUpdating ? "Updating..." : "Update"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}