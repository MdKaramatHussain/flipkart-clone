'use client';

import { useRouter } from 'next/navigation';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useOrdersStore } from '@/lib/store';

export default function OrdersPage() {
  const router = useRouter();
  const { orders } = useOrdersStore();

  const handleViewOrder = (orderId: string) => {
    router.push(`/orders/${orderId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>

        {orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map(order => (
              <div
                key={order.id}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition cursor-pointer"
                onClick={() => handleViewOrder(order.id)}
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {/* Order ID and Status */}
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Order ID</p>
                    <p className="font-bold text-gray-900">{order.id}</p>
                    <div className="flex items-center gap-2 mt-3">
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
                    </div>
                  </div>

                  {/* Items and Price */}
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Items</p>
                    <p className="font-bold text-gray-900">{order.items.length} item(s)</p>
                    <p className="text-sm text-gray-600 mt-3">₹{order.total.toLocaleString()}</p>
                  </div>

                  {/* Ordered Date */}
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Ordered On</p>
                    <p className="font-bold text-gray-900">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-gray-600 mt-3">
                      Est. Delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}
                    </p>
                  </div>

                  {/* View Details */}
                  <div className="flex items-end">
                    <button className="w-full py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition flex items-center justify-center gap-2">
                      View Details
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded border border-gray-200">
            <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No orders yet</h2>
            <p className="text-gray-600 mb-8">Start shopping to place your first order</p>
            <button
              onClick={() => router.push('/products')}
              className="px-8 py-3 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition"
            >
              Start Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
