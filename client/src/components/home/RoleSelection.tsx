import { RoleCard } from "@/components/ui/role-card";
import { Tractor, ShoppingBasket, Wrench, Leaf } from "lucide-react";

export default function RoleSelection() {
  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-gray-800 mb-3">
            Join Our <span className="text-green-600">Farming Network</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connect with India's fastest-growing agricultural marketplace
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          <RoleCard 
            title="Farmer" 
            description="Sell your harvest directly to buyers, get fair prices, and grow your business."
            icon={Tractor}
            imageSrc="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            role="farmer"
            className="border border-gray-200 hover:border-green-200 transition-colors duration-300"
            iconClassName="bg-green-100 text-green-600"
            titleClassName="text-gray-800"
            descriptionClassName="text-gray-600"
          />
          
          <RoleCard 
            title="Buyer" 
            description="Source fresh produce directly from farmers with complete transparency."
            icon={ShoppingBasket}
            imageSrc="https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            role="buyer"
            className="border border-gray-200 hover:border-green-200 transition-colors duration-300"
            iconClassName="bg-green-100 text-green-600"
            titleClassName="text-gray-800"
            descriptionClassName="text-gray-600"
          />
          
          <RoleCard 
            title="Service Provider" 
            description="Offer your agricultural services to our growing community."
            icon={Wrench}
            imageSrc="https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            role="service_provider"
            className="border border-gray-200 hover:border-green-200 transition-colors duration-300"
            iconClassName="bg-green-100 text-green-600"
            titleClassName="text-gray-800"
            descriptionClassName="text-gray-600"
          />
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-500 flex items-center justify-center">
            <Leaf className="h-4 w-4 text-green-500 mr-2" />
            Trusted by over 10,000 agricultural professionals
          </p>
        </div>
      </div>
    </section>
  );
}