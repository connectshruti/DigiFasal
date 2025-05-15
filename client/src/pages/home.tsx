import React from 'react';
import HeroSection from "../components/home/HeroSection";
import RoleSelection from "../components/home/RoleSelection";
import FeaturedProducts from "../components/home/FeaturedProducts";
import ServicesSection from "../components/home/ServicesSection";
import MarketInsights from "../components/home/MarketInsights";
import HowItWorks from "../components/home/HowItWorks";
import Testimonials from "../components/home/Testimonials";
import DownloadApp from "../components/home/DownloadApp";
import { Helmet } from "react-helmet";
import { Leaf, Sprout, Wheat, Truck, BarChart, Smartphone } from "lucide-react";

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-green-50 to-white">
      <Helmet>
        <title>Digi Fasal | Agricultural Marketplace</title>
        <meta 
          name="description" 
          content="Connecting farmers, buyers, and service providers through India's premier digital agriculture marketplace" 
        />
        <meta 
          name="keywords" 
          content="agriculture, farmers, marketplace, crops, digi fasal, farming, India" 
        />
      </Helmet>

      {/* Hero Section with nature background */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-green-600 opacity-10 z-0"></div>
        <HeroSection />
      </section>

      {/* Role Selection with icon accents */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-center mb-12">
            <div className="bg-green-100 p-3 rounded-full">
              <Sprout className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <RoleSelection />
        </div>
      </section>

      {/* Featured Products with wheat icon */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-center mb-12">
            <div className="bg-white p-3 rounded-full shadow-sm">
              <Wheat className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <FeaturedProducts />
        </div>
      </section>

      {/* Services Section with truck icon */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-center mb-12">
            <div className="bg-green-100 p-3 rounded-full">
              <Truck className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <ServicesSection />
        </div>
      </section>

      {/* Market Insights with chart icon */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-center mb-12">
            <div className="bg-white p-3 rounded-full shadow-sm">
              <BarChart className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <MarketInsights />
        </div>
      </section>

      {/* How It Works with leaf icon */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-center mb-12">
            <div className="bg-green-100 p-3 rounded-full">
              <Leaf className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <HowItWorks />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <Testimonials />
        </div>
      </section>

      {/* Download App with smartphone icon */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-center mb-12">
            <div className="bg-green-100 p-3 rounded-full">
              <Smartphone className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <DownloadApp />
        </div>
      </section>
    </div>
  );
}