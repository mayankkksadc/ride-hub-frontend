
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  Home,
  Users,
  User,
  CreditCard,
  Car,
  CarTaxiFront,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { logoutUser } from '@/redux/slices/authSlice';
import { toast } from "sonner";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [menuOpen, setMenuOpen] = React.useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/', icon: <Home size={20} /> },
    { name: 'Admin', path: '/admin', icon: <User size={20} /> },
    { name: 'Customers', path: '/customers', icon: <Users size={20} /> },
    { name: 'Drivers', path: '/drivers', icon: <Car size={20} /> },
    { name: 'Rides', path: '/rides', icon: <CarTaxiFront size={20} /> },
    { name: 'Billing', path: '/billing', icon: <CreditCard size={20} /> },
  ];

  const handleLogout = () => {
    dispatch(logoutUser());
    toast.success('Successfully logged out');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Mobile Navigation Toggle */}
      <div className="lg:hidden fixed top-4 right-4 z-50">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 rounded-full bg-white shadow-md"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={cn(
          "bg-white border-r border-gray-200 w-64 fixed inset-y-0 left-0 z-40 transition-transform duration-300 transform lg:translate-x-0",
          menuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="h-full flex flex-col">
          <div className="p-4 border-b">
            <h1 className="text-xl font-bold text-primary">UberCab</h1>
          </div>
          
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || 
                (item.path !== '/' && location.pathname.startsWith(item.path));
              
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={cn(
                    "flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t mt-auto">
            {user ? (
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-700">
                      {user.name || user.email}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">
                      {user.role}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-md"
                >
                  <LogOut size={18} className="mr-2" />
                  Sign out
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                onClick={() => setMenuOpen(false)}
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {menuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="lg:pl-64 flex-1">
        <div className="py-6 px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
