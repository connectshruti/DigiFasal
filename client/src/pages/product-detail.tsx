import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { Product, User } from "@/types";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowLeft,
  Truck,
  ShieldCheck,
  Star,
  Plus,
  Minus,
  ShoppingCart,
  Leaf,
  Sprout,
  Wheat,
  User as UserIcon,
  MapPin,
  Calendar,
  CheckCircle
} from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useContext, useState } from "react";
import { CartContext } from "@/App";
import { useToast } from "@/hooks/use-toast";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);
  const { toast } = useToast();

  const { data: product, isLoading: isLoadingProduct } = useQuery<Product>({
    queryKey: [`/api/products/${id}`],
  });

  const { data: farmer, isLoading: isLoadingFarmer } = useQuery<User>({
    queryKey: [`/api/users/${product?.farmerId}`],
    enabled: !!product?.farmerId,
  });

  if (isLoadingProduct || isLoadingFarmer) {
    return <ProductDetailSkeleton />;
  }

  if (!product) {
    return <ProductNotFound />;
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast({
      title: "Added to cart",
      description: `${quantity} x ${product.title} added to your cart.`,
    });
  };

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    if (quantity < Number(product.quantity)) setQuantity(quantity + 1);
  };

  const getCategoryIcon = () => {
    switch(product.category) {
      case 'vegetables': return <Sprout className="h-5 w-5 text-green-600" />;
      case 'fruits': return <Leaf className="h-5 w-5 text-green-600" />;
      case 'grains': return <Wheat className="h-5 w-5 text-green-600" />;
      default: return null;
    }
  };

  return (
    <div className="bg-gradient-to-b from-green-50 to-white min-h-screen">
      <Helmet>
        <title>{product.title} | Digi Fasal</title>
        <meta name="description" content={product.description} />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <Link href="/marketplace" className="inline-flex items-center text-green-600 hover:text-green-700 hover:underline mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to marketplace
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="bg-white rounded-xl overflow-hidden border border-green-100 shadow-sm hover:shadow-md transition-shadow">
            {product.images && product.images.length > 0 ? (
              <img src={product.images[0]} alt={product.title} className="w-full h-[400px] object-cover" />
            ) : (
              <div className="w-full h-[400px] bg-green-50 flex items-center justify-center">
                <Leaf className="h-16 w-16 text-green-200" />
              </div>
            )}
          </div>

          {/* Product Details */}
          <div>
            <div className="mb-4 flex flex-wrap gap-2">
              {product.isOrganic && (
                <Badge className="bg-green-100 text-green-800">
                  <CheckCircle className="h-3 w-3 mr-1" /> Organic
                </Badge>
              )}
              {product.isPremium && (
                <Badge className="bg-yellow-100 text-yellow-800">
                  <Star className="h-3 w-3 mr-1" /> Premium
                </Badge>
              )}
              {product.isCertified && (
                <Badge className="bg-blue-100 text-blue-800">
                  <ShieldCheck className="h-3 w-3 mr-1" /> Certified
                </Badge>
              )}
            </div>

            <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.title}</h1>

            <div className="flex items-center gap-4 mb-4">
              {product.rating && (
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-100 mr-1" />
                  <span className="font-medium">{product.rating}</span>
                </div>
              )}
              <div className="flex items-center text-gray-600">
                <Calendar className="h-4 w-4 mr-1" />
                <span>Harvested: {new Date(product.harvestDate).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="text-3xl font-bold text-green-600 mb-4">
              ₹{product.price}<span className="text-lg text-gray-500">/{product.unit}</span>
            </div>

            <p className="text-gray-700 mb-6 leading-relaxed">{product.description}</p>

            {/* Quantity Selector */}
            <div className="flex items-center gap-6 mb-6">
              <div>
                <span className="text-sm font-medium text-gray-700 mb-1 block">Quantity</span>
                <div className="flex items-center border border-gray-200 rounded-lg">
                  <Button variant="ghost" size="sm" onClick={decreaseQuantity} disabled={quantity <= 1} className="text-gray-600 hover:bg-green-50">
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center">{quantity}</span>
                  <Button variant="ghost" size="sm" onClick={increaseQuantity} disabled={quantity >= Number(product.quantity)} className="text-gray-600 hover:bg-green-50">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700 mb-1 block">Available</span>
                <div className="text-gray-600">{product.quantity} {product.unit}</div>
              </div>
            </div>

            <Button size="lg" className="w-full bg-green-600 hover:bg-green-700 text-white mb-6 shadow-sm" onClick={handleAddToCart}>
              <ShoppingCart className="h-5 w-5 mr-2" /> Add to Cart
            </Button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-start p-4 bg-green-50 rounded-lg border border-green-100">
                <Truck className="h-6 w-6 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium mb-1 text-gray-800">Fast Delivery</h3>
                  <p className="text-sm text-gray-600">Delivery within 1-3 business days</p>
                </div>
              </div>
              <div className="flex items-start p-4 bg-green-50 rounded-lg border border-green-100">
                <ShieldCheck className="h-6 w-6 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium mb-1 text-gray-800">Quality Guaranteed</h3>
                  <p className="text-sm text-gray-600">100% money back if not satisfied</p>
                </div>
              </div>
            </div>

            {farmer && (
              <Card className="bg-white border border-green-100 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <h3 className="font-medium mb-3 flex items-center gap-2">
                    <UserIcon className="h-5 w-5 text-green-600" /> Seller Information
                  </h3>
                  <div className="flex items-start gap-4">
                    <div className="bg-green-100 p-2 rounded-full">
                      <UserIcon className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 mb-1">{farmer.fullName}</p>
                      <p className="text-gray-600 mb-2 flex items-center">
                        <MapPin className="h-4 w-4 mr-1" /> {farmer.city}, {farmer.state}
                      </p>
                      <p className="text-sm text-gray-600">{farmer.bio || "Experienced farmer with quality produce"}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        <div className="mt-10">
          <Tabs defaultValue="details">
            <TabsList className="w-full border-b border-gray-200 justify-start gap-2 mb-6">
              <TabsTrigger value="details" className="data-[state=active]:border-b-2 data-[state=active]:border-green-600">
                Product Details
              </TabsTrigger>
              <TabsTrigger value="shipping" className="data-[state=active]:border-b-2 data-[state=active]:border-green-600">
                Shipping Info
              </TabsTrigger>
              <TabsTrigger value="reviews" className="data-[state=active]:border-b-2 data-[state=active]:border-green-600">
                Reviews
              </TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                {getCategoryIcon()} Product Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Category</h4>
                    <p className="capitalize">{product.category}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Harvest Date</h4>
                    <p>{new Date(product.harvestDate).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Location</h4>
                    <p>{product.location || "Not specified"}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Available Quantity</h4>
                    <p>{product.quantity} {product.unit}</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="shipping" className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Truck className="h-5 w-5 text-green-600" /> Shipping Information
              </h3>
              <ul className="space-y-3">
                {["Orders are processed within 24 hours on business days","Delivery available across most areas in India","Standard delivery takes 1-3 business days","Shipping fees vary by weight and location","Products are carefully inspected before shipping"].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">•</span>
                    <p className="text-gray-700">{item}</p>
                  </li>
                ))}
              </ul>
            </TabsContent>

            <TabsContent value="reviews" className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-100" /> Customer Reviews
              </h3>
              <div className="text-center py-8">
                <div className="bg-green-50 p-4 rounded-full inline-block mb-4">
                  <Star className="h-8 w-8 text-yellow-500" />
                </div>
                <p className="text-gray-600 mb-4">No reviews yet for this product.</p>
                <Button variant="outline" className="border-gray-300 hover:bg-green-50">
                  Be the first to review
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

function ProductDetailSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-b from-green-50 to-white">
      <Skeleton className="h-6 w-40 mb-6" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Skeleton className="h-[400px] w-full rounded-xl" />
        <div className="space-y-4">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
      </div>
    </div>
  );
}

function ProductNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-green-800 mb-2">Product Not Found</h2>
        <p className="text-gray-600 mb-4">We couldn't find the product you're looking for.</p>
        <Link href="/marketplace">
          <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-100">
            Go to Marketplace
          </Button>
        </Link>
      </div>
    </div>
  );
}
