'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Home, UtensilsCrossed, ShoppingCart, LogOut } from 'lucide-react';

interface SimpleNavigationProps {
  userName: string;
  userRole: string;
}

export default function SimpleNavigation({ userName, userRole }: SimpleNavigationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
      router.refresh();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const navItems = [
    { icon: Home, label: 'Dashboard', href: '/dashboard', color: 'text-blue-600' },
    { icon: UtensilsCrossed, label: 'Meal Plan', href: '/meal-plan', color: 'text-green-600' },
    { icon: ShoppingCart, label: 'Groceries', href: '/groceries', color: 'text-orange-600' },
  ];

  return (
    <nav className="bg-gradient-to-r from-blue-50 to-green-50 shadow-md border-b-2 border-blue-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              🍽️ Meal Planner
            </h1>
          </div>

          {/* Simple Navigation */}
          <div className="flex items-center space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || 
                              (item.href === '/meal-plan' && pathname.startsWith('/meal-plan'));
              
              return (
                <Button
                  key={item.href}
                  variant={isActive ? "default" : "ghost"}
                  size="lg"
                  onClick={() => router.push(item.href)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                    isActive 
                      ? 'bg-white text-blue-600 shadow-md border-2 border-blue-200' 
                      : 'text-gray-700 hover:bg-white hover:shadow-sm'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </Button>
              );
            })}

            {/* User Info & Logout */}
            <div className="flex items-center space-x-3 ml-6 pl-6 border-l border-gray-300">
              <div className="text-sm">
                <span className="font-medium text-gray-900">{userName}</span>
                {userRole === 'admin' && (
                  <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
                    Admin
                  </span>
                )}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4 mr-1" />
                {isLoggingOut ? 'Saliendo...' : 'Salir'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
