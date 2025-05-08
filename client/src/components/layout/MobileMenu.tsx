import { Link, useLocation } from "wouter";
import { AuthContext } from "@/App";
import { useContext } from "react";
import { Button } from "@/components/ui/button";
import { X, Leaf } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [location] = useLocation();
  const { isAuthenticated, user, setUser } = useContext(AuthContext);
  
  const handleLogout = () => {
    setUser(null);
    onClose();
  };
  
  return (
    <div className={`md:hidden bg-white fixed inset-0 z-50 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out shadow-lg`}>
      {/* Header with close button */}
      <div className="flex justify-between items-center p-5 border-b border-gray-100">
        <div className="flex items-center">
          <div className="bg-green-100 p-2 rounded-lg mr-3">
            <Leaf className="h-6 w-6 text-green-600" />
          </div>
          <h1 className="text-xl font-serif font-semibold text-gray-800">Digi Fasal</h1>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="h-6 w-6" />
        </Button>
      </div>
      
      {/* Navigation Links */}
      <nav className="px-5 py-4">
        <Link href="/marketplace" onClick={onClose}>
          <div className={`flex items-center py-4 text-lg ${location === "/marketplace" ? "text-green-600" : "text-gray-700"} hover:text-green-600 border-b border-gray-100`}>
            <Leaf className="h-4 w-4 mr-3 text-green-500" />
            Marketplace
          </div>
        </Link>
        <Link href="/services" onClick={onClose}>
          <div className={`flex items-center py-4 text-lg ${location === "/services" ? "text-green-600" : "text-gray-700"} hover:text-green-600 border-b border-gray-100`}>
            <Leaf className="h-4 w-4 mr-3 text-green-500" />
            Services
          </div>
        </Link>
        <Link href="/#insights" onClick={onClose}>
          <div className="flex items-center py-4 text-lg text-gray-700 hover:text-green-600 border-b border-gray-100">
            <Leaf className="h-4 w-4 mr-3 text-green-500" />
            Insights
          </div>
        </Link>
        <Link href="/#about" onClick={onClose}>
          <div className="flex items-center py-4 text-lg text-gray-700 hover:text-green-600 border-b border-gray-100">
            <Leaf className="h-4 w-4 mr-3 text-green-500" />
            About
          </div>
        </Link>
        
        {/* User Section */}
        <div className="mt-6">
          {isAuthenticated ? (
            <>
              <Link href="/dashboard" onClick={onClose}>
                <div className="flex items-center py-4 text-lg text-gray-700 hover:text-green-600 border-b border-gray-100">
                  <Leaf className="h-4 w-4 mr-3 text-green-500" />
                  Dashboard
                </div>
              </Link>
              <Link href="/profile" onClick={onClose}>
                <div className="flex items-center py-4 text-lg text-gray-700 hover:text-green-600 border-b border-gray-100">
                  <Leaf className="h-4 w-4 mr-3 text-green-500" />
                  Profile
                </div>
              </Link>
              <div 
                className="flex items-center py-4 text-lg text-red-500 hover:text-red-600 cursor-pointer border-b border-gray-100"
                onClick={handleLogout}
              >
                <Leaf className="h-4 w-4 mr-3 text-red-400" />
                Sign Out
              </div>
            </>
          ) : (
            <div className="space-y-4 mt-4">
              <Link href="/login" onClick={onClose}>
                <div className="flex items-center justify-center py-3 text-lg text-gray-700 hover:text-green-600">
                  Sign In
                </div>
              </Link>
              <Link href="/register" onClick={onClose}>
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium shadow-sm transition-colors duration-200">
                  Create Account
                </Button>
              </Link>
            </div>
          )}
        </div>
      </nav>
      
      {/* Footer Note */}
      <div className="absolute bottom-0 left-0 right-0 p-5 text-center text-sm text-gray-500 border-t border-gray-100">
        Connecting farmers and buyers since 2023
      </div>
    </div>
  );
}