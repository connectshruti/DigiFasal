import { Button } from "@/components/ui/button";
import { Apple, Smartphone } from "lucide-react";
import { FaGooglePlay } from "react-icons/fa";

export default function DownloadApp() {
  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Content Section */}
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4 text-gray-800">
              Farm Management <span className="text-green-600">On The Go</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Access real-time market prices, connect with buyers, and manage your farm operations 
              from anywhere. Available on both Android and iOS.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium shadow-md transition-all duration-200 hover:shadow-lg flex items-center gap-2"
              >
                <FaGooglePlay className="h-5 w-5" />
                Google Play
              </Button>
              <Button 
                variant="outline"
                className="bg-white text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-lg font-medium shadow-sm transition-all duration-200 hover:shadow-md border border-gray-300 flex items-center gap-2"
              >
                <Apple className="h-5 w-5" />
                App Store
              </Button>
            </div>
          </div>

          {/* Phone Mockup */}
          <div className="lg:w-1/2 flex justify-center">
            <div className="relative w-64 h-96">
              <div className="absolute inset-0 bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-200">
                <div className="h-full w-full flex flex-col items-center justify-center bg-gradient-to-b from-green-50 to-white p-6">
                  <div className="relative mb-6">
                    <div className="absolute -inset-2 bg-green-100 rounded-full opacity-60 blur-sm"></div>
                    <Smartphone className="relative text-green-600 h-12 w-12" />
                  </div>
                  <h3 className="text-xl font-serif font-semibold text-gray-800">Digi Fasal</h3>
                  <p className="text-sm text-gray-500 mt-2 text-center">
                    Your complete farming companion
                  </p>
                  <div className="mt-8 w-full">
                    <div className="h-2 bg-gray-200 rounded-full w-3/4 mx-auto"></div>
                    <div className="h-2 bg-gray-200 rounded-full w-1/2 mx-auto mt-2"></div>
                  </div>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-green-100 rounded-full opacity-20"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}