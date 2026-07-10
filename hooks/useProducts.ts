/**
 * Product Store Hooks - React hooks for accessing product store
 * 
 * These hooks provide convenient access to product store state and actions.
 */

'use client';

import { useProductStore } from '@/lib/store';
import React from 'react';

/**
 * Hook to get all products
 */
export const useProducts = () => {
    const products = useProductStore((state) => state.products);
    return products;
};

/**
 * Hook to get product by ID
 */
export const useProductById = (id: string) => {
    const product = useProductStore((state) => state.products);

    return React.useMemo(
        () => product.find((p) => p.id === id),
        [product, id]
    );
};

/**
 * Hook to get products by category
 */
export const useProductsByCategory = (category: string) => {
    const products = useProductStore((state) => state.products);

    return React.useMemo(
        () =>
            products.filter(
                (product) =>
                    product.category.toLowerCase() === category.toLowerCase()
            ),
        [products, category]
    );
};

/**
 * Hook to get products by brand
 */
export const useProductsByBrand = (brand: string) => {
    const products = useProductStore((state) => state.products);

    return React.useMemo(
        () =>
            products.filter(
                (product) =>
                    product.brand.toLowerCase() === brand.toLowerCase()
            ),
        [products, brand]
    );
};

/**
 * Hook to get featured products
 */
export const useFeaturedProducts = () => {
    const products = useProductStore((state) => state.products);

    return React.useMemo(
        () => products.filter((p) => p.isFeatured).slice(0, 12),
        [products]
    );
};

/**
 * Hook to get trending products
 */
export const useTrendingProducts = () => {
    const products = useProductStore((state) => state.products);

    return React.useMemo(
        () => products.filter((p) => p.isTrending).slice(0, 12),
        [products]
    );
};

/**
 * Hook to get new arrival products
 */
export const useNewArrivals = () => {
    const products = useProductStore((state) => state.products);

    return React.useMemo(
        () => products.filter((p) => p.isNewArrival).slice(0, 12),
        [products]
    );
};

/**
 * Hook to search products
 */
export const useSearchProducts = (query: string) => {
    const products = useProductStore((state) => state.products);

    return React.useMemo(() => {
        if (!query) return products;
        const lowerQuery = query.toLowerCase();
        return products.filter(
            (product) =>
                product.name.toLowerCase().includes(lowerQuery) ||
                product.description.toLowerCase().includes(lowerQuery) ||
                product.brand.toLowerCase().includes(lowerQuery) ||
                product.category.toLowerCase().includes(lowerQuery)
        );
    }, [products, query]);
};

/**
 * Hook to filter products
 */
export const useFilterProducts = (filters: {
    category?: string;
    priceRange?: { min: number; max: number };
    rating?: number;
    brand?: string;
}) => {
    const products = useProductStore((state) => state.products);

    return React.useMemo(() => {
        let filtered = [...products];

        if (filters.category) {
            filtered = filtered.filter(
                (product) =>
                    product.category.toLowerCase() === filters.category!.toLowerCase()
            );
        }

        if (filters.priceRange) {
            filtered = filtered.filter(
                (product) =>
                    product.price >= filters.priceRange!.min &&
                    product.price <= filters.priceRange!.max
            );
        }

        if (filters.rating) {
            filtered = filtered.filter(
                (product) => product.rating >= filters.rating!
            );
        }

        if (filters.brand) {
            filtered = filtered.filter(
                (product) =>
                    product.brand.toLowerCase() === filters.brand!.toLowerCase()
            );
        }

        return filtered;
    }, [products, filters]);
};

/**
 * Hook to get product store actions
 */
export const useProductActions = () => {
    const addProduct = useProductStore((state) => state.addProduct);
    const updateProduct = useProductStore((state) => state.updateProduct);
    const deleteProduct = useProductStore((state) => state.deleteProduct);
    const setProducts = useProductStore((state) => state.setProducts);

    return React.useMemo(
        () => ({
            addProduct,
            updateProduct,
            deleteProduct,
            setProducts,
        }),
        [addProduct, updateProduct, deleteProduct, setProducts]
    );
};

/**
 * Hook to get full product store
 */
export const useProductStore_ = () => {
    return useProductStore();
};
