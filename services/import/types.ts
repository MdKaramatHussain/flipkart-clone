// Import service types
export interface ScrapedProductData {
  title?: string;
  description?: string;
  price?: number;
  originalPrice?: number;
  brand?: string;
  category?: string;
  subcategory?: string;
  sku?: string;
  images?: string[];
  thumbnail?: string;
  specifications?: Record<string, string>;
  features?: string[];
  highlights?: string[];
  material?: string;
  weight?: string;
  color?: string[];
  size?: string[];
  variants?: ScrapedVariant[];
  stock?: number;
  stockStatus?: 'inStock' | 'outOfStock' | 'limited';
  rating?: number;
  reviews?: number;
  seoTitle?: string;
  seoDescription?: string;
  tags?: string[];
  seller?: {
    name?: string;
    verified?: boolean;
  };
  rawHtml?: string;
  sourceUrl?: string;
}

export interface ScrapedVariant {
  name: string;
  value: string;
  price?: number;
  stock?: number;
  image?: string;
}

export interface ImportResult {
  success: boolean;
  data?: ScrapedProductData;
  error?: string;
  warnings?: string[];
  confidence?: number;
  source?: string;
}

export interface URLDetectionResult {
  domain: string;
  marketplace: 'amazon' | 'flipkart' | 'myntra' | 'ajio' | 'meesho' | 'nykaa' | 'shopify' | 'woocommerce' | 'generic';
  isValid: boolean;
  error?: string;
}

export interface ParserResult {
  data: Partial<ScrapedProductData>;
  confidence: number;
  method: 'jsonld' | 'og' | 'meta' | 'html';
}
