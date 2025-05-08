"use client"

import { useContext, useState } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "@/App";
import { Helmet } from "react-helmet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/ui/product-card";
import { CheckoutModal } from "@/components/ui/checkout-modal";
import { Product, Order, Service } from "@/types";
import { 
  BarChart3, 
  Calendar, 
  ChevronRight, 
  ClipboardList, 
  Edit, 
  Package, 
  Plus, 
  Settings, 
  ShoppingCart, 
  Star, 
  TrendingUp, 
  Truck, 
  User,
  Leaf,
  Sprout,
  Wheat,
  Sun,
  Trees
} from "lucide-react";

export default function Dashboard() {
  // State and context variables remain the same
  const { user, isAuthenticated } = useContext(AuthContext);
  const [_, setLocation] = useLocation();
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  
  // Query hooks remain the same
  const { data: products, isLoading: isLoadingProducts } = useQuery<Product[]>({
    queryKey: ['/api/products/farmer/' + user?.id],
    enabled: user?.role === 'farmer',
  });
  
  const { data: services, isLoading: isLoadingServices } = useQuery<Service[]>({
    queryKey: ['/api/services/provider/' + user?.id],
    enabled: user?.role === 'service_provider',
  });
  
  const { data: buyerOrders, isLoading: isLoadingBuyerOrders } = useQuery<Order[]>({
    queryKey: ['/api/orders/buyer/' + user?.id],
    enabled: user?.role === 'buyer',
  });
  
  const { data: farmerOrders, isLoading: isLoadingFarmerOrders } = useQuery<Order[]>({
    queryKey: ['/api/orders/farmer/' + user?.id],
    enabled: user?.role === 'farmer',
  });
  
  const isLoading = 
    (user?.role === 'farmer' && isLoadingProducts) || 
    (user?.role === 'service_provider' && isLoadingServices) ||
    (user?.role === 'buyer' && isLoadingBuyerOrders) ||
    (user?.role === 'farmer' && isLoadingFarmerOrders);

  // Helper functions remain the same
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };
  
  const getRoleDisplay = (role: string) => {
    switch (role) {
      case 'farmer': return 'Farmer';
      case 'buyer': return 'Buyer';
      case 'service_provider': return 'Service Provider';
      default: return role;
    }
  };

  // Enhanced status badges with nature colors
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-amber-100 text-amber-800">Pending</Badge>;
      case 'confirmed':
        return <Badge className="bg-blue-100 text-blue-800">Confirmed</Badge>;
      case 'shipped':
        return <Badge className="bg-indigo-100 text-indigo-800">Shipped</Badge>;
      case 'delivered':
        return <Badge className="bg-green-100 text-green-800">Delivered</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  if (!isAuthenticated) {
    setLocation("/login");
    return null;
  }

  return (
    <>
      <Helmet>
        <title>Dashboard - GreenHarvest</title>
        <meta name="description" content="Manage your GreenHarvest account" />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        {/* Header with nature theme */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex items-center gap-3">
            <Leaf className="h-8 w-8 text-green-600" />
            <h1 className="text-3xl font-bold text-gray-800">
              Welcome, {user?.fullName.split(' ')[0]}!
            </h1>
          </div>
          
          {/* Role-based action buttons */}
          {user?.role === 'farmer' && (
            <Button className="bg-green-600 hover:bg-green-700 text-white shadow-sm">
              <Sprout className="h-4 w-4 mr-2" />
              Add New Product
            </Button>
          )}
          {user?.role === 'service_provider' && (
            <Button className="bg-green-600 hover:bg-green-700 text-white shadow-sm">
              <Plus className="h-4 w-4 mr-2" />
              Add New Service
            </Button>
          )}
          {user?.role === 'buyer' && (
            <Button 
              className="bg-green-600 hover:bg-green-700 text-white shadow-sm"
              onClick={() => setLocation('/marketplace')}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Browse Products
            </Button>
          )}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - User Profile */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border border-gray-100 shadow-sm">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center mb-6">
                  <Avatar className="h-24 w-24 mb-4 border-2 border-green-100">
                    <AvatarImage src={user?.profileImage} alt={user?.fullName} />
                    <AvatarFallback className="bg-green-50 text-green-600 font-medium">
                      {user ? getInitials(user.fullName) : 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="font-semibold text-xl text-gray-800">{user?.fullName}</h2>
                  <Badge className="mt-2 bg-green-100 text-green-800">
                    {user ? getRoleDisplay(user.role) : ''}
                  </Badge>
                  {user?.city && (
                    <p className="text-gray-500 mt-2 flex items-center justify-center">
                      <Sun className="h-4 w-4 mr-1 text-yellow-500" />
                      {user.city}, {user.state}
                    </p>
                  )}
                </div>
                
                <div className="space-y-1">
                  <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-green-50">
                    <User className="h-4 w-4 mr-2 text-green-600" />
                    Profile
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-green-50">
                    <ClipboardList className="h-4 w-4 mr-2 text-green-600" />
                    Orders
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-green-50">
                    <Settings className="h-4 w-4 mr-2 text-green-600" />
                    Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Quick Stats */}
            <Card className="border border-gray-100 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-green-600" />
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {user?.role === 'farmer' && (
                  <>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-gray-700">
                        <Package className="h-4 w-4 mr-2 text-green-500" />
                        <span>Products</span>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        {products?.length || 0}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-gray-700">
                        <ShoppingCart className="h-4 w-4 mr-2 text-green-500" />
                        <span>Orders</span>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        {farmerOrders?.length || 0}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-gray-700">
                        <Star className="h-4 w-4 mr-2 text-yellow-500" />
                        <span>Rating</span>
                      </div>
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                        4.8/5
                      </Badge>
                    </div>
                  </>
                )}
                
                {/* Other role stats... */}
              </CardContent>
            </Card>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="overview">
              <TabsList className="w-full bg-transparent border-b border-gray-100 rounded-none mb-6 justify-start gap-2">
                <TabsTrigger 
                  value="overview" 
                  className="data-[state=active]:border-b-2 data-[state=active]:border-green-600"
                >
                  Overview
                </TabsTrigger>
                {user?.role === 'farmer' && (
                  <TabsTrigger 
                    value="products" 
                    className="data-[state=active]:border-b-2 data-[state=active]:border-green-600"
                  >
                    My Products
                  </TabsTrigger>
                )}
                {/* Other tabs... */}
              </TabsList>
              
              <TabsContent value="overview">
                {/* Welcome Card */}
                <Card className="mb-6 border border-gray-100 shadow-sm">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Trees className="h-6 w-6 text-green-600" />
                      <h2 className="text-xl font-semibold text-gray-800">
                        {user?.role === 'farmer' && "Farm Management Dashboard"}
                        {user?.role === 'buyer' && "Fresh Produce Marketplace"}
                        {user?.role === 'service_provider' && "Agricultural Services Hub"}
                      </h2>
                    </div>
                    <p className="text-gray-600">
                      {user?.role === 'farmer' && "Manage your organic farm products and track your orders in one place."}
                      {user?.role === 'buyer' && "Discover fresh, locally-sourced products from trusted farmers."}
                      {user?.role === 'service_provider' && "Connect with farmers and buyers through your agricultural services."}
                    </p>
                  </CardContent>
                </Card>
                
                {/* Recent Activity */}
                <Card className="mb-6 border border-gray-100 shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ClipboardList className="h-5 w-5 text-green-600" />
                      Recent Activity
                    </CardTitle>
                    <CardDescription className="text-gray-500">
                      Your latest actions and updates
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isLoading ? (
                      <div className="space-y-4">
                        {Array(3).fill(0).map((_, i) => (
                          <Skeleton key={i} className="h-16 w-full rounded-lg" />
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {/* Activity items based on role */}
                        {user?.role === 'farmer' && farmerOrders?.slice(0, 3).map((order) => (
                          <div 
                            key={order.id} 
                            className="flex items-start gap-3 p-3 rounded-lg hover:bg-green-50 transition-colors"
                          >
                            <div className="bg-green-100 p-2 rounded-full">
                              <ShoppingCart className="h-5 w-5 text-green-600" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-gray-800">New order received</p>
                              <p className="text-sm text-gray-500">
                                Order #{order.id} • ₹{order.totalPrice}
                              </p>
                              <div className="mt-1">
                                {getStatusBadge(order.status)}
                              </div>
                            </div>
                            <ChevronRight className="h-5 w-5 text-gray-400" />
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                {/* Quick Actions */}
                <Card className="border border-gray-100 shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                      Quick Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {user?.role === 'farmer' && (
                        <>
                          <Button 
                            variant="outline" 
                            className="justify-start border-gray-200 hover:bg-green-50"
                          >
                            <Sprout className="h-4 w-4 mr-2 text-green-600" />
                            Add New Product
                          </Button>
                          <Button 
                            variant="outline" 
                            className="justify-start border-gray-200 hover:bg-green-50"
                          >
                            <Edit className="h-4 w-4 mr-2 text-green-600" />
                            Update Inventory
                          </Button>
                        </>
                      )}
                      {/* Other role actions... */}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Other tab contents with consistent styling... */}
            </Tabs>
          </div>
        </div>
      </div>
      
      <CheckoutModal open={showCheckoutModal} onClose={() => setShowCheckoutModal(false)} />
    </>
  );
}