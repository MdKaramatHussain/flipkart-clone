/**
 * Product Service - Abstraction Layer for Product Operations
 * 
 * This service provides an abstraction layer for all product-related operations.
 * Currently uses localStorage via Zustand, but can be easily replaced with:
 * - API calls to a backend server
 * - Direct database operations
 * - Third-party services (Firebase, Supabase, etc.)
 */

import { useProductStore } from '@/lib/store';
import type { Product } from '@/lib/types';

export const productService = {
  // ==================== PRODUCT MANAGEMENT ====================

  /**
   * Create a new product
   * @param product - Product object to create 
   */
  createProduct(product: Product): void {
    useProductStore.getState().addProduct(product);
  },

  /**
   * Get all products
   * @returns Array of all products
   */
  getAllProducts(): Product[] {
    return useProductStore.getState().products;
  },

  /**
   * Get product by ID
   * @param id - Product ID
   * @returns Product object or undefined
   */
  getProductById(id: string): Product | undefined {
    return useProductStore.getState().getProductById(id);
  },

  /**
   * Update product
   * @param id - Product ID
   * @param updates - Partial product object with updates
   */
  updateProduct(id: string, updates: Partial<Product>): void {
    useProductStore.getState().updateProduct(id, updates);
  },

  /**
   * Delete product
   * @param id - Product ID
   */
  deleteProduct(id: string): void {
    useProductStore.getState().deleteProduct(id);
  },

  // ==================== PRODUCT QUERIES ====================

  /**
   * Get products by category
   * @param category - Category name
   * @returns Array of products in category
   */
  getProductsByCategory(category: string): Product[] {
    return useProductStore.getState().getProductsByCategory(category);
  },

  /**
   * Get products by brand
   * @param brand - Brand name
   * @returns Array of products by brand
   */
  getProductsByBrand(brand: string): Product[] {
    return useProductStore.getState().getProductsByBrand(brand);
  },

  /**
   * Get featured products
   * @returns Array of featured products (up to 12)
   */
  getFeaturedProducts(): Product[] {
    return useProductStore.getState().getFeaturedProducts();
  },

  /**
   * Get trending products
   * @returns Array of trending products (up to 12)
   */
  getTrendingProducts(): Product[] {
    return useProductStore.getState().getTrendingProducts();
  },

  /**
   * Get new arrival products
   * @returns Array of new arrival products (up to 12)
   */
  getNewArrivals(): Product[] {
    return useProductStore.getState().getNewArrivals();
  },

  /**
   * Search products
   * @param query - Search query string
   * @returns Array of matching products
   */
  searchProducts(query: string): Product[] {
    return useProductStore.getState().searchProducts(query);
  },

  /**
   * Filter products
   * @param filters - Filter criteria
   * @returns Array of filtered products
   */
  filterProducts(filters: {
    category?: string;
    priceRange?: { min: number; max: number };
    rating?: number;
    brand?: string;
  }): Product[] {
    return useProductStore.getState().filterProducts(filters);
  },

  // ==================== BATCH OPERATIONS ====================

  /**
   * Bulk import products
   * @param products - Array of products to import
   */
  importProducts(products: Product[]): void {
    const currentProducts = useProductStore.getState().products;
    const newProducts = products.filter(
      (p) => !currentProducts.some((cp) => cp.id === p.id)
    );
    const allProducts = [...currentProducts, ...newProducts];
    useProductStore.getState().setProducts(allProducts);
  },

  /**
   * Replace all products
   * @param products - Array of products
   */
  setAllProducts(products: Product[]): void {
    useProductStore.getState().setProducts(products);
  },

  /**
   * Get product count
   * @returns Total number of products
   */
  getProductCount(): number {
    return useProductStore.getState().products.length;
  },

  /**
   * Get categories from products
   * @returns Array of unique categories
   */
  getCategories(): string[] {
    const products = useProductStore.getState().products;
    const categories = new Set(products.map((p) => p.category));
    return Array.from(categories).sort();
  },

  /**
   * Get brands from products
   * @returns Array of unique brands
   */
  getBrands(): string[] {
    const products = useProductStore.getState().products;
    const brands = new Set(products.map((p) => p.brand));
    return Array.from(brands).sort();
  },

  /**
   * Get price range of products
   * @returns Object with min and max prices
   */
  getPriceRange(): { min: number; max: number } {
    const products = useProductStore.getState().products;
    if (products.length === 0) return { min: 0, max: 0 };

    const prices = products.map((p) => p.price);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
    };
  },

  /**
   * Get related products (same category or brand)
   * @param productId - Product ID
   * @param limit - Number of products to return
   * @returns Array of related products
   */
  getRelatedProducts(productId: string, limit: number = 4): Product[] {
    const product = this.getProductById(productId);
    if (!product) return [];

    const products = useProductStore.getState().products;
    const related = products.filter(
      (p) =>
        p.id !== productId &&
        (p.category === product.category || p.brand === product.brand)
    );

    return related.slice(0, limit);
  },

  /**
   * Get best sellers (products with highest number of reviews)
   * @param limit - Number of products to return
   * @returns Array of best seller products
   */
  getBestSellers(limit: number = 12): Product[] {
    return useProductStore
      .getState()
      .products.sort((a, b) => b.reviews - a.reviews)
      .slice(0, limit);
  },

  /**
   * Get products on sale (products with discount > 0)
   * @param limit - Number of products to return
   * @returns Array of discounted products
   */
  getProductsOnSale(limit: number = 12): Product[] {
    return useProductStore
      .getState()
      .products.filter((p) => p.discount > 0)
      .sort((a, b) => b.discount - a.discount)
      .slice(0, limit);
  },
};
