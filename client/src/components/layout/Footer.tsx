import { Link } from "wouter";
import { Leaf, Facebook, Twitter, Instagram, Youtube, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div>
            <div className="flex items-center mb-5">
              <div className="bg-green-100 p-2 rounded-lg mr-3">
                <Leaf className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-gray-800">Digi Fasal</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Empowering farmers through direct digital connections with buyers and service providers.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-green-600 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-green-600 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-green-600 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-green-600 transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-serif font-semibold text-gray-800 mb-5">Explore</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-600 hover:text-green-600 transition-colors flex items-center">
                  <Leaf className="h-3 w-3 mr-2 text-green-500" />
                  Home
                </Link>
              </li>
              <li>
                <Link href="/marketplace" className="text-gray-600 hover:text-green-600 transition-colors flex items-center">
                  <Leaf className="h-3 w-3 mr-2 text-green-500" />
                  Marketplace
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-600 hover:text-green-600 transition-colors flex items-center">
                  <Leaf className="h-3 w-3 mr-2 text-green-500" />
                  Services
                </Link>
              </li>
              <li>
                <Link href="/#insights" className="text-gray-600 hover:text-green-600 transition-colors flex items-center">
                  <Leaf className="h-3 w-3 mr-2 text-green-500" />
                  Market Insights
                </Link>
              </li>
              <li>
                <Link href="/#about" className="text-gray-600 hover:text-green-600 transition-colors flex items-center">
                  <Leaf className="h-3 w-3 mr-2 text-green-500" />
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          
          {/* User Resources */}
          <div>
            <h4 className="font-serif font-semibold text-gray-800 mb-5">Resources</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/register?role=farmer" className="text-gray-600 hover:text-green-600 transition-colors flex items-center">
                  <Leaf className="h-3 w-3 mr-2 text-green-500" />
                  Farmer Registration
                </Link>
              </li>
              <li>
                <Link href="/register?role=buyer" className="text-gray-600 hover:text-green-600 transition-colors flex items-center">
                  <Leaf className="h-3 w-3 mr-2 text-green-500" />
                  Buyer Registration
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-gray-600 hover:text-green-600 transition-colors flex items-center">
                  <Leaf className="h-3 w-3 mr-2 text-green-500" />
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="text-gray-600 hover:text-green-600 transition-colors flex items-center">
                  <Leaf className="h-3 w-3 mr-2 text-green-500" />
                  FAQs
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="font-serif font-semibold text-gray-800 mb-5">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="bg-green-100 p-1.5 rounded-full mr-3 mt-0.5">
                  <MapPin className="h-4 w-4 text-green-600" />
                </div>
                <span className="text-gray-600">123 Agritech Park, Sector 15, Gurugram, Haryana 122001</span>
              </li>
              <li className="flex items-center">
                <div className="bg-green-100 p-1.5 rounded-full mr-3">
                  <Phone className="h-4 w-4 text-green-600" />
                </div>
                <span className="text-gray-600">+91 98765 43210</span>
              </li>
              <li className="flex items-center">
                <div className="bg-green-100 p-1.5 rounded-full mr-3">
                  <Mail className="h-4 w-4 text-green-600" />
                </div>
                <span className="text-gray-600">support@digifasal.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-200 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Digi Fasal. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-gray-500 hover:text-green-600 text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-500 hover:text-green-600 text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-gray-500 hover:text-green-600 text-sm transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}