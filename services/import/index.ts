import type { Product } from '@/lib/types';
import type { ScrapedProductData, ImportResult, URLDetectionResult } from './types';
import { URLDetector } from '../scrapers/url-detector';
import { ScraperFactory } from '../scrapers';
import { ProductMapper } from '../mappers/product-mapper';

interface ProductImportResult {
  success: boolean;
  product?: Partial<Product>;
  error?: string;
  warnings?: string[];
  metadata?: {
    source: string;
    confidence: number;
    originalUrl: string;
    timestamp: Date;
  };
}

/**
 * Main product import service
 * Orchestrates URL detection, scraping, parsing, and mapping
 */
export class ProductImportService {
  /**
   * Import product from URL
   * @param url - Product URL to import
   * @returns Product data mapped to application schema
   */
  static async importProduct(url: string): Promise<ProductImportResult> {
    try {
      // Validate and detect marketplace
      const detection = URLDetector.detect(url);
      if (!detection.isValid) {
        return {
          success: false,
          error: detection.error || 'Invalid URL provided',
        };
      }

      // Get appropriate scraper for marketplace
      const scraper = ScraperFactory.create(detection.marketplace, url);

      // Scrape product data
      const scrapedResult = await scraper.scrape();
      if (!scrapedResult.success || !scrapedResult.data) {
        return {
          success: false,
          error: scrapedResult.error || 'Failed to extract product data from URL',
          metadata: {
            source: scrapedResult.source || 'unknown',
            confidence: scrapedResult.confidence || 0,
            originalUrl: url,
            timestamp: new Date(),
          },
        };
      }

      // Map to application Product schema
      const mappedProduct = ProductMapper.mapToProduct(scrapedResult.data);

      // Validate product
      const validation = ProductMapper.validateProduct(mappedProduct);

      return {
        success: true,
        product: mappedProduct,
        warnings: validation.warnings,
        metadata: {
          source: scrapedResult.source || detection.marketplace,
          confidence: scrapedResult.confidence || 0.5,
          originalUrl: url,
          timestamp: new Date(),
        },
      };
    } catch (error) {
      return {
        success: false,
        error: `Import failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      };
    }
  }

  /**
   * Validate a URL without importing
   * @param url - URL to validate
   * @returns URL validation result
   */
  static validateURL(url: string): URLDetectionResult {
    return URLDetector.detect(url);
  }

  /**
   * Preview what data would be imported without saving
   * @param url - Product URL
   * @returns Preview of product data
   */
  static async previewImport(url: string): Promise<ProductImportResult> {
    return this.importProduct(url);
  }

  /**
   * Batch import multiple products
   * @param urls - Array of product URLs
   * @returns Array of import results
   */
  static async importMultiple(urls: string[]): Promise<ProductImportResult[]> {
    return Promise.all(urls.map(url => this.importProduct(url)));
  }
}
