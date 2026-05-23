'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Printer } from 'lucide-react';

// Mock orders data
const mockOrders = [
  {
    id: 'ORD-001',
    customer: 'John Doe',
    total: 14999,
    status: 'delivered',
    date: '2024-05-10',
    items: 3,
  },
  {
    id: 'ORD-002',
    customer: 'Jane Smith',
    total: 25499,
    status: 'shipped',
    date: '2024-05-11',
    items: 2,
  },
  {
    id: 'ORD-003',
    customer: 'Bob Johnson',
    total: 8999,
    status: 'pending',
    date: '2024-05-12',
    items: 1,
  },
  {
    id: 'ORD-004',
    customer: 'Alice Brown',
    total: 34999,
    status: 'confirmed',
    date: '2024-05-13',
    items: 4,
  },
  {
    id: 'ORD-005',
    customer: 'Charlie Wilson',
    total: 5999,
    status: 'cancelled',
    date: '2024-05-14',
    items: 1,
  },
];

export default function AdminOrdersPage() {
  const [orders] = useState(mockOrders);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-700';
      case 'shipped':
        return 'bg-blue-100 text-blue-700';
      case 'confirmed':
        return 'bg-purple-100 text-purple-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-6">Orders</h1>

      {/* Orders Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left font-bold">Order ID</th>
                <th className="px-6 py-3 text-left font-bold">Customer</th>
                <th className="px-6 py-3 text-left font-bold">Items</th>
                <th className="px-6 py-3 text-left font-bold">Total</th>
                <th className="px-6 py-3 text-left font-bold">Date</th>
                <th className="px-6 py-3 text-left font-bold">Status</th>
                <th className="px-6 py-3 text-left font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-primary">{order.id}</td>
                  <td className="px-6 py-4">{order.customer}</td>
                  <td className="px-6 py-4">{order.items}</td>
                  <td className="px-6 py-4 font-bold">₹{order.total.toLocaleString()}</td>
                  <td className="px-6 py-4">{order.date}</td>
                  <td className="px-6 py-4">
                    <Badge className={getStatusColor(order.status)}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" title="View Details">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" title="Print Invoice">
                        <Printer className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
