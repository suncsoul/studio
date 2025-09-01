"use client";

import { useState } from 'react';
import { User, ShoppingBag, MapPin, Settings, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

type NavItem = 'Profile' | 'Order History' | 'My Addresses' | 'Settings';

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState<NavItem>('Profile');

  const navItems: { name: NavItem; icon: React.ElementType }[] = [
    { name: 'Profile', icon: User },
    { name: 'Order History', icon: ShoppingBag },
    { name: 'My Addresses', icon: MapPin },
    { name: 'Settings', icon: Settings },
  ];

  const user = {
    name: 'Eleanor Vance',
    email: 'eleanor@example.com',
    joined: 'March 15, 2023',
  };

  const orders = [
    {
      id: 'ORDER-734-21D',
      date: '2024-07-21',
      total: '₹4,598.00',
      status: 'Delivered',
      items: ['Classic White Tee', 'High-Waisted Jeans'],
    },
    {
      id: 'ORDER-931-48A',
      date: '2024-07-15',
      total: '₹8,898.00',
      status: 'Delivered',
      items: ['Floral Maxi Dress', 'Leather Tote Bag'],
    },
    {
      id: 'ORDER-552-89C',
      date: '2024-06-28',
      total: '₹1,999.00',
      status: 'Cancelled',
      items: ['Striped Long Sleeve'],
    },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'Profile':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">My Profile</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                <p className="text-lg">{user.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Email Address</label>
                <p className="text-lg">{user.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Member Since</label>
                <p className="text-lg">{user.joined}</p>
              </div>
              <Button className="mt-4">Edit Profile</Button>
            </div>
          </div>
        );
      case 'Order History':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Order History</h2>
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="border border-border/70 rounded-lg p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <div className="flex-1 mb-4 sm:mb-0">
                    <p className="font-bold text-primary">{order.id}</p>
                    <p className="text-sm text-muted-foreground">Date: {order.date}</p>
                    <p className="text-sm text-muted-foreground">Items: {order.items.join(', ')}</p>
                  </div>
                  <div className="flex flex-col items-start sm:items-end w-full sm:w-auto">
                     <p className="font-semibold text-lg mb-2">{order.total}</p>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'My Addresses':
         return (
          <div>
            <h2 className="text-2xl font-bold mb-6">My Addresses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-border/70 rounded-lg p-4">
                    <h3 className="font-semibold">Default Shipping</h3>
                    <p className="text-muted-foreground text-sm mt-2">Eleanor Vance</p>
                    <p className="text-muted-foreground text-sm">123 Design Avenue, Apt 4B</p>
                    <p className="text-muted-foreground text-sm">Metropolis, 10101</p>
                    <p className="text-muted-foreground text-sm">United States</p>
                    <Button variant="link" className="p-0 h-auto mt-2">Edit</Button>
                </div>
                <div className="border border-border/70 rounded-lg p-4">
                    <h3 className="font-semibold">Default Billing</h3>
                     <p className="text-muted-foreground text-sm mt-2">Same as shipping address</p>
                    <Button variant="link" className="p-0 h-auto mt-2">Edit</Button>
                </div>
            </div>
            <Button className="mt-6">Add New Address</Button>
          </div>
        );
      case 'Settings':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Settings</h2>
            <div className="space-y-4">
                <h3 className="font-semibold">Manage Notifications</h3>
                <p className="text-muted-foreground text-sm">Control what emails you receive from us.</p>
                <Button>Notification Settings</Button>
            </div>
             <div className="space-y-4 mt-8">
                <h3 className="font-semibold">Change Password</h3>
                <p className="text-muted-foreground text-sm">Update your password for better security.</p>
                <Button>Change Password</Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:space-x-12">
        <aside className="md:w-1/4 mb-8 md:mb-0">
          <h1 className="text-3xl font-extrabold mb-6 hidden md:block">My Account</h1>
          <nav className="flex flex-row md:flex-col border-b md:border-b-0 md:border-r border-border/70 pb-4 md:pb-0 md:pr-4">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => setActiveTab(item.name)}
                className={`flex items-center text-left w-full p-3 rounded-lg transition-colors text-sm sm:text-base ${
                  activeTab === item.name
                    ? 'bg-primary/10 text-primary font-semibold'
                    : 'text-foreground/80 hover:bg-muted/50'
                }`}
              >
                <item.icon className="h-5 w-5 mr-3 flex-shrink-0" />
                <span className="flex-1">{item.name}</span>
                 <ChevronRight className="h-4 w-4 ml-2 text-muted-foreground hidden sm:inline-block" />
              </button>
            ))}
          </nav>
        </aside>

        <main className="md:w-3/4">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AccountPage;
