import { Card, CardContent } from "@/components/ui/card";
import { Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";
import { useContext } from "react";
import { CartContext } from "@/App";
import { Link } from "wouter";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useContext(CartContext);
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };
  
  return (
    <Link href={`/product/${product.id}`}>
      <Card className="bg-white rounded-xl border border-[#f0f0f0] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 overflow-hidden cursor-pointer">
        <div className="relative">
          <div className="h-52 overflow-hidden">
            {product.images && product.images.length > 0 ? (
              <img 
                src={product.images[0]} 
                alt={product.title} 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            ) : (
              <div className="w-full h-full bg-[#f8f8f8] flex items-center justify-center">
                <span className="text-[#9ca3af]">No image</span>
              </div>
            )}
          </div>
          <div className="absolute top-3 left-3 flex gap-2">
            {product.isPremium && (
              <span className="bg-[#4a7c59] text-white text-xs px-3 py-1 rounded-full font-medium">
                Premium
              </span>
            )}
            {product.isOrganic && (
              <span className="bg-[#3a6a4a] text-white text-xs px-3 py-1 rounded-full font-medium">
                Organic
              </span>
            )}
          </div>
        </div>
        <CardContent className="p-5">
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-medium text-[#1f2937] text-lg line-clamp-1">
              {product.title}
            </h3>
            {product.rating && (
              <div className="flex items-center bg-[#f0f7f4] px-2 py-1 rounded-full">
                <Star className="h-4 w-4 text-[#4a7c59] fill-[#4a7c59]" />
                <span className="text-sm font-medium ml-1 text-[#4a7c59]">
                  {product.rating}
                </span>
              </div>
            )}
          </div>
          <p className="text-[#6b7280] text-sm mb-4">{product.location}</p>
          <div className="flex justify-between items-center">
            <div>
              <span className="text-xl font-bold text-[#4a7c59]">
                ₹{product.price}
              </span>
              <span className="text-sm text-[#9ca3af] ml-1">
                /{product.unit}
              </span>
            </div>
            <Button 
              size="icon"
              className="bg-[#4a7c59] hover:bg-[#3a6a4a] text-white p-2 rounded-full transition-all duration-200 hover:scale-105"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}