'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    storeName: 'Flipkart',
    storeEmail: 'support@flipkart.com',
    storePhone: '1-800-FLIPKART',
    shippingCost: '50',
    taxRate: '18',
    minOrderValue: '500',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Mock save
    alert('Settings saved successfully!');
  };

  return (
    <div className="p-6 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Store Settings</h1>

      <Card className="p-6 space-y-6">
        {/* Store Information */}
        <div>
          <h2 className="text-xl font-bold mb-4">Store Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Store Name</label>
              <Input
                name="storeName"
                value={settings.storeName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Store Email</label>
              <Input
                type="email"
                name="storeEmail"
                value={settings.storeEmail}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Store Phone</label>
              <Input
                name="storePhone"
                value={settings.storePhone}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Business Settings */}
        <div className="border-t border-border pt-6">
          <h2 className="text-xl font-bold mb-4">Business Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Shipping Cost (₹)</label>
              <Input
                type="number"
                name="shippingCost"
                value={settings.shippingCost}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Tax Rate (%)</label>
              <Input
                type="number"
                name="taxRate"
                value={settings.taxRate}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Minimum Order Value (₹)</label>
              <Input
                type="number"
                name="minOrderValue"
                value={settings.minOrderValue}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="border-t border-border pt-6 flex gap-3">
          <Button onClick={handleSave}>Save Settings</Button>
          <Button
            variant="outline"
            onClick={() => {
              setSettings({
                storeName: 'Flipkart',
                storeEmail: 'support@flipkart.com',
                storePhone: '1-800-FLIPKART',
                shippingCost: '50',
                taxRate: '18',
                minOrderValue: '500',
              });
            }}
          >
            Reset
          </Button>
        </div>
      </Card>
    </div>
  );
}
