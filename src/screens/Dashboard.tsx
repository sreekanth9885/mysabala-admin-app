import { Link } from "react-router";
import { ShoppingCart, UtensilsCrossed, TrendingUp, Plus, Eye, IndianRupee } from "lucide-react";

export function Dashboard() {
  const stats = [
    {
      title: "Total Orders",
      value: "1,234",
      change: "+12.5%",
      icon: ShoppingCart,
      color: "bg-blue-500",
    },
    {
      title: "Total Food Items",
      value: "156",
      change: "+3.2%",
      icon: UtensilsCrossed,
      color: "bg-orange-500",
    },
    {
      title: "Revenue Today",
      value: "₹8,450",
      change: "+8.1%",
      icon: IndianRupee,
      color: "bg-green-500",
    },
    {
      title: "Growth",
      value: "23.5%",
      change: "+2.4%",
      icon: TrendingUp,
      color: "bg-purple-500",
    },
  ];

  const recentOrders = [
    {
      id: "#ORD-1234",
      customer: "John Doe",
      items: "2x Pizza, 1x Burger",
      amount: "₹45.99",
      status: "Delivered",
      statusColor: "bg-green-100 text-green-700",
    },
    {
      id: "#ORD-1233",
      customer: "Jane Smith",
      items: "3x Pasta, 2x Salad",
      amount: "₹62.50",
      status: "In Progress",
      statusColor: "bg-blue-100 text-blue-700",
    },
    {
      id: "#ORD-1232",
      customer: "Mike Johnson",
      items: "1x Sushi Platter",
      amount: "₹38.00",
      status: "Pending",
      statusColor: "bg-yellow-100 text-yellow-700",
    },
    {
      id: "#ORD-1231",
      customer: "Sarah Williams",
      items: "4x Tacos, 1x Nachos",
      amount: "₹29.99",
      status: "Delivered",
      statusColor: "bg-green-100 text-green-700",
    },
    {
      id: "#ORD-1230",
      customer: "Tom Brown",
      items: "2x Sandwich, 1x Coffee",
      amount: "₹18.50",
      status: "Cancelled",
      statusColor: "bg-red-100 text-red-700",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                  <Icon size={24} className="text-white" />
                </div>
                <span className="text-sm font-medium text-green-600">{stat.change}</span>
              </div>
              <h3 className="text-gray-600 text-sm mb-1">{stat.title}</h3>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/food-items/add"
            className="flex items-center gap-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-all group"
          >
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-200">
              <Plus size={20} className="text-orange-600" />
            </div>
            <div>
              <p className="font-medium text-gray-800">Add Food Item</p>
              <p className="text-sm text-gray-500">Create new menu item</p>
            </div>
          </Link>

          <Link
            to="/food-items"
            className="flex items-center gap-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all group"
          >
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200">
              <Eye size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="font-medium text-gray-800">View All Items</p>
              <p className="text-sm text-gray-500">Manage food catalog</p>
            </div>
          </Link>

          <Link
            to="/orders"
            className="flex items-center gap-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all group"
          >
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200">
              <ShoppingCart size={20} className="text-purple-600" />
            </div>
            <div>
              <p className="font-medium text-gray-800">Manage Orders</p>
              <p className="text-sm text-gray-500">Track order status</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">Recent Orders</h3>
            <Link to="/orders" className="text-sm text-orange-600 hover:text-orange-700 font-medium">
              View All →
            </Link>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{order.customer}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.items}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${order.statusColor}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
