import React from 'react';
import { Card, CardContent } from "../ui/card";
import { BarChart3, LineChart, TrendingUp, TrendingDown, Sprout } from "lucide-react";

export default function MarketInsights() {
  return (
    <section className="py-16 bg-white border-t border-gray-100" id="insights">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-gray-800 mb-3">
            Agricultural <span className="text-green-600">Market Intelligence</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Real-time pricing trends and demand forecasts to help you make informed decisions
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Price Trends Card */}
          <Card className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center mb-5">
                <div className="bg-green-100 p-2 rounded-lg mr-3">
                  <LineChart className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="text-xl font-serif font-semibold text-gray-800">Price Trends</h3>
              </div>
              
              <div className="h-64 w-full bg-green-50 rounded-lg flex items-center justify-center mb-6">
                <div className="text-center p-4">
                  <div className="inline-block bg-white p-3 rounded-full shadow-sm mb-3">
                    <LineChart className="h-8 w-8 text-green-600" />
                  </div>
                  <p className="text-gray-600">Live price visualization</p>
                  <p className="text-sm text-gray-400 mt-1">Powered by advanced analytics</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-2" />
                    Top Gainers
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex justify-between items-center">
                      <span className="text-gray-700">Tomatoes</span>
                      <span className="text-green-600 font-medium">+12.5%</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="text-gray-700">Onions</span>
                      <span className="text-green-600 font-medium">+8.3%</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="text-gray-700">Potatoes</span>
                      <span className="text-green-600 font-medium">+5.7%</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                    <TrendingDown className="h-4 w-4 text-red-500 mr-2" />
                    Top Losers
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex justify-between items-center">
                      <span className="text-gray-700">Apples</span>
                      <span className="text-red-500 font-medium">-4.2%</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="text-gray-700">Rice</span>
                      <span className="text-red-500 font-medium">-2.8%</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="text-gray-700">Wheat</span>
                      <span className="text-red-500 font-medium">-1.5%</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Demand Forecast Card */}
          <Card className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center mb-5">
                <div className="bg-green-100 p-2 rounded-lg mr-3">
                  <BarChart3 className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="text-xl font-serif font-semibold text-gray-800">Demand Forecast</h3>
              </div>
              
              <div className="h-64 w-full bg-green-50 rounded-lg flex items-center justify-center mb-6">
                <div className="text-center p-4">
                  <div className="inline-block bg-white p-3 rounded-full shadow-sm mb-3">
                    <BarChart3 className="h-8 w-8 text-green-600" />
                  </div>
                  <p className="text-gray-600">Demand prediction models</p>
                  <p className="text-sm text-gray-400 mt-1">Updated every 6 hours</p>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                  <Sprout className="h-4 w-4 text-green-500 mr-2" />
                  Seasonal Predictions
                </h4>
                <div className="space-y-3">
                  <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-gray-800">Summer Crops</span>
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">High Demand</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Expected 30% increase in demand for summer vegetables next month
                    </p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-gray-800">Rabi Crops</span>
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Stable</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Wheat and barley demand expected to remain steady this season
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}