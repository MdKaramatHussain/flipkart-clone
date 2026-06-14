'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { AlertCircle, Check, Loader2, Upload, AlertTriangle } from 'lucide-react';
import type { Product } from '@/lib/types';
import Image from 'next/image';

interface ImportedProduct {
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

interface ProductImportComponentProps {
  onImportSuccess?: (product: Partial<Product>) => void;
}

export function ProductImportComponent({ onImportSuccess }: ProductImportComponentProps) {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [importedData, setImportedData] = useState<ImportedProduct | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editedProduct, setEditedProduct] = useState<Partial<Product> | null>(null);

  const handleImport = async () => {
    if (!url.trim()) {
      alert('Please enter a product URL');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('https://scrapping-backend-0smv.onrender.com/api/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'dev-key',
        },
        body: JSON.stringify({
          url,
          options: {
            headless: true,
          },
        }),
      });

      const data = await response.json();
      console.log("data", data)
      setImportedData(data);
      setEditedProduct(data.product);
      setDialogOpen(true);
    } catch (error) {
      setImportedData({
        success: false,
        error: `Failed to import: ${error instanceof Error ? error.message : 'Unknown error'}`,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    if (editedProduct && onImportSuccess) {
      onImportSuccess(editedProduct);
      setDialogOpen(false);
      setUrl('');
      setImportedData(null);
      setEditedProduct(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Import Input Section */}
      <Card className="p-6 border-2 border-dashed border-primary/20">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Quick Product Import</h3>
            <p className="text-sm text-muted-foreground">
              Paste a product URL from Flipkart site
            </p>
          </div>

          <div className="flex gap-2">
            <Input
              placeholder="https://www.flipkart.com/..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleImport()}
              disabled={loading}
              className="flex-1"
            />
            <Button
              onClick={handleImport}
              disabled={loading}
              className="gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Importing...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  Import
                </>
              )}
            </Button>
          </div>

          {/* Error Display */}
          {importedData?.error && !dialogOpen && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex gap-2">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{importedData.error}</p>
            </div>
          )}

          {/* Success Message */}
          {importedData?.success && !dialogOpen && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg flex gap-2">
              <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
              <p className="text-sm text-green-700">
                Product imported successfully! Click the dialog to review and save.
              </p>
            </div>
          )}
        </div>
      </Card>

      {/* Import Preview Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Review Imported Product</DialogTitle>
            <DialogDescription>
              Review the imported product data before saving. You can edit any fields.
            </DialogDescription>
          </DialogHeader>

          {importedData?.success && editedProduct ? (
            <div className="space-y-6">
              {/* Warnings */}
              {importedData.warnings && importedData.warnings.length > 0 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex gap-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 shrink-0" />
                    <h4 className="font-semibold text-yellow-900">Review Required Fields</h4>
                  </div>
                  <ul className="text-sm text-yellow-800 space-y-1">
                    {importedData.warnings.map((warning, i) => (
                      <li key={i}>• {warning}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Product Preview */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Image */}
                {editedProduct.image && (
                  <div>
                    <h4 className="text-sm font-semibold mb-2">Product Image</h4>
                    <div className="relative w-full h-48 bg-muted rounded-lg overflow-hidden">
                      <Image
                        src={editedProduct.image}
                        alt={editedProduct.name || 'Product'}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  </div>
                )}

                {/* Basic Info */}
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase">
                      Product Name
                    </label>
                    <Input
                      value={editedProduct.name || ''}
                      onChange={(e) =>
                        setEditedProduct({ ...editedProduct, name: e.target.value })
                      }
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase">
                      Brand
                    </label>
                    <Input
                      value={editedProduct.brand || ''}
                      onChange={(e) =>
                        setEditedProduct({ ...editedProduct, brand: e.target.value })
                      }
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase">
                      Category
                    </label>
                    <Input
                      value={editedProduct.category || ''}
                      onChange={(e) =>
                        setEditedProduct({ ...editedProduct, category: e.target.value })
                      }
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase">
                    Sale Price (₹)
                  </label>
                  <Input
                    type="number"
                    value={editedProduct.price || ''}
                    onChange={(e) =>
                      setEditedProduct({
                        ...editedProduct,
                        price: Number(e.target.value),
                      })
                    }
                    className="mt-1"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase">
                    Original Price (₹)
                  </label>
                  <Input
                    type="number"
                    value={editedProduct.originalPrice || ''}
                    onChange={(e) =>
                      setEditedProduct({
                        ...editedProduct,
                        originalPrice: Number(e.target.value),
                      })
                    }
                    className="mt-1"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase">
                    Stock
                  </label>
                  <Input
                    type="number"
                    value={editedProduct.stock || ''}
                    onChange={(e) =>
                      setEditedProduct({
                        ...editedProduct,
                        stock: Number(e.target.value),
                      })
                    }
                    className="mt-1"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase">
                  Description
                </label>
                <textarea
                  value={editedProduct.description || ''}
                  onChange={(e) =>
                    setEditedProduct({
                      ...editedProduct,
                      description: e.target.value,
                    })
                  }
                  className="mt-1 w-full p-2 border border-border rounded-md text-sm"
                  rows={4}
                />
              </div>

              {/* Metadata */}
              <div className="text-xs text-muted-foreground space-y-1 p-3 bg-muted rounded">
                <p>
                  <strong>Source:</strong> {importedData.metadata?.source}
                </p>
                <p>
                  <strong>Confidence:</strong> {Math.round((importedData.metadata?.confidence || 0) * 100)}%
                </p>
                <p>
                  <strong>Imported:</strong> {new Date(importedData.metadata?.timestamp || '').toLocaleString()}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => setDialogOpen(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button onClick={handleSave} className="flex-1 gap-2">
                  <Check className="w-4 h-4" />
                  Save Product
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <p className="text-red-600 font-semibold">{importedData?.error}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
