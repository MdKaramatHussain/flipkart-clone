'use client';

import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { BANNERS } from '@/constants/data';
import { Badge } from '@/components/ui/badge';

export default function AdminBannersPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Banners</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {BANNERS.map((banner) => (
          <Card key={banner.id} className="overflow-hidden">
            <div className="aspect-video relative bg-muted">
              <Image
                src={banner.image}
                alt={banner.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-bold text-lg">{banner.title}</h3>
                <Badge
                  className={
                    banner.active
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-700'
                  }
                >
                  {banner.active ? 'Active' : 'Inactive'}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{banner.description}</p>
              <div className="flex gap-2">
                <button className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded hover:opacity-90 text-sm font-medium">
                  Edit
                </button>
                <button className="flex-1 px-4 py-2 border border-border rounded hover:bg-muted text-sm font-medium">
                  Delete
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
