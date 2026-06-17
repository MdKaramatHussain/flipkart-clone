'use client';

import { use, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Heart, ShoppingCart, Share2, Star, Truck, Shield, RotateCcw, ChevronRight } from 'lucide-react';
import { useCartStore, useWishlistStore } from '@/lib/store';
import { useProductById } from '@/hooks/useProducts';
import { productService } from '@/services/productService';
import type { Product } from '@/lib/types';

export default function ProductDetail({ params, }: { params: Promise<{ id: string }>; }) {
  const { id } = use(params);
  const router = useRouter();
  
  // Get product from global store
  const product = useProductById(id);
  // Get similar products
  const similarProducts = product ? productService.getRelatedProducts(product.id, 5) : [];

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const { addToCart } = useCartStore();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlistStore();

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h1>
          <Link href="/products">
            <button className="px-8 py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700">
              Back to Products
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product.id, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product.id, quantity);
    router.push('/checkout');
  };

  const handleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product image */}
          <div>
            <div className="bg-gray-100 rounded-lg overflow-hidden mb-4">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-96 object-cover"
              />
            </div>

            {/* Thumbnail image */}
            {product.images?.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {product.images?.map((image, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-16 h-16 rounded border-2 overflow-hidden flex-shrink-0 ${selectedImage === idx
                      ? 'border-blue-600'
                      : 'border-gray-200 hover:border-gray-300'
                      }`}
                  >
                    <img src={image} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            {/* Title and Brand */}
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-2">{product.category}</p>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-gray-600">{product.brand}</p>
            </div>

            {/* Rating and Reviews */}
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
              <div className="flex items-center gap-1">
                {[...Array(Math.floor(product.rating))].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="font-medium text-gray-900">{product.rating}</span>
              <a href="#reviews" className="text-blue-600 hover:underline">
                {product.reviews.toLocaleString()} Reviews
              </a>
            </div>

            {/* Price Section */}
            <div className="mb-6">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-4xl font-bold text-gray-900">
                  ₹{product.price.toLocaleString()}
                </span>
                <span className="text-lg line-through text-gray-500">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
                <span className="text-lg font-bold text-green-600">
                  {product.discount}% off
                </span>
              </div>
              <p className="text-sm text-gray-600">Inclusive of all taxes</p>
            </div>

            {/* Stock and Delivery */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-2">
              <div className="flex items-center gap-2">
                {product.stock > 0 ? (
                  <>
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    <span className="text-green-600 font-medium">
                      {product.stock > 10 ? 'In Stock' : `Only ${product.stock} left`}
                    </span>
                  </>
                ) : (
                  <>
                    <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                    <span className="text-red-600 font-medium">Out of Stock</span>
                  </>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-gray-600" />
                <span className="text-gray-700">{product.delivery}</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-gray-600" />
                <span className="text-gray-700">{product.warranty} Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-gray-600" />
                <span className="text-gray-700">7-day return policy</span>
              </div>
            </div>

            {/* Quantity and Action Buttons */}
            <div className="flex gap-4 mb-6">
              <div className="flex items-center border border-gray-300 rounded">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 hover:bg-gray-100"
                >
                  -
                </button>
                <span className="px-4 py-2 border-l border-r border-gray-300">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 hover:bg-gray-100"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-grow py-3 bg-orange-500 text-white font-bold text-lg rounded hover:bg-orange-600 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>

              <button
                onClick={handleBuyNow}
                disabled={product.stock === 0}
                className="flex-grow py-3 bg-blue-600 text-white font-bold text-lg rounded hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                Buy Now
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Wishlist Button */}
            <button
              onClick={handleWishlist}
              className={`w-full px-4 py-3 border-2 rounded font-medium transition mb-6 flex items-center justify-center gap-2 ${inWishlist
                ? 'border-red-600 text-red-600 bg-red-50'
                : 'border-gray-300 text-gray-600 hover:border-gray-400'
                }`}
            >
              <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
              {inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
            </button>

            {/* Seller Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-700">
                <span className="font-medium">Sold by:</span> Flipkart
              </p>
              <p className="text-sm text-gray-600 mt-1">30-day easy returns and exchanges</p>
            </div>

            {/* Share */}
            <button className="flex items-center gap-2 text-blue-600 hover:underline">
              <Share2 className="w-4 h-4" />
              Share Product
            </button>
          </div>
        </div>

        {/* Product Specifications */}
        {Object.keys(product.specs).length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Specifications</h2>
            <div className="bg-white border border-gray-200 rounded">
              <div className="grid grid-cols-2 md:grid-cols-4">
                {Object.entries(product.specs).map(([key, value], idx) => (
                  <div
                    key={key}
                    className={`p-4 border-b border-gray-200 ${idx % 4 !== 3 ? 'md:border-r' : ''
                      }`}
                  >
                    <p className="text-sm text-gray-600 font-medium">{key}</p>
                    <p className="text-sm text-gray-900 mt-1">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Similar Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {similarProducts.map(prod => (
                <Link key={prod.id} href={`/products/${prod.id}`}>
                  <div className="bg-white border border-gray-200 rounded p-4 hover:shadow-lg transition cursor-pointer">
                    <div className="aspect-square bg-gray-100 rounded overflow-hidden mb-3">
                      <img src={prod.image} alt={prod.name} className="w-full h-full object-cover hover:scale-105 transition" />
                    </div>
                    <h3 className="font-medium text-gray-900 line-clamp-2 text-sm mb-2">{prod.name}</h3>
                    <div className="flex gap-2 items-baseline">
                      <span className="font-bold text-gray-900">₹{prod.price.toLocaleString()}</span>
                      <span className="text-xs line-through text-gray-500">
                        ₹{prod.originalPrice.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 mt-2">
                      {[...Array(Math.floor(prod.rating))].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="text-xs text-gray-600">({prod.reviews})</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Toast Notification */}
      {addedToCart && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded shadow-lg z-50">
          Product added to cart successfully!
        </div>
      )}
    </div>
  );
}
