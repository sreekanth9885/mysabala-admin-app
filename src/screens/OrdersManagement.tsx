import { useState } from "react";
import { Search, Filter, Clock, CheckCircle, XCircle, Truck } from "lucide-react";

export function OrdersManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [orders, setOrders] = useState([
    {
      id: "#ORD-1234",
      customer: "John Doe",
      email: "john@example.com",
      items: "2x Pizza, 1x Burger",
      amount: "$45.99",
      status: "Delivered",
      date: "2026-05-13 10:30 AM",
    },
    {
      id: "#ORD-1233",
      customer: "Jane Smith",
      email: "jane@example.com",
      items: "3x Pasta, 2x Salad",
      amount: "$62.50",
      status: "In Progress",
      date: "2026-05-13 11:15 AM",
    },
    {
      id: "#ORD-1232",
      customer: "Mike Johnson",
      email: "mike@example.com",
      items: "1x Sushi Platter",
      amount: "$38.00",
      status: "Pending",
      date: "2026-05-13 12:00 PM",
    },
    {
      id: "#ORD-1231",
      customer: "Sarah Williams",
      email: "sarah@example.com",
      items: "4x Tacos, 1x Nachos",
      amount: "$29.99",
      status: "Delivered",
      date: "2026-05-12 09:45 AM",
    },
    {
      id: "#ORD-1230",
      customer: "Tom Brown",
      email: "tom@example.com",
      items: "2x Sandwich, 1x Coffee",
      amount: "$18.50",
      status: "Cancelled",
      date: "2026-05-12 02:30 PM",
    },
    {
      id: "#ORD-1229",
      customer: "Emily Davis",
      email: "emily@example.com",
      items: "1x Burger, 1x Fries, 1x Shake",
      amount: "$24.99",
      status: "In Progress",
      date: "2026-05-13 01:20 PM",
    },
  ]);

  const statusOptions = ["Pending", "In Progress", "Delivered", "Cancelled"];
  const filterOptions = ["all", ...statusOptions];

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "Delivered":
        return {
          color: "bg-green-100 text-green-700",
          icon: CheckCircle,
        };
      case "In Progress":
        return {
          color: "bg-blue-100 text-blue-700",
          icon: Truck,
        };
      case "Pending":
        return {
          color: "bg-yellow-100 text-yellow-700",
          icon: Clock,
        };
      case "Cancelled":
        return {
          color: "bg-red-100 text-red-700",
          icon: XCircle,
        };
      default:
        return {
          color: "bg-gray-100 text-gray-700",
          icon: Clock,
        };
    }
  };

  const handleStatusChange = (orderId: string, newStatus: string) => {
    setOrders(orders.map((order) =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Orders Management</h1>
        <p className="text-gray-600 mt-1">Track and manage customer orders</p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by order ID, customer name, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none appearance-none bg-white min-w-[200px]"
            >
              {filterOptions.map((status) => (
                <option key={status} value={status}>
                  {status === "all" ? "All Statuses" : status}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Orders Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
          <div className="flex items-center gap-3">
            <Clock className="text-yellow-600" size={24} />
            <div>
              <p className="text-sm text-yellow-700">Pending</p>
              <p className="text-xl font-bold text-yellow-800">
                {orders.filter((o) => o.status === "Pending").length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center gap-3">
            <Truck className="text-blue-600" size={24} />
            <div>
              <p className="text-sm text-blue-700">In Progress</p>
              <p className="text-xl font-bold text-blue-800">
                {orders.filter((o) => o.status === "In Progress").length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <div className="flex items-center gap-3">
            <CheckCircle className="text-green-600" size={24} />
            <div>
              <p className="text-sm text-green-700">Delivered</p>
              <p className="text-xl font-bold text-green-800">
                {orders.filter((o) => o.status === "Delivered").length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-red-50 rounded-lg p-4 border border-red-200">
          <div className="flex items-center gap-3">
            <XCircle className="text-red-600" size={24} />
            <div>
              <p className="text-sm text-red-700">Cancelled</p>
              <p className="text-xl font-bold text-red-800">
                {orders.filter((o) => o.status === "Cancelled").length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
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
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredOrders.map((order) => {
                const statusConfig = getStatusConfig(order.status);
                const StatusIcon = statusConfig.icon;

                return (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{order.customer}</p>
                        <p className="text-xs text-gray-500">{order.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{order.items}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{order.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${statusConfig.color} w-fit`}>
                        <StatusIcon size={14} />
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none bg-white"
                      >
                        {statusOptions.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {filteredOrders.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <div className="text-gray-400 mb-4">
            <Search size={48} className="mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">No orders found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
}
