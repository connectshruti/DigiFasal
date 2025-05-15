import React from 'react';

import { ServiceCard } from "../ui/service-card";
import { useQuery } from "@tanstack/react-query";
import { Service } from "../../types";
import { useToast } from "../../hooks/use-toast";
import { Skeleton } from "../ui/skeleton";
import { Truck, Tractor, Brain, Leaf } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ServicesSection() {
  const { toast } = useToast();
const navigate = useNavigate();
  
  const { data: services, isLoading } = useQuery<Service[]>({
    queryKey: ['/api/services'],
    staleTime: 60000,
  });
  
  const handleServiceClick = (type: string) => {
    navigate(`/services?type=${type}`);
  };
  
  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-gray-800 mb-3">
            Farm <span className="text-green-600">Support Services</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Everything you need to grow, harvest, and deliver your produce
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {isLoading ? (
            Array(3).fill(0).map((_, index) => (
              <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow duration-300">
                <Skeleton className="h-10 w-10 mx-auto mb-4 rounded-lg" />
                <Skeleton className="h-6 w-40 mx-auto mb-4" />
                <Skeleton className="h-4 w-full mb-3" />
                <Skeleton className="h-4 w-5/6 mb-3" />
                <Skeleton className="h-4 w-3/4 mb-6 mx-auto" />
                <Skeleton className="h-12 w-full rounded-lg" />
              </div>
            ))
          ) : (  
            <>
              <ServiceCard 
                title="Transportation" 
                description="Reliable cold-chain logistics to preserve your harvest from farm to market"
                icon={Truck}
                buttonText="Find Transporters"
                onClick={() => handleServiceClick("transportation")}
                className="border border-gray-200 hover:border-green-200"
                iconClassName="bg-green-100 text-green-600"
                buttonClassName="bg-green-600 hover:bg-green-700"
              />
              
              <ServiceCard 
                title="Equipment Rental" 
                description="Modern farming equipment available by the hour, day, or season"
                icon={Tractor}
                buttonText="Browse Equipment"
                onClick={() => handleServiceClick("equipment_rental")}
                className="border border-gray-200 hover:border-green-200"
                iconClassName="bg-green-100 text-green-600"
                buttonClassName="bg-green-600 hover:bg-green-700"
              />
              
              <ServiceCard 
                title="Farm Advisory" 
                description="Expert agronomists to help optimize your crop yield and quality"
                icon={Brain}
                buttonText="Consult Experts"
                onClick={() => handleServiceClick("advisory")}
                className="border border-gray-200 hover:border-green-200"
                iconClassName="bg-green-100 text-green-600"
                buttonClassName="bg-green-600 hover:bg-green-700"
              />
            </>
          )}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-500 flex items-center justify-center">
            <Leaf className="h-4 w-4 text-green-500 mr-2" />
            Over 2,000 service providers across India
          </p>
        </div>
      </div>
    </section>
  );
}