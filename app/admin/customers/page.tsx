'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin } from 'lucide-react';

const mockCustomers = [
  { id: '1', name: 'John Doe', email: 'john@example.com', phone: '9876543210', city: 'Delhi', orders: 5 },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', phone: '9876543211', city: 'Mumbai', orders: 3 },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', phone: '9876543212', city: 'Bangalore', orders: 2 },
];

export default function AdminCustomersPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Customers</h1>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left font-bold">Name</th>
                <th className="px-6 py-3 text-left font-bold">Email</th>
                <th className="px-6 py-3 text-left font-bold">Phone</th>
                <th className="px-6 py-3 text-left font-bold">City</th>
                <th className="px-6 py-3 text-left font-bold">Orders</th>
                <th className="px-6 py-3 text-left font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {mockCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-muted/50">
                  <td className="px-6 py-4 font-medium">{customer.name}</td>
                  <td className="px-6 py-4 text-muted-foreground">{customer.email}</td>
                  <td className="px-6 py-4">{customer.phone}</td>
                  <td className="px-6 py-4">{customer.city}</td>
                  <td className="px-6 py-4 font-bold">{customer.orders}</td>
                  <td className="px-6 py-4">
                    <Button variant="ghost" size="sm">View</Button>
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
