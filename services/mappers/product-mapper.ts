import type { Product } from '@/lib/types';
import type { ScrapedProductData } from '../import/types';
import { CATEGORIES } from '@/constants/data';

/**
 * Maps scraped product data to the Product interface
 */
export class ProductMapper {
    /**
     * Convert ScrapedProductData to Product
     */
    static mapToProduct(scraped: ScrapedProductData): Partial<Product> {
        const categoryId = this.mapCategory(scraped.category || scraped.subcategory);

        const seller: Partial<Product['seller']> = {
            id: scraped.seller?.name ? `SELLER-${scraped.seller.name.toUpperCase().replace(/\s+/g, '-')}` : `SELLER-${Date.now()}` || 'SELLER-UNKNOWN',
            name: scraped.seller?.name,
            verified: scraped.seller?.verified || false,
            rating: scraped.seller?.name ? Math.round(Math.random() * 5 * 10) / 10 : 0.0 // Random rating for demo
        };
        const product: Partial<Product> = {
            id: `IMP-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            name: scraped.title || 'Unnamed Product',
            description: scraped.description || '',
            price: scraped.price || 0,
            originalPrice: scraped.originalPrice || scraped.price || 0,
            discount: this.calculateDiscount(scraped.price, scraped.originalPrice),
            rating: scraped.rating,
            reviews: scraped.reviews || 0,
            image: this.selectBestImage(scraped.images),
            category: this.getCategoryName(categoryId),
            categoryId: categoryId || '1',
            brand: scraped.brand || 'Unknown Brand',
            stock: this.mapStockStatus(scraped.stock, scraped.stockStatus),
            sku: scraped.sku,
            specs: this.mapSpecifications(scraped.specifications),
            seller: {id: seller.id || 'SELLER-UNKNOWN', name: seller.name || 'Unknown Seller', verified: seller.verified || false, rating: seller.rating},
            isFeatured: Boolean(scraped.rating && scraped.rating >= 4.5),
            isTrending: Boolean(scraped.reviews && scraped.reviews > 100),
        };

        // Add SEO fields if available
        if (scraped.seoTitle || scraped.seoDescription) {
            product.seoTitle = scraped.seoTitle || scraped.title;
            product.seoDescription = scraped.seoDescription || scraped.description?.substring(0, 160);
        }

        // Remove undefined values
        return Object.fromEntries(
            Object.entries(product).filter(([, v]) => v !== undefined && v !== null && v !== '')
        );
    }

    /**
     * Map scraped category to application category ID
     */
    private static mapCategory(category?: string): string {
        if (!category) return '1'; // Default to Electronics

        const normalized = category.toLowerCase().trim();

        const categoryMap: Record<string, string> = {
            electronics: '1',
            'mobiles & accessories': '1',
            'mobile phones': '1',
            phones: '1',
            laptop: '1',
            camera: '1',
            headphones: '1',

            fashion: '2',
            clothing: '2',
            apparel: '2',
            shirts: '2',
            dresses: '2',
            shoes: '2',
            footwear: '2',

            'home & living': '3',
            'home & garden': '3',
            furniture: '3',
            kitchen: '3',

            sports: '4',
            //   sports & outdoors: '4',
            fitness: '4',

            books: '5',
            'books & media': '5',

            beauty: '6',
            'beauty & personal care': '6',
            skincare: '6',
            makeup: '6',
        };

        for (const [key, catId] of Object.entries(categoryMap)) {
            if (normalized.includes(key) || key.includes(normalized)) {
                return catId;
            }
        }

        // Check for partial matches
        for (const category of CATEGORIES) {
            if (normalized.includes(category.name.toLowerCase())) {
                return category.id;
            }
        }

        return '1'; // Default to Electronics
    }

    /**
     * Get category name from ID
     */
    private static getCategoryName(categoryId?: string): string {
        if (!categoryId) return 'Electronics';
        const category = CATEGORIES.find(c => c.id === categoryId);
        return category?.name || 'Electronics';
    }

    /**
     * Select the best image from array (prefer non-placeholder images)
     */
    private static selectBestImage(images?: string[]): string {
        if (!images || images.length === 0) {
            return 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=400&fit=crop';
        }

        // Prefer images from reliable sources
        const imagePreference = images.filter(img => {
            const url = img.toLowerCase();
            return (
                !url.includes('placeholder') &&
                !url.includes('loading') &&
                !url.includes('error') &&
                (url.includes('http') || url.includes('data:'))
            );
        });

        return imagePreference[0] || images[0];
    }

    /**
     * Calculate discount percentage
     */
    private static calculateDiscount(price?: number, originalPrice?: number): number {
        if (!price || !originalPrice || originalPrice <= price) return 0;

        const discount = Math.round(((originalPrice - price) / originalPrice) * 100);
        return Math.min(Math.max(discount, 0), 100); // Clamp between 0 and 100
    }

    /**
     * Map stock status to numeric value
     */
    private static mapStockStatus(stock?: number, status?: 'inStock' | 'outOfStock' | 'limited'): number {
        if (stock !== undefined) {
            return Math.max(stock, 0);
        }

        switch (status) {
            case 'inStock':
                return 10; // Default in-stock quantity
            case 'limited':
                return 3; // Limited stock
            case 'outOfStock':
            default:
                return 0;
        }
    }

    /**
     * Map specifications to record format
     */
    private static mapSpecifications(specs?: Record<string, string>): Record<string, string> {
        if (!specs) return {};

        // Filter and normalize specification keys
        const normalized: Record<string, string> = {};

        for (const [key, value] of Object.entries(specs)) {
            // Skip internal properties
            if (key.startsWith('_') || key.startsWith('@')) continue;

            // Skip empty values
            if (!value || value === 'N/A' || value === '') continue;

            // Normalize key format (Title Case)
            const normalizedKey = this.normalizeKey(key);
            normalized[normalizedKey] = String(value).trim();
        }

        return normalized;
    }

    /**
     * Normalize specification key to Title Case
     */
    private static normalizeKey(key: string): string {
        return key
            .split(/[\s_-]+/)
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    }

    /**
     * Validate if product has sufficient data for import
     */
    static validateProduct(product: Partial<Product>): { valid: boolean; warnings: string[] } {
        const warnings: string[] = [];

        if (!product.name || product.name.length < 3) {
            warnings.push('Product name is missing or too short');
        }

        if (!product.price || product.price <= 0) {
            warnings.push('Valid product price is missing');
        }

        if (!product.image) {
            warnings.push('No product image found');
        }

        if (!product.brand || product.brand === 'Unknown Brand') {
            warnings.push('Brand information is missing');
        }

        if (!product.category || product.category === 'Electronics') {
            warnings.push('Category could not be determined automatically');
        }

        // Required fields for valid product
        const requiredFields = ['name', 'price', 'originalPrice', 'brand', 'category'];
        const hasAllRequired = requiredFields.every(field => {
            const value = product[field as keyof Product];
            return value !== undefined && value !== '' && value !== null;
        });

        return {
            valid: hasAllRequired,
            warnings,
        };
    }
}
