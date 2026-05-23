'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CATEGORIES } from '@/constants/data';
import { Button } from '@/components/ui/button';

export function CategorySidebar() {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get('category');

  return (
    <div className="hidden lg:flex flex-col gap-1 w-48">
      <h3 className="font-bold mb-3 px-2">Categories</h3>
      {CATEGORIES.map((category) => (
        <Link
          key={category.id}
          href={`/products?category=${category.id}`}
          className={`px-3 py-2 rounded-lg text-sm transition-colors ${
            activeCategory === category.id
              ? 'bg-primary text-primary-foreground'
              : 'hover:bg-muted'
          }`}
        >
          <span className="mr-2">{category.icon}</span>
          {category.name}
        </Link>
      ))}
    </div>
  );
}
