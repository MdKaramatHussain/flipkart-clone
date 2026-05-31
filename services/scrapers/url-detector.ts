import type { URLDetectionResult } from './types';

/**
 * Detects the marketplace/source of a given product URL
 */
export class URLDetector {
  static detect(urlString: string): URLDetectionResult {
    try {
      const url = new URL(urlString);
      const hostname = url.hostname.toLowerCase();
      const domain = this.extractDomain(hostname);

      // Marketplace detection
      if (hostname.includes('amazon')) {
        return { domain, marketplace: 'amazon', isValid: true };
      }
      if (hostname.includes('flipkart')) {
        return { domain, marketplace: 'flipkart', isValid: true };
      }
      if (hostname.includes('myntra')) {
        return { domain, marketplace: 'myntra', isValid: true };
      }
      if (hostname.includes('ajio')) {
        return { domain, marketplace: 'ajio', isValid: true };
      }
      if (hostname.includes('meesho')) {
        return { domain, marketplace: 'meesho', isValid: true };
      }
      if (hostname.includes('nykaa')) {
        return { domain, marketplace: 'nykaa', isValid: true };
      }

      // Shopify detection (checks for myshopify.com or custom domains)
      if (hostname.includes('.myshopify.com') || this.isShopifyStore(urlString)) {
        return { domain, marketplace: 'shopify', isValid: true };
      }

      // WooCommerce detection
      if (this.isWooCommerceStore(urlString)) {
        return { domain, marketplace: 'woocommerce', isValid: true };
      }

      // Default to generic
      return { domain, marketplace: 'generic', isValid: true };
    } catch (error) {
      return {
        domain: '',
        marketplace: 'generic',
        isValid: false,
        error: `Invalid URL: ${error instanceof Error ? error.message : 'Unknown error'}`,
      };
    }
  }

  private static extractDomain(hostname: string): string {
    const parts = hostname.split('.');
    if (parts.length > 2) {
      return parts.slice(-2).join('.');
    }
    return hostname;
  }

  private static isShopifyStore(url: string): boolean {
    // Check if URL structure suggests Shopify
    return (
      url.includes('/products/') ||
      url.includes('/collections/') ||
      url.includes('.myshopify.com')
    );
  }

  private static isWooCommerceStore(url: string): boolean {
    // Check for WooCommerce URL patterns
    return url.includes('/product/') || url.includes('/products/');
  }
}
