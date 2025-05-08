import React from "react";
import { Helmet } from "react-helmet";
import { Leaf, DownloadCloud, Database, Code, Server, Package } from "lucide-react";

export default function Download() {
  const serverPath = import.meta.env.VITE_SERVER_PATH || "";
  const downloadUrl = `${serverPath}/digi-fasal-project.tar.gz`;
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Helmet>
        <title>Download Digi Fasal | Agricultural Marketplace</title>
        <meta name="description" content="Download the complete Digi Fasal agricultural marketplace project for local installation" />
      </Helmet>
      
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Header with nature theme */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Leaf className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-green-800 mb-3">
            Digi Fasal Project
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Download the complete agricultural marketplace solution to empower local farming communities
          </p>
        </div>
        
        {/* Download Card */}
        <div className="bg-white border border-green-100 rounded-xl p-8 mb-12 text-center shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-center mb-4">
            <DownloadCloud className="h-12 w-12 text-green-600" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Get Started Now</h2>
          <p className="mb-6 text-gray-600">
            The complete package includes all source code, documentation, and setup scripts to run your own agricultural marketplace.
          </p>
          
          <a 
            href={downloadUrl}
            download="digi-fasal-project.tar.gz"
            className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 text-lg shadow-md hover:shadow-lg"
          >
            <DownloadCloud className="h-5 w-5" />
            Download Project (tar.gz)
          </a>
        </div>
        
        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Package Contents */}
          <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <Package className="h-6 w-6 text-green-600" />
              <h3 className="text-xl font-semibold text-gray-800">Package Contents</h3>
            </div>
            <ul className="space-y-3 text-gray-700">
              {[
                "Complete source code (frontend + backend)",
                "Database schema and models",
                "Setup and initialization scripts",
                "Comprehensive documentation",
                "Deployment guidelines"
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* System Requirements */}
          <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <Server className="h-6 w-6 text-green-600" />
              <h3 className="text-xl font-semibold text-gray-800">System Requirements</h3>
            </div>
            <ul className="space-y-3 text-gray-700">
              {[
                "Node.js v18+ and npm",
                "PostgreSQL database",
                "Modern web browser",
                "1GB+ RAM",
                "Internet connection (setup)"
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Installation Guide */}
        <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <Code className="h-6 w-6 text-green-600" />
            <h3 className="text-xl font-semibold text-gray-800">Quick Setup Guide</h3>
          </div>
          <div className="space-y-4 text-gray-700">
            {[
              {
                command: "tar -xzf digi-fasal-project.tar.gz",
                description: "Extract the downloaded package"
              },
              {
                command: "cd digi-fasal-package",
                description: "Navigate to project directory"
              },
              {
                command: "npm install",
                description: "Install dependencies"
              },
              {
                command: "npm run db:push",
                description: "Setup database"
              },
              {
                command: "npm run dev",
                description: "Start development server"
              }
            ].map((step, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 text-green-800 flex items-center justify-center">
                  {index + 1}
                </div>
                <div>
                  <code className="block bg-gray-50 px-3 py-2 rounded-md text-sm font-mono mb-1">
                    {step.command}
                  </code>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-gray-600">
            Detailed instructions available in the <code className="bg-gray-50 px-2 py-1 rounded text-sm">README.md</code> file.
          </p>
        </div>
      </div>
    </div>
  );
}