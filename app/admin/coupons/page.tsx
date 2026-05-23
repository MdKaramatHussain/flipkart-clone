'use client';

import { Card } from '@/components/ui/card';
import { COUPONS } from '@/constants/data';
import { Badge } from '@/components/ui/badge';

export default function AdminCouponsPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Coupons</h1>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left font-bold">Code</th>
                <th className="px-6 py-3 text-left font-bold">Discount</th>
                <th className="px-6 py-3 text-left font-bold">Min Order</th>
                <th className="px-6 py-3 text-left font-bold">Usage</th>
                <th className="px-6 py-3 text-left font-bold">Expires</th>
                <th className="px-6 py-3 text-left font-bold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {COUPONS.map((coupon) => (
                <tr key={coupon.id} className="hover:bg-muted/50">
                  <td className="px-6 py-4 font-bold text-primary">{coupon.code}</td>
                  <td className="px-6 py-4">
                    {coupon.discountType === 'percentage'
                      ? `${coupon.discount}%`
                      : `₹${coupon.discount}`}
                  </td>
                  <td className="px-6 py-4">₹{coupon.minOrderValue.toLocaleString()}</td>
                  <td className="px-6 py-4">{coupon.usedCount}/{coupon.usageLimit}</td>
                  <td className="px-6 py-4">
                    {coupon.expiryDate.toLocaleDateString('en-IN')}
                  </td>
                  <td className="px-6 py-4">
                    <Badge
                      className={
                        coupon.active
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }
                    >
                      {coupon.active ? 'Active' : 'Expired'}
                    </Badge>
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
