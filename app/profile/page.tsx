'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Heart, User, LogOut, MapPin, Package, Award } from 'lucide-react';
import { useAuthStore } from '@/lib/store';
import { useOrdersStore } from '@/lib/store';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function ProfilePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState('orders');
  
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const orders = useOrdersStore((state) => state.orders);

  React.useEffect(() => {
    if (!user) {
      router.push('/login?redirect=/profile');
    }
  }, [user, router]);

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center h-96">
          <p className="text-gray-600">Redirecting to login...</p>
        </div>
        <Footer />
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-6" style={{ color: '#212121' }}>My Account</h1>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-lg p-6 sticky top-20">
                {/* User Info */}
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="space-y-2">
                  <button
                    onClick={() => setActiveTab('orders')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition ${
                      activeTab === 'orders' ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    <Package className="w-5 h-5" />
                    <span>My Orders</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('addresses')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition ${
                      activeTab === 'addresses' ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    <MapPin className="w-5 h-5" />
                    <span>Addresses</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('wishlist')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition ${
                      activeTab === 'wishlist' ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    <Heart className="w-5 h-5" />
                    <span>Wishlist</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('settings')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition ${
                      activeTab === 'settings' ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    <Award className="w-5 h-5" />
                    <span>Account Settings</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-red-600 hover:bg-red-50 transition"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-3">
              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                  <h2 className="text-xl font-bold mb-6 text-foreground">My Orders</h2>
                  {orders.length > 0 ? (
                    orders.map((order) => (
                      <div key={order.id} className="border border-border rounded-lg p-4 hover:shadow-md transition">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <p className="font-bold text-foreground">{order.id}</p>
                            <p className="text-sm text-muted-foreground">{new Date(order.createdAt).toLocaleDateString()}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${
                            order.status === 'delivered' ? 'bg-green-500' : order.status === 'shipped' ? 'bg-blue-500' : 'bg-orange-500'
                          }`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-muted-foreground">{order.items.length} item{order.items.length > 1 ? 's' : ''}</p>
                          <p className="font-bold text-lg text-foreground">₹{order.total.toLocaleString()}</p>
                        </div>
                        <a href={`/orders/${order.id}`} className="mt-3 text-primary font-medium text-sm hover:underline inline-block">View Details</a>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No orders yet</p>
                    </div>
                  )}
                </div>
              )}

              {/* Addresses Tab */}
              {activeTab === 'addresses' && (
                <div className="space-y-4">
                  {user.addresses && user.addresses.length > 0 ? (
                    user.addresses.map((address) => (
                      <div key={address.id} className="bg-card border border-border rounded-lg p-6">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-bold text-foreground">{address.type.toUpperCase()}</h3>
                          {address.isDefault && <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">Default</span>}
                        </div>
                        <p className="text-foreground mb-2">{address.street}</p>
                        <p className="text-muted-foreground text-sm mb-4">{address.city}, {address.state} {address.pincode}</p>
                        <div className="flex gap-3">
                          <button className="text-primary font-medium text-sm hover:underline">Edit</button>
                          <button className="text-red-600 font-medium text-sm hover:underline">Delete</button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No addresses saved</p>
                    </div>
                  )}
                  <button className="w-full py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:opacity-90 transition">
                    Add New Address
                  </button>
                </div>
              )}

              {/* Wishlist Tab */}
              {activeTab === 'wishlist' && (
                <div className="bg-card border border-border rounded-lg p-6 text-center">
                  <Heart className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                  <h3 className="text-lg font-bold mb-2 text-foreground">No items in wishlist</h3>
                  <p className="text-muted-foreground mb-6">Start adding your favorite products</p>
                  <a href="/" className="inline-block px-8 py-2 bg-primary text-primary-foreground font-bold rounded-lg hover:opacity-90 transition">
                    Continue Shopping
                  </a>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div className="bg-card border border-border rounded-lg p-6">
                  <h2 className="text-xl font-bold mb-6 text-foreground">Account Settings</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-foreground">Full Name</label>
                      <input 
                        type="text" 
                        defaultValue={user.name}
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-foreground">Email</label>
                      <input 
                        type="email" 
                        defaultValue={user.email}
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-foreground">Phone Number</label>
                      <input 
                        type="tel" 
                        defaultValue={user.phone || ''}
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <button className="w-full py-2 bg-primary text-primary-foreground font-bold rounded-lg hover:opacity-90 transition">
                      Save Changes
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
