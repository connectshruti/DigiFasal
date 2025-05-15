import React from 'react';
import { Card, CardContent } from "../components/ui/card";
import { AlertCircle, Leaf, Home } from "lucide-react";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-green-50 to-white">
      <Helmet>
        <title>Page Not Found | Digi Fasal</title>
        <meta name="description" content="The page you're looking for doesn't exist" />
      </Helmet>

      <Card className="w-full max-w-md mx-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="pt-8 pb-6">
          <div className="flex flex-col items-center text-center">
            {/* Nature-themed error icon */}
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-red-100 rounded-full opacity-80 animate-pulse"></div>
              <AlertCircle className="relative h-12 w-12 text-red-600" />
              <Leaf className="absolute -bottom-2 -right-2 h-6 w-6 text-green-600" />
            </div>

            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Oops! Page Not Found
            </h1>
            <p className="text-gray-600 mb-6">
              The page you're looking for doesn't exist or has been moved.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <Button 
                asChild
                className="w-full bg-green-600 hover:bg-green-700 text-white shadow-sm"
              >
                <Link to="/">
                  <Home className="h-4 w-4 mr-2" />
                  Return Home
                </Link>
              </Button>
              <Button 
                variant="outline" 
                className="w-full border-gray-300 hover:bg-green-50"
                asChild
              >
                <Link to="/contact">
                  Report Issue
                </Link>
              </Button>
            </div>

            <p className="mt-6 text-sm text-gray-500">
              Error code: 404 | Digi Fasal Agricultural Platform
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}