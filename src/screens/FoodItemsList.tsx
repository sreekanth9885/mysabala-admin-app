import { useState } from "react";
import { Link } from "react-router";
import { Search, Plus, Edit, Trash2, Filter } from "lucide-react";
import { ImageWithFallback } from "../components/ImageWithFallback";

export function FoodItemsList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const foodItems = [
    {
      id: "1",
      name: "Margherita Pizza",
      category: "Pizza",
      price: "₹12.99",
      image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400",
      available: true,
      description: "Classic pizza with tomato sauce and mozzarella",
    },
    {
      id: "2",
      name: "Chicken Burger",
      category: "Burgers",
      price: "₹8.99",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
      available: true,
      description: "Grilled chicken with lettuce and mayo",
    },
    {
      id: "3",
      name: "Caesar Salad",
      category: "Salads",
      price: "₹6.99",
      image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400",
      available: false,
      description: "Fresh romaine lettuce with Caesar dressing",
    },
    {
      id: "4",
      name: "Sushi Platter",
      category: "Japanese",
      price: "₹24.99",
      image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400",
      available: true,
      description: "Assorted sushi rolls with wasabi and soy sauce",
    },
    {
      id: "5",
      name: "Pasta Carbonara",
      category: "Pasta",
      price: "₹14.99",
      image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400",
      available: true,
      description: "Creamy pasta with bacon and parmesan",
    },
    {
      id: "6",
      name: "Tacos",
      category: "Mexican",
      price: "₹9.99",
      image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400",
      available: true,
      description: "Soft shell tacos with beef and vegetables",
    },
  ];

  const categories = ["all", "Pizza", "Burgers", "Salads", "Japanese", "Pasta", "Mexican"];

  const filteredItems = foodItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

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
          Add New Item
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
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "all" ? "All Categories" : cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Food Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all"
          >
            <div className="relative h-48">
              <ImageWithFallback
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    item.available
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {item.available ? "Available" : "Unavailable"}
                </span>
              </div>
            </div>
            <div className="p-5">
              <div className="mb-3">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">{item.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{item.category}</p>
                <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xl font-bold text-orange-600">{item.price}</span>
              </div>
              <div className="flex gap-2">
                <Link
                  to={`/food-items/edit/${item.id}`}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-all"
                >
                  <Edit size={16} />
                  Edit
                </Link>
                <button className="flex items-center justify-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition-all">
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <div className="text-gray-400 mb-4">
            <Search size={48} className="mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">No food items found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
}
