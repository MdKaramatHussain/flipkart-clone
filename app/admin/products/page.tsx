'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PRODUCTS, CATEGORIES } from '@/constants/data';
import { Trash2, Edit, Plus, Search } from 'lucide-react';
import { ProductImportComponent } from '@/components/ProductImportComponent';
import type { Product } from '@/lib/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function AdminProductsPage() {
  const [products, setProducts] = useState(PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    originalPrice: '',
    brand: '',
    stock: '',
    category: '',
  });
  const [activeTab, setActiveTab] = useState('products');

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (product: typeof PRODUCTS[0]) => {
    setEditingId(product.id);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      originalPrice: product.originalPrice.toString(),
      brand: product.brand,
      stock: product.stock.toString(),
      category: product.categoryId,
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      setProducts(
        products.map((p) =>
          p.id === editingId
            ? {
              ...p,
              name: formData.name,
              price: Number(formData.price),
              originalPrice: Number(formData.originalPrice),
              brand: formData.brand,
              stock: Number(formData.stock),
              categoryId: formData.category,
            }
            : p
        )
      );
      setEditingId(null);
    } else {
      // Create new product
      const newProduct = {
        ...PRODUCTS[0], // Use first product as template for all required fields
        id: `PRD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: formData.name,
        price: Number(formData.price),
        originalPrice: Number(formData.originalPrice),
        brand: formData.brand,
        stock: Number(formData.stock),
        categoryId: formData.category,
        createdAt: new Date(),
      };
      setProducts([...products, newProduct]);
    }

    setFormData({
      name: '',
      price: '',
      originalPrice: '',
      brand: '',
      stock: '',
      category: '',
    });
    setShowForm(false);
  };

  const handleImportSuccess = (importedProduct: Partial<Product>) => {
    // Add imported product to the list
    // const newProduct: Product = {
    //   ...PRODUCTS[0],
    //   ...importedProduct,
    //   image: Array.isArray(importedProduct.image)
    //     ? importedProduct.image[0]
    //     : importedProduct.image,
    //   createdAt: new Date(),
    // };
    const newProduct = {
      ...PRODUCTS[0], // Use template for required fields 
      ...importedProduct,
      createdAt: new Date(),
    };
    setProducts([...products, newProduct]);
    console.log(products)
    console.log(newProduct)

    // Switch to products tab to show the new product
    setActiveTab('products');

    // Show success message
    alert('Product imported successfully!');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Products</h1>
        <Button onClick={() => { setShowForm(true); setEditingId(null); }} className="gap-2">
          <Plus className="w-4 h-4" />
          Manual Add
        </Button>
      </div>

      {/* Tabs for Import and Products List */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="import">Import Product</TabsTrigger>
          <TabsTrigger value="products">All Products</TabsTrigger>
        </TabsList>

        {/* Import Tab */}
        <TabsContent value="import" className="mt-6">
          <ProductImportComponent onImportSuccess={handleImportSuccess} />
        </TabsContent>

        {/* Products Tab */}
        <TabsContent value="products" className="mt-6 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Products Table */}
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted border-b border-border">
                  <tr>
                    <th className="px-6 py-3 text-left font-bold">Product</th>
                    <th className="px-6 py-3 text-left font-bold">Brand</th>
                    <th className="px-6 py-3 text-left font-bold">Price</th>
                    <th className="px-6 py-3 text-left font-bold">Stock</th>
                    <th className="px-6 py-3 text-left font-bold">Category</th>
                    <th className="px-6 py-3 text-left font-bold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredProducts.map((product) => {
                    const category = CATEGORIES.find((c) => c.id === product.categoryId);
                    return (
                      <tr key={product.id} className="hover:bg-muted/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <Image
                              src={product.image}
                              alt={product.name}
                              width={40}
                              height={40}
                              className="rounded"
                            />
                            <div>
                              <p className="font-medium line-clamp-1">{product.name}</p>
                              <p className="text-xs text-muted-foreground">ID: {product.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">{product.brand}</td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-bold">₹{product.price.toLocaleString()}</p>
                            <p className="text-xs text-muted-foreground line-through">
                              ₹{product.originalPrice.toLocaleString()}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2 py-1 rounded text-xs font-bold ${product.stock > 10
                              ? 'bg-green-100 text-green-700'
                              : product.stock > 0
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-red-100 text-red-700'
                              }`}
                          >
                            {product.stock}
                          </span>
                        </td>
                        <td className="px-6 py-4">{category?.name}</td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit(product)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(product.id)}
                              className="text-red-600"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <p>No products found. Try importing or creating one!</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Edit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md p-6">
            <h2 className="text-xl font-bold mb-4">
              {editingId ? 'Edit Product' : 'Add Product'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Product Name</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Price</label>
                  <Input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Original Price</label>
                  <Input
                    type="number"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Brand</label>
                <Input
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Stock</label>
                  <Input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full border border-border rounded px-2 py-2"
                  >
                    <option value="">Select Category</option>
                    {CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1">
                  {editingId ? 'Update' : 'Create'}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}
