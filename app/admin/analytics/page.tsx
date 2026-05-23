'use client';

import { Card } from '@/components/ui/card';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { dashboardService } from '@/services/api';
import { useEffect, useState } from 'react';
import type { ChartData } from '@/types';

export default function AdminAnalyticsPage() {
  const [revenueData, setRevenueData] = useState<ChartData[]>([]);
  const [topProducts, setTopProducts] = useState<ChartData[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const [revenue, products] = await Promise.all([
        dashboardService.getRevenueData(),
        dashboardService.getTopProducts(),
      ]);
      setRevenueData(revenue);
      setTopProducts(products);
    };
    loadData();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Analytics</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card className="p-6">
          <h3 className="font-bold text-lg mb-4">Monthly Revenue</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Orders Chart */}
        <Card className="p-6">
          <h3 className="font-bold text-lg mb-4">Monthly Orders</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="orders" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Top Products */}
      <Card className="p-6">
        <h3 className="font-bold text-lg mb-4">Top Performing Products</h3>
        <div className="space-y-3">
          {topProducts.map((product, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted rounded">
              <div className="flex-1">
                <p className="font-medium">{product.name}</p>
                <p className="text-sm text-muted-foreground">{product.value} units sold</p>
              </div>
              <div className="text-right">
                <p className="font-bold">
                  ₹{(product.revenue ? product.revenue / 1000000 : 0).toFixed(1)}M
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
