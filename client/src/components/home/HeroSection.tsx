import React from 'react';
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="relative bg-white overflow-hidden">
      {/* Nature-inspired background with soft overlay */}
      <div 
        className="absolute inset-0 bg-green-50 opacity-90" 
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "overlay"
        }}
      ></div>
      
      {/* Subtle grid pattern for texture (optional) */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/subtle-white-feathers.png')]"></div>

      <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32 relative z-10">
        <div className="max-w-3xl backdrop-blur-sm bg-white/70 p-8 rounded-xl shadow-sm">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-800 leading-tight">
            Farm Fresh, <span className="text-green-600">Direct to You</span>
          </h1>
          <p className="text-lg md:text-xl mt-6 text-gray-600">
            India's most trusted marketplace connecting organic farmers with conscious buyers.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/register?role=farmer">
              <Button 
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-medium shadow-md transition-all duration-200 hover:shadow-lg border border-green-700/20"
              >
                Start Selling
              </Button>
            </Link>
            <Link to="/marketplace">
              <Button 
                size="lg"
                variant="outline"
                className="bg-white text-gray-700 hover:bg-gray-50 px-8 py-4 rounded-lg font-medium shadow-sm transition-all duration-200 hover:shadow-md border border-gray-300"
              >
                Browse Marketplace
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative leaf elements (optional) */}
      <div className="hidden lg:block absolute right-10 top-1/4 opacity-20">
        <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      </div>
    </section>
  );
}