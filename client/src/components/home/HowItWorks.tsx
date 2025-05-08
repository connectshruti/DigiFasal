import { Button } from "@/components/ui/button";
import { UserCheck, FileText, Handshake, Leaf } from "lucide-react";
import { Link } from "wouter";

export default function HowItWorks() {
  return (
    <section className="py-16 bg-white border-t border-gray-100" id="about">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-gray-800 mb-3">
            Our <span className="text-green-600">Farm-to-Table</span> Process
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            A transparent journey connecting farmers directly with conscious buyers
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Step 1 */}
          <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
            <div className="relative inline-block mb-5">
              <div className="absolute -inset-3 bg-green-100 rounded-full opacity-40 blur-sm"></div>
              <div className="relative bg-green-600 rounded-full h-16 w-16 flex items-center justify-center mx-auto">
                <UserCheck className="text-white h-7 w-7" />
              </div>
            </div>
            <h3 className="text-xl font-serif font-semibold text-gray-800 mb-3">Create Your Profile</h3>
            <p className="text-gray-600">
              Simple registration for farmers, buyers, and service providers with secure verification.
            </p>
            <div className="mt-4 text-green-600">
              <Leaf className="inline h-5 w-5" />
              <span className="text-sm ml-1">2-minute signup</span>
            </div>
          </div>
          
          {/* Step 2 */}
          <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
            <div className="relative inline-block mb-5">
              <div className="absolute -inset-3 bg-green-100 rounded-full opacity-40 blur-sm"></div>
              <div className="relative bg-green-600 rounded-full h-16 w-16 flex items-center justify-center mx-auto">
                <FileText className="text-white h-7 w-7" />
              </div>
            </div>
            <h3 className="text-xl font-serif font-semibold text-gray-800 mb-3">List or Discover</h3>
            <p className="text-gray-600">
              Farmers showcase their harvests while buyers find exactly what they need with smart filters.
            </p>
            <div className="mt-4 text-green-600">
              <Leaf className="inline h-5 w-5" />
              <span className="text-sm ml-1">Real-time updates</span>
            </div>
          </div>
          
          {/* Step 3 */}
          <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
            <div className="relative inline-block mb-5">
              <div className="absolute -inset-3 bg-green-100 rounded-full opacity-40 blur-sm"></div>
              <div className="relative bg-green-600 rounded-full h-16 w-16 flex items-center justify-center mx-auto">
                <Handshake className="text-white h-7 w-7" />
              </div>
            </div>
            <h3 className="text-xl font-serif font-semibold text-gray-800 mb-3">Secure Transactions</h3>
            <p className="text-gray-600">
              Chat directly, negotiate fair prices, and complete transactions with peace of mind.
            </p>
            <div className="mt-4 text-green-600">
              <Leaf className="inline h-5 w-5" />
              <span className="text-sm ml-1">End-to-end support</span>
            </div>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <Link href="/register">
            <Button 
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-medium shadow-md transition-all duration-200 hover:shadow-lg"
            >
              Join Our Farming Community
            </Button>
          </Link>
          <p className="mt-4 text-gray-500 text-sm">
            Trusted by 5,000+ farmers and buyers across India
          </p>
        </div>
      </div>
    </section>
  );
}