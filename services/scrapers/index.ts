import type { ScrapedProductData, ImportResult } from '../import/types';
import { ParserRegistry } from '../parsers';

/**
 * Base scraper class - provides common functionality
 */
export abstract class BaseScraper {
  abstract marketplace: string;
  protected url: string;

  constructor(url: string) {
    this.url = url;
  }

  /**
   * Fetch and parse HTML from URL
   */
  // protected async fetchHTML(url: string): Promise<string> {
  //   // Server-side fetch using Node.js fetch
  //   const response = await fetch(url, {
  //     headers: {
  //       'User-Agent':
  //         'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
  //     },
  //   });

  //   if (!response.ok) {
  //     throw new Error(`Failed to fetch URL. Status: ${response.status} ${response.statusText}`);
  //   }

  //   return response.text();
  // }
  protected async fetchHTML(url: string): Promise<string> {
    const response = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36',
        'Accept':
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
      },
    });

    const html = await response.text();

    console.log("STATUS:", response.status);
    console.log("BODY:", html.substring(0, 2000));

    if (!response.ok) {
      throw new Error(
        `Failed to fetch URL. Status: ${response.status} ${response.statusText}`
      );
    }

    return html;
  }

  /**
   * Extract price from text (handles various formats)
   */
  protected extractPrice(text?: string): number | undefined {
    if (!text) return undefined;

    // Remove currency symbols and text
    const cleaned = text
      .replace(/[^\d.]/g, '')
      .split('.')
      .slice(0, -1)
      .join('')
      .concat(text.split('.').pop() || '');

    const price = parseFloat(cleaned);
    return isNaN(price) ? undefined : price;
  }

  /**
   * Normalize category to standard format
   */
  protected normalizeCategory(category?: string): string | undefined {
    if (!category) return undefined;

    const categoryMap: Record<string, string> = {
      electronics: 'Electronics',
      fashion: 'Fashion',
      home: 'Home & Living',
      sports: 'Sports',
      books: 'Books',
      beauty: 'Beauty',
      kitchen: 'Home & Living',
      toys: 'Toys',
      accessories: 'Fashion',
    };

    const normalized = category.toLowerCase().trim();
    for (const [key, value] of Object.entries(categoryMap)) {
      if (normalized.includes(key)) {
        return value;
      }
    }

    return category;
  }

  /**
   * Parse marketplace-specific data and return structured result
   */
  abstract scrape(): Promise<ImportResult>;
}

/**
 * Generic scraper - uses open graph, schema.org, and meta tags
 */
export class GenericScraper extends BaseScraper {
  marketplace = 'generic';

  async scrape(): Promise<ImportResult> {
    try {
      const html = await this.fetchHTML(this.url);
      const parserResult = ParserRegistry.parse(html);

      if (!parserResult) {
        return {
          success: false,
          error: 'Could not extract product data from page',
          source: this.marketplace,
        };
      }

      return {
        success: true,
        data: parserResult.data as ScrapedProductData,
        confidence: parserResult.confidence,
        source: this.marketplace,
      };
    } catch (error) {
      return {
        success: false,
        error: `Scraping failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        source: this.marketplace,
      };
    }
  }
}

/**
 * Amazon scraper
 */
export class AmazonScraper extends BaseScraper {
  marketplace = 'amazon';

  async scrape(): Promise<ImportResult> {
    try {
      const html = await this.fetchHTML(this.url);

      // Try JSON-LD first
      const parserResult = ParserRegistry.parse(html);
      if (parserResult?.data) {
        return {
          success: true,
          data: {
            ...parserResult.data,
            // Amazon-specific extraction
            ...this.extractAmazonSpecific(html),
          } as ScrapedProductData,
          confidence: parserResult.confidence,
          source: this.marketplace,
        };
      }

      // Fallback to HTML scraping
      const data = this.extractFromHTML(html);
      return {
        success: true,
        data: data as ScrapedProductData,
        confidence: 0.5,
        source: this.marketplace,
      };
    } catch (error) {
      return {
        success: false,
        error: `Amazon scraping failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        source: this.marketplace,
      };
    }
  }

  private extractAmazonSpecific(html: string): Partial<ScrapedProductData> {
    const data: Partial<ScrapedProductData> = {};

    // Extract ASIN for SKU
    const asinMatch = html.match(/\/dp\/([A-Z0-9]+)/);
    if (asinMatch) {
      data.sku = asinMatch[1];
    }

    // Extract rating count
    const ratingMatch = html.match(/(\d+(?:,\d+)*)\s*customer\s+ratings?/i);
    if (ratingMatch) {
      data.reviews = parseInt(ratingMatch[1].replace(/,/g, ''), 10);
    }

    return data;
  }

  private extractFromHTML(html: string): Partial<ScrapedProductData> {
    const data: Partial<ScrapedProductData> = {};

    // Extract title
    const titleMatch = html.match(/<h1[^>]*>(.*?)<\/h1>/);
    if (titleMatch) {
      data.title = titleMatch[1].replace(/<[^>]*>/g, '').trim();
    }

    // Extract price
    const priceMatch = html.match(/₹([\d,]+)/);
    if (priceMatch) {
      data.price = this.extractPrice(priceMatch[1]);
    }

    return data;
  }
}

/**
 * Flipkart scraper
 */
export class FlipkartScraper extends BaseScraper {
  marketplace = 'flipkart';

  async scrape(): Promise<ImportResult> {
    try {
      const html = await this.fetchHTML(this.url);
      const parserResult = ParserRegistry.parse(html);

      if (parserResult?.data) {
        return {
          success: true,
          data: {
            ...parserResult.data,
            ...this.extractFlipkartSpecific(html),
          } as ScrapedProductData,
          confidence: parserResult.confidence,
          source: this.marketplace,
        };
      }

      const data = this.extractFromHTML(html);
      return {
        success: true,
        data: data as ScrapedProductData,
        confidence: 0.5,
        source: this.marketplace,
      };
    } catch (error) {
      return {
        success: false,
        error: `Flipkart scraping failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        source: this.marketplace,
      };
    }
  }

  private extractFlipkartSpecific(html: string): Partial<ScrapedProductData> {
    const data: Partial<ScrapedProductData> = {};

    // Extract seller information
    const sellerMatch = html.match(/Sold by\s*<.*?>(.*?)<\/a>/);
    if (sellerMatch) {
      data.seller = {
        name: sellerMatch[1].trim(),
        verified: html.includes('Verified Seller'),
      };
    }

    // Extract fast delivery badge
    if (html.includes('Fast Delivery')) {
      data.seller = { ...data.seller, verified: true };
    }

    return data;
  }

  private extractFromHTML(html: string): Partial<ScrapedProductData> {
    const data: Partial<ScrapedProductData> = {};

    // Extract title
    const titleMatch = html.match(/<h1.*?>(.*?)<\/h1>/);
    if (titleMatch) {
      data.title = titleMatch[1].replace(/<[^>]*>/g, '').trim();
    }

    return data;
  }
}

/**
 * Myntra scraper
 */
export class MyntraScraper extends BaseScraper {
  marketplace = 'myntra';

  async scrape(): Promise<ImportResult> {
    try {
      const html = await this.fetchHTML(this.url);
      const parserResult = ParserRegistry.parse(html);

      if (parserResult?.data) {
        return {
          success: true,
          data: {
            ...parserResult.data,
            ...this.extractMyntraSpecific(html),
          } as ScrapedProductData,
          confidence: parserResult.confidence,
          source: this.marketplace,
        };
      }

      return {
        success: false,
        error: 'Could not parse Myntra product',
        source: this.marketplace,
      };
    } catch (error) {
      return {
        success: false,
        error: `Myntra scraping failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        source: this.marketplace,
      };
    }
  }

  private extractMyntraSpecific(html: string): Partial<ScrapedProductData> {
    const data: Partial<ScrapedProductData> = {};

    // Extract available colors/sizes
    const colorMatch = html.match(/(\d+)\s+Colors/i);
    if (colorMatch) {
      data.color = [];
    }

    return data;
  }
}

/**
 * Scraper factory
 */
export class ScraperFactory {
  static create(marketplace: string, url: string): BaseScraper {
    switch (marketplace) {
      case 'amazon':
        return new AmazonScraper(url);
      case 'flipkart':
        return new FlipkartScraper(url);
      case 'myntra':
        return new MyntraScraper(url);
      case 'ajio':
      case 'meesho':
      case 'nykaa':
      case 'shopify':
      case 'woocommerce':
      case 'generic':
      default:
        return new GenericScraper(url);
    }
  }
}
