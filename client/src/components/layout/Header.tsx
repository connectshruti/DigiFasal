import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { useContext, useState } from "react";
import { AuthContext, CartContext } from "@/App";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Leaf, User, ChevronDown, Menu, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  onMobileMenuToggle: () => void;
}

export default function Header({ onMobileMenuToggle }: HeaderProps) {
  const [location] = useLocation();
  const { user, isAuthenticated, setUser } = useContext(AuthContext);
  const { getTotalItems } = useContext(CartContext);
  
  const handleLogout = () => {
    setUser(null);
  };
  
  return (
    <header className="bg-white border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center group">
              <div className="bg-green-100 p-2 rounded-lg mr-3 group-hover:bg-green-200 transition-colors">
                <Leaf className="h-6 w-6 text-green-600" />
              </div>
              <h1 className="text-2xl font-serif font-semibold text-gray-800 group-hover:text-green-600 transition-colors">
                Digi Fasal
              </h1>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/marketplace" className={`text-gray-600 hover:text-green-600 font-medium transition-colors ${location === "/marketplace" ? "text-green-600" : ""}`}>
              Marketplace
            </Link>
            <Link href="/services" className={`text-gray-600 hover:text-green-600 font-medium transition-colors ${location === "/services" ? "text-green-600" : ""}`}>
              Services
            </Link>
            <Link href="/#insights" className="text-gray-600 hover:text-green-600 font-medium transition-colors">
              Insights
            </Link>
            <Link href="/#about" className="text-gray-600 hover:text-green-600 font-medium transition-colors">
              About
            </Link>
            
            {/* Cart icon with badge */}
            <Link href="/cart" className="relative group">
              <div className="p-1.5 rounded-full group-hover:bg-green-100 transition-colors">
                <ShoppingCart className="h-5 w-5 text-gray-600 group-hover:text-green-600 transition-colors" />
              </div>
              {getTotalItems() > 0 && (
                <Badge className="absolute -top-1 -right-1 bg-green-600 text-white">
                  {getTotalItems()}
                </Badge>
              )}
            </Link>
            
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center text-gray-600 hover:text-green-600 font-medium group">
                    <div className="p-1.5 mr-2 rounded-full bg-gray-100 group-hover:bg-green-100 transition-colors">
                      <User className="h-4 w-4 text-gray-600 group-hover:text-green-600 transition-colors" />
                    </div>
                    {user?.fullName?.split(' ')[0] || 'Account'}
                    <ChevronDown className="h-4 w-4 ml-1 text-gray-500 group-hover:text-green-600 transition-colors" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 border border-gray-200 shadow-md rounded-lg">
                  <DropdownMenuItem asChild className="hover:bg-green-50 focus:bg-green-50">
                    <Link href="/dashboard" className="w-full cursor-pointer text-gray-700">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="hover:bg-green-50 focus:bg-green-50">
                    <Link href="/dashboard" className="w-full cursor-pointer text-gray-700">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="hover:bg-green-50 focus:bg-green-50">
                    <Link href="/settings" className="w-full cursor-pointer text-gray-700">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-100" />
                  <DropdownMenuItem 
                    onClick={handleLogout} 
                    className="text-red-500 hover:bg-red-50 focus:bg-red-50 cursor-pointer"
                  >
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-3">
                <Link href="/login">
                  <Button variant="ghost" className="text-gray-600 hover:text-green-600 font-medium">
                    Sign In
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-medium shadow-sm transition-colors duration-200">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </nav>
          
          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden space-x-4">
            <Link href="/cart" className="relative group">
              <div className="p-1.5 rounded-full group-hover:bg-green-100 transition-colors">
                <ShoppingCart className="h-5 w-5 text-gray-600" />
              </div>
              {getTotalItems() > 0 && (
                <Badge className="absolute -top-1 -right-1 bg-green-600 text-white">
                  {getTotalItems()}
                </Badge>
              )}
            </Link>
            <Button 
              variant="ghost"
              size="icon"
              className="text-gray-600 hover:text-green-600"
              onClick={onMobileMenuToggle}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}