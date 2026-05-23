'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft, Package, Truck, MapPin, CreditCard, CheckCircle } from 'lucide-react';
import { useOrdersStore } from '@/lib/store';
import { PRODUCTS } from '@/lib/constants';

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { orders } = useOrdersStore();
  const order = orders.find(o => o.id === params.id);

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Order not found</h1>
          <button
            onClick={() => router.push('/orders')}
            className="px-8 py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700"
          >
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-50 border-green-200';
      case 'shipped':
        return 'bg-blue-50 border-blue-200';
      case 'processing':
        return 'bg-orange-50 border-orange-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-6 h-6 text-green-600" />;
      case 'shipped':
        return <Truck className="w-6 h-6 text-blue-600" />;
      case 'processing':
        return <Package className="w-6 h-6 text-orange-600" />;
      default:
        return <Package className="w-6 h-6 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
        >
          <ChevronLeft className="w-5 h-5" />
          Back
        </button>

        {/* Order Status */}
        <div className={`bg-white border-2 rounded-lg p-6 mb-6 ${getStatusColor(order.status)}`}>
          <div className="flex items-start gap-4">
            {getStatusIcon(order.status)}
            <div className="flex-grow">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Order {order.id}
              </h1>
              <p className="text-gray-700 capitalize">
                Status: <span className="font-bold">{order.status}</span>
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Ordered on: {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 mb-1">Order Total</p>
              <p className="text-3xl font-bold text-gray-900">₹{order.total.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Items</h2>
              <div className="space-y-4">
                {order.items.map((item, idx) => {
                  const product = PRODUCTS.find(p => p.id === item.productId);
                  return (
                    <div key={idx} className="flex gap-4 pb-4 border-b border-gray-200 last:border-b-0">
                      {product && (
                        <>
                          <img
                            src={item.image}
                            alt={item.productName}
                            className="w-20 h-20 object-cover rounded bg-gray-100"
                          />
                          <div className="flex-grow">
                            <h3 className="font-bold text-gray-900">{item.productName}</h3>
                            <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                            <p className="text-lg font-bold text-gray-900 mt-2">
                              ₹{item.price.toLocaleString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-600">Subtotal</p>
                            <p className="text-lg font-bold text-gray-900">
                              ₹{(item.price * item.quantity).toLocaleString()}
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Shipping Address
              </h2>
              <p className="font-bold text-gray-900">{order.shippingAddress.name}</p>
              <p className="text-gray-700 mt-2">{order.shippingAddress.street}</p>
              <p className="text-gray-700">
                {order.shippingAddress.city}, {order.shippingAddress.state} -{' '}
                {order.shippingAddress.pincode}
              </p>
              <p className="text-gray-700 mt-2">Phone: {order.shippingAddress.phone}</p>
            </div>

            {/* Payment Information */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Payment Information
              </h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Method</span>
                  <span className="font-bold text-gray-900 capitalize">
                    {order.paymentMethod}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Status</span>
                  <span className="font-bold text-green-600">Paid</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Order Summary */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-8">
              <h3 className="font-bold text-lg text-gray-900 mb-4">Order Summary</h3>
              <div className="space-y-3 pb-4 border-b border-gray-200">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{order.subtotal.toLocaleString()}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span className="font-medium">-₹{order.discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className={order.shipping === 0 ? 'text-green-600 font-medium' : ''}>
                    {order.shipping === 0 ? 'FREE' : `₹${order.shipping.toLocaleString()}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">₹{order.tax.toLocaleString()}</span>
                </div>
              </div>
              <div className="flex justify-between py-4">
                <span className="font-bold text-lg">Total Amount</span>
                <span className="font-bold text-lg">₹{order.total.toLocaleString()}</span>
              </div>

              {/* Estimated Delivery */}
              <div className="bg-blue-50 border border-blue-200 rounded p-4">
                <p className="text-sm text-gray-700 mb-1">
                  <span className="font-bold">Estimated Delivery</span>
                </p>
                <p className="font-bold text-blue-600">
                  {new Date(order.estimatedDelivery).toLocaleDateString()}
                </p>
              </div>

              {/* Track Button */}
              <button className="w-full mt-4 py-3 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition">
                Track Shipment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
