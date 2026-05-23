'use client';

import { BarChart3, ShoppingBag, TrendingUp } from 'lucide-react';
import { useOrdersStore } from '@/lib/store';

export default function AdminDashboard() {
  const { orders } = useOrdersStore();

  const stats = {
    totalOrders: orders.length,
    totalRevenue: orders.reduce((sum, o) => sum + o.total, 0),
    pendingOrders: orders.filter(o => o.status === 'pending').length,
    deliveredOrders: orders.filter(o => o.status === 'delivered').length,
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Order management and analytics</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Orders</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalOrders}</p>
              </div>
              <ShoppingBag className="w-12 h-12 text-blue-600 opacity-20" />
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-900">
                  ₹{(stats.totalRevenue / 100000).toFixed(1)}L
                </p>
              </div>
              <TrendingUp className="w-12 h-12 text-green-600 opacity-20" />
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Pending Orders</p>
                <p className="text-3xl font-bold text-orange-600">{stats.pendingOrders}</p>
              </div>
              <BarChart3 className="w-12 h-12 text-orange-600 opacity-20" />
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Delivered Orders</p>
                <p className="text-3xl font-bold text-green-600">{stats.deliveredOrders}</p>
              </div>
              <TrendingUp className="w-12 h-12 text-green-600 opacity-20" />
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Orders</h2>

          {orders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-bold text-gray-900">Order ID</th>
                    <th className="text-left py-3 px-4 font-bold text-gray-900">Items</th>
                    <th className="text-left py-3 px-4 font-bold text-gray-900">Total</th>
                    <th className="text-left py-3 px-4 font-bold text-gray-900">Status</th>
                    <th className="text-left py-3 px-4 font-bold text-gray-900">Date</th>
                    <th className="text-left py-3 px-4 font-bold text-gray-900">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-900">{order.id}</td>
                      <td className="py-3 px-4 text-sm text-gray-700">{order.items.length} item(s)</td>
                      <td className="py-3 px-4 text-sm font-bold text-gray-900">
                        ₹{order.total.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-sm">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium text-white ${
                            order.status === 'delivered'
                              ? 'bg-green-500'
                              : order.status === 'shipped'
                              ? 'bg-blue-500'
                              : 'bg-orange-500'
                          }`}
                        >
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-700">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 text-sm">
                        <a href={`/orders/${order.id}`} className="text-blue-600 hover:text-blue-700 font-medium">
                          View
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No orders yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
