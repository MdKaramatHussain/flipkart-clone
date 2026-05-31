import type { ParserResult, ScrapedProductData } from '../import/types';

/**
 * Parses JSON-LD Product schema from HTML
 */
export class JSONLDParser {
  static parse(html: string): ParserResult | null {
    try {
      const jsonLdRegex = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
      let match;

      while ((match = jsonLdRegex.exec(html)) !== null) {
        const jsonData = JSON.parse(match[1]);

        if (this.isProductSchema(jsonData)) {
          const data = this.extractProductData(jsonData);
          return {
            data,
            confidence: 0.95,
            method: 'jsonld',
          };
        }
      }
      return null;
    } catch (error) {
      console.error('JSON-LD parsing error:', error);
      return null;
    }
  }

  private static isProductSchema(data: any): boolean {
    if (Array.isArray(data)) {
      return data.some(item => item['@type'] === 'Product' || item['@type']?.includes?.('Product'));
    }
    return data['@type'] === 'Product' || data['@type']?.includes?.('Product');
  }

  private static extractProductData(jsonData: any): Partial<ScrapedProductData> {
    const data = Array.isArray(jsonData) ? jsonData[0] : jsonData;

    return {
      title: data.name,
      description: data.description,
      price: this.extractPrice(data.offers),
      originalPrice: this.extractOriginalPrice(data.offers),
      brand: data.brand?.name || data.brand,
      images: this.extractImages(data.image),
      rating: data.aggregateRating?.ratingValue,
      reviews: data.aggregateRating?.reviewCount,
      sku: data.sku,
      specifications: this.extractSpecifications(data),
      seoTitle: data.name,
      seoDescription: data.description,
    };
  }

  private static extractPrice(offers: any): number | undefined {
    if (!offers) return undefined;

    if (Array.isArray(offers)) {
      const offer = offers[0];
      return parseFloat(offer.price) || undefined;
    }

    return parseFloat(offers.price) || undefined;
  }

  private static extractOriginalPrice(offers: any): number | undefined {
    // JSON-LD doesn't always have original price, return undefined
    return undefined;
  }

  private static extractImages(image: any): string[] | undefined {
    if (!image) return undefined;

    if (Array.isArray(image)) {
      return image.filter(img => typeof img === 'string');
    }

    return typeof image === 'string' ? [image] : undefined;
  }

  private static extractSpecifications(data: any): Record<string, string> | undefined {
    const specs: Record<string, string> = {};

    if (data.additionalProperty) {
      const props = Array.isArray(data.additionalProperty) ? data.additionalProperty : [data.additionalProperty];
      props.forEach(prop => {
        if (prop.name && prop.value) {
          specs[prop.name] = prop.value;
        }
      });
    }

    return Object.keys(specs).length > 0 ? specs : undefined;
  }
}

/**
 * Parses Open Graph meta tags from HTML
 */
export class OpenGraphParser {
  static parse(html: string): ParserResult | null {
    try {
      const ogData = this.extractOGTags(html);

      if (ogData.title || ogData.image) {
        return {
          data: {
            title: ogData.title,
            description: ogData.description,
            images: ogData.image ? [ogData.image] : undefined,
            seoTitle: ogData.title,
            seoDescription: ogData.description,
          },
          confidence: 0.7,
          method: 'og',
        };
      }

      return null;
    } catch (error) {
      console.error('OpenGraph parsing error:', error);
      return null;
    }
  }

  private static extractOGTags(html: string): Record<string, string> {
    const ogTags: Record<string, string> = {};
    const ogRegex = /<meta\s+property=["']og:(\w+)["']\s+content=["']([^"']*)["']/gi;
    let match;

    while ((match = ogRegex.exec(html)) !== null) {
      ogTags[match[1].toLowerCase()] = match[2];
    }

    return ogTags;
  }
}

/**
 * Parses standard meta tags from HTML
 */
export class MetaTagParser {
  static parse(html: string): ParserResult | null {
    try {
      const metaData = this.extractMetaTags(html);

      const data: Partial<ScrapedProductData> = {
        seoTitle: metaData.title,
        seoDescription: metaData.description,
        title: metaData.title || metaData['product-title'],
        description: metaData.description,
        price: metaData.price ? parseFloat(metaData.price) : undefined,
        brand: metaData.brand,
      };

      // Filter out empty values
      const filteredData = Object.fromEntries(
        Object.entries(data).filter(([, v]) => v !== undefined && v !== '')
      );

      return {
        data: filteredData as Partial<ScrapedProductData>,
        confidence: 0.6,
        method: 'meta',
      };
    } catch (error) {
      console.error('Meta tag parsing error:', error);
      return null;
    }
  }

  private static extractMetaTags(html: string): Record<string, string> {
    const metaTags: Record<string, string> = {};
    const metaRegex = /<meta\s+(?:name|property)=["']([^"']*)["']\s+content=["']([^"']*)["']/gi;
    let match;

    while ((match = metaRegex.exec(html)) !== null) {
      metaTags[match[1].toLowerCase()] = match[2];
    }

    return metaTags;
  }
}

/**
 * Main parser registry - tries all parsing methods in priority order
 */
export class ParserRegistry {
  static parse(html: string): ParserResult | null {
    // Priority order: JSON-LD > OpenGraph > Meta tags
    const parsers = [JSONLDParser, OpenGraphParser, MetaTagParser];

    for (const parser of parsers) {
      const result = parser.parse(html);
      if (result) {
        return result;
      }
    }

    return null;
  }
}
