import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Plus, Edit, Trash2, Filter, Loader2 } from "lucide-react";
import { ImageWithFallback } from "../../components/ImageWithFallback";
import {
  useGetFoodItemsQuery,
  useDeleteFoodItemMutation,
} from "./foodItemsApi";
import { useGetCategoriesQuery } from "../category/categoriesApi";
import toast from "react-hot-toast";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export function FoodItemsList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Fetch data from APIs
  const { data: foodItems = [], isLoading, error, refetch } = useGetFoodItemsQuery();
  const { data: categories = [] } = useGetCategoriesQuery();
  const [deleteFoodItem, { isLoading: isDeleting }] = useDeleteFoodItemMutation();

  // Handle delete
  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this food item?")) return;

    try {
      await deleteFoodItem(id).unwrap();
      toast.success("Food item deleted successfully");
      refetch();
    } catch (error) {
      const err = error as FetchBaseQueryError & {
        data?: { message?: string }
      };
      toast.error(err.data?.message || "Failed to delete food item");
    }
  };

  // Filter food items
  const filteredItems = foodItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = categoryFilter === "all" || item.category_id.toString() === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Handle loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-orange-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading food items...</p>
        </div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p className="text-red-700 mb-2">Error loading food items</p>
        <button
          onClick={() => refetch()}
          className="text-red-600 hover:text-red-800 underline"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Food Items</h1>
          <p className="text-gray-600 mt-1">Manage your food catalog and menu items</p>
        </div>
        <Link
          to="/food-items/add"
          className="flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-all shadow-lg hover:shadow-xl"
        >
          <Plus size={20} />
          Add New Fooditem
        </Link>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search food items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none appearance-none bg-white min-w-[200px]"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-sm text-gray-600 mb-1">Total Items</p>
          <p className="text-2xl font-bold text-gray-800">{foodItems.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-sm text-gray-600 mb-1">Available Items</p>
          <p className="text-2xl font-bold text-green-600">
            {foodItems.filter(item => item.is_available === 1).length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-sm text-gray-600 mb-1">Filtered Results</p>
          <p className="text-2xl font-bold text-orange-600">{filteredItems.length}</p>
        </div>
      </div>

      {/* Food Items Grid */}
      {filteredItems.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <div className="text-gray-400 mb-4">
            <Search size={48} className="mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">No food items found</h3>
          <p className="text-gray-600">
            {searchQuery || categoryFilter !== "all"
              ? "Try adjusting your search or filter criteria"
              : "Click 'Add New Item' to create your first food item"}
          </p>
        </div>
      ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <div className="relative h-48">
                  <ImageWithFallback
                    src={
                      item.image
                        ? `${import.meta.env.VITE_API_URL}/${item.image}`
                        : "https://via.placeholder.com/400x300?text=No+Image"
                    }
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.is_available === 1
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                        }`}
                    >
                      {item.is_available === 1 ? "Available" : "Unavailable"}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="mb-3">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{item.name}</h3>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                        {item.category_name || `Category ${item.category_id}`}
                      </span>
                      {item.sub_category_name && (
                        <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full">
                          {item.sub_category_name}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {item.description || "No description available"}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xl font-bold text-orange-600">
                      ₹{Number(item.price).toFixed(2)}
                    </span>
                    <span className="text-xs text-gray-500">
                      Added: {new Date(item.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      to={`/food-items/edit/${item.id}`}
                      className="flex-1 flex items-center justify-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-all"
                    >
                      <Edit size={16} />
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(item.id)}
                      disabled={isDeleting}
                      className="flex-1 flex items-center justify-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isDeleting ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}