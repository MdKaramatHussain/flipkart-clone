'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { useWishlistStore } from '@/store/useStore';
import { PRODUCTS } from '@/constants/data';
import { useRouter } from 'next/navigation';

export default function WishlistPage() {
  const router = useRouter();
  const wishlist = useWishlistStore((state) => state.wishlist);

  const wishlistProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>

        {wishlistProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Your wishlist is empty</h2>
              <p className="text-muted-foreground mb-8">
                Add products to your wishlist to save them for later
              </p>
              <Button onClick={() => router.push('/products')} size="lg">
                Start Shopping
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <p className="text-muted-foreground mb-6">
              {wishlistProducts.length} item{wishlistProducts.length !== 1 ? 's' : ''} in your wishlist
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {wishlistProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
