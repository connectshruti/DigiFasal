import { ProductCard } from "@/components/ui/product-card";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";

export default function FeaturedProducts() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products', activeCategory],
    staleTime: 60000,
  });
  
  const filteredProducts = activeCategory 
    ? products?.filter(product => product.category === activeCategory) 
    : products;
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-gray-800">
              Fresh From The <span className="text-green-600">Farm</span>
            </h2>
            <p className="text-gray-500 mt-2">Seasonal produce from local farmers</p>
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full border-gray-300 hover:bg-gray-50"
            >
              <ChevronLeft className="h-4 w-4 text-gray-600" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full border-gray-300 hover:bg-gray-50"
            >
              <ChevronRight className="h-4 w-4 text-gray-600" />
            </Button>
          </div>
        </div>
        
        {/* Filter Options */}
        <div className="mb-10 flex flex-wrap gap-3">
          <Button 
            variant={activeCategory === null ? "default" : "outline"}
            className={`rounded-full transition-all ${activeCategory === null ? 
              'bg-green-600 text-white hover:bg-green-700 shadow-md' : 
              'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
            onClick={() => setActiveCategory(null)}
          >
            All
          </Button>
          <Button 
            variant={activeCategory === "vegetables" ? "default" : "outline"}
            className={`rounded-full transition-all ${activeCategory === "vegetables" ? 
              'bg-green-600 text-white hover:bg-green-700 shadow-md' : 
              'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
            onClick={() => setActiveCategory("vegetables")}
          >
            Vegetables
          </Button>
          <Button 
            variant={activeCategory === "fruits" ? "default" : "outline"}
            className={`rounded-full transition-all ${activeCategory === "fruits" ? 
              'bg-green-600 text-white hover:bg-green-700 shadow-md' : 
              'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
            onClick={() => setActiveCategory("fruits")}
          >
            Fruits
          </Button>
          <Button 
            variant={activeCategory === "grains" ? "default" : "outline"}
            className={`rounded-full transition-all ${activeCategory === "grains" ? 
              'bg-green-600 text-white hover:bg-green-700 shadow-md' : 
              'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
            onClick={() => setActiveCategory("grains")}
          >
            Grains
          </Button>
          <Button 
            variant={activeCategory === "organic" ? "default" : "outline"}
            className={`rounded-full transition-all ${activeCategory === "organic" ? 
              'bg-green-600 text-white hover:bg-green-700 shadow-md' : 
              'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
            onClick={() => setActiveCategory("organic")}
          >
            Organic
          </Button>
        </div>
        
        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {isLoading ? (
            Array(4).fill(0).map((_, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100">
                <Skeleton className="h-56 w-full bg-gray-100" />
                <div className="p-4">
                  <Skeleton className="h-6 w-3/4 mb-3 bg-gray-200" />
                  <Skeleton className="h-4 w-1/2 mb-4 bg-gray-200" />
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-5 w-1/3 bg-gray-200" />
                    <Skeleton className="h-9 w-9 rounded-full bg-gray-200" />
                  </div>
                </div>
              </div>
            ))
          ) : filteredProducts && filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="mx-auto w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-4">
                <svg className="w-12 h-12 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-700 mb-2">No products found</h3>
              <p className="text-gray-500">Try adjusting your filters</p>
            </div>
          )}
        </div>
        
        {/* View More Link */}
        <div className="flex justify-center mt-12">
          <Link 
            href="/marketplace" 
            className="flex items-center text-green-600 hover:text-green-700 font-medium group transition-colors"
          >
            Browse Full Marketplace
            <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}