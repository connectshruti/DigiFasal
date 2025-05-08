import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/types";
import { ProductCard } from "@/components/ui/product-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Filter, Search, X, Leaf, Sprout, Wheat } from "lucide-react";
import { Helmet } from "react-helmet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";

export default function Marketplace() {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState<string>("");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products'],
    staleTime: 60000,
  });

  useEffect(() => {
    if (!products) return;

    let filtered = [...products];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        product =>
          product.title.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
      );
    }

    if (category) {
      filtered = filtered.filter(product => product.category === category);
    }

    filtered = filtered.filter(
      product =>
        Number(product.price) >= priceRange[0] &&
        Number(product.price) <= priceRange[1]
    );

    setFilteredProducts(filtered);
  }, [products, searchQuery, category, priceRange]);

  const clearFilters = () => {
    setSearchQuery("");
    setCategory("");
    setPriceRange([0, 1000]);
  };

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'vegetables': return <Sprout className="h-4 w-4 mr-2" />;
      case 'fruits': return <Leaf className="h-4 w-4 mr-2" />;
      case 'grains': return <Wheat className="h-4 w-4 mr-2" />;
      default: return null;
    }
  };

  return (
    <div className="bg-gradient-to-b from-green-50 to-white min-h-screen">
      <Helmet>
        <title>Marketplace | Digi Fasal</title>
        <meta name="description" content="Browse fresh agricultural products directly from farmers" />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        {/* Header with nature theme */}
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-4">
            <Leaf className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-green-800 mb-2">Farm Fresh Marketplace</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover fresh, organic produce directly from local farmers
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Mobile Filter Button */}
          <div className="block lg:hidden w-full mb-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-white">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <Filter className="h-5 w-5 text-green-600" />
                    Filter Products
                  </SheetTitle>
                </SheetHeader>
                <div className="py-4 space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block text-gray-700">Category</label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger className="border-gray-300">
                        <SelectValue placeholder="All Categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="vegetables">
                          <div className="flex items-center">
                            <Sprout className="h-4 w-4 mr-2" />
                            Vegetables
                          </div>
                        </SelectItem>
                        <SelectItem value="fruits">
                          <div className="flex items-center">
                            <Leaf className="h-4 w-4 mr-2" />
                            Fruits
                          </div>
                        </SelectItem>
                        <SelectItem value="grains">
                          <div className="flex items-center">
                            <Wheat className="h-4 w-4 mr-2" />
                            Grains
                          </div>
                        </SelectItem>
                        <SelectItem value="organic">Organic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-1 block text-gray-700">Price Range</label>
                    <div className="px-2">
                      <Slider 
                        defaultValue={[0, 1000]} 
                        max={1000} 
                        step={10}
                        value={priceRange}
                        onValueChange={setPriceRange}
                        className="[&>span:first-child]:bg-green-500"
                      />
                      <div className="flex justify-between mt-2 text-sm text-gray-600">
                        <span>₹{priceRange[0]}</span>
                        <span>₹{priceRange[1]}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full mt-4 border-gray-300 hover:bg-green-50"
                    onClick={clearFilters}
                  >
                    Clear Filters
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Sidebar Filters */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-xl p-6 sticky top-4 border border-gray-100 shadow-sm">
              <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <Filter className="h-5 w-5 text-green-600" />
                Filters
              </h2>
              
              <div className="mb-6">
                <label className="text-sm font-medium mb-2 block text-gray-700">Category</label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="border-gray-300">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="vegetables">
                      <div className="flex items-center">
                        <Sprout className="h-4 w-4 mr-2" />
                        Vegetables
                      </div>
                    </SelectItem>
                    <SelectItem value="fruits">
                      <div className="flex items-center">
                        <Leaf className="h-4 w-4 mr-2" />
                        Fruits
                      </div>
                    </SelectItem>
                    <SelectItem value="grains">
                      <div className="flex items-center">
                        <Wheat className="h-4 w-4 mr-2" />
                        Grains
                      </div>
                    </SelectItem>
                    <SelectItem value="organic">Organic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="mb-6">
                <label className="text-sm font-medium mb-2 block text-gray-700">Price Range</label>
                <div className="px-2">
                  <Slider 
                    defaultValue={[0, 1000]} 
                    max={1000} 
                    step={10}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="[&>span:first-child]:bg-green-500"
                  />
                  <div className="flex justify-between mt-2 text-sm text-gray-600">
                    <span>₹{priceRange[0]}</span>
                    <span>₹{priceRange[1]}</span>
                  </div>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                className="w-full border-gray-300 hover:bg-green-50"
                onClick={clearFilters}
              >
                Clear Filters
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search Bar */}
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder="Search for fresh produce..."
                className="pl-10 pr-10 border-gray-300 focus:ring-green-500 focus:border-green-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>

            {/* Active Filters */}
            {(category || priceRange[0] > 0 || priceRange[1] < 1000) && (
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <div className="text-sm font-medium text-gray-700">Active filters:</div>
                {category && (
                  <Badge 
                    variant="outline" 
                    className="bg-green-50 text-green-800 border-green-200"
                  >
                    {getCategoryIcon(category)}
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                    <button 
                      className="ml-2 text-green-600 hover:text-green-800"
                      onClick={() => setCategory("")}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {(priceRange[0] > 0 || priceRange[1] < 1000) && (
                  <Badge 
                    variant="outline" 
                    className="bg-blue-50 text-blue-800 border-blue-200"
                  >
                    ₹{priceRange[0]} - ₹{priceRange[1]}
                    <button 
                      className="ml-2 text-blue-600 hover:text-blue-800"
                      onClick={() => setPriceRange([0, 1000])}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                <button
                  className="text-sm text-green-600 hover:text-green-800 hover:underline"
                  onClick={clearFilters}
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Products Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array(6).fill(0).map((_, index) => (
                  <div key={index} className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <Skeleton className="h-48 w-full rounded-t-xl" />
                    <div className="p-4">
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-1/2 mb-3" />
                      <div className="flex justify-between">
                        <Skeleton className="h-5 w-1/3" />
                        <Skeleton className="h-8 w-8 rounded-full" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    className="hover:shadow-md transition-shadow"
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl p-8 text-center border border-gray-100 shadow-sm">
                <div className="text-5xl mb-4">🌱</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No Products Found</h3>
                <p className="text-gray-600 mb-6">
                  We couldn't find any products matching your search criteria.
                </p>
                <Button 
                  variant="outline" 
                  className="border-gray-300 hover:bg-green-50"
                  onClick={clearFilters}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}