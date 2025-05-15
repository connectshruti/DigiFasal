import React from 'react';
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Service, User } from "../types";
import { Helmet } from "react-helmet";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Skeleton } from "../components/ui/skeleton";
import { Badge } from "../components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Filter, Search, X, Truck, Tractor, Brain, Info, MapPin, Calendar, Star } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../components/ui/sheet";

export default function Services() {
  const [searchQuery, setSearchQuery] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [location, setLocation] = useState("");
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isServiceDialogOpen, setIsServiceDialogOpen] = useState(false);

  const { toast } = useToast();
  const { data: services, isLoading: isLoadingServices } = useQuery<Service[]>({
    queryKey: ["/api/services"],
    queryFn: async () => {
      const res = await fetch("/api/services");
      if (!res.ok) throw new Error("Failed to fetch services");
      return res.json();
    },
    staleTime: 60000,
  });
  
  const { data: providers, isLoading: isLoadingProviders } = useQuery<User[]>({
    queryKey: ["/api/users/role/service_provider"],
    queryFn: async () => {
      const res = await fetch("/api/users/role/service_provider");
      if (!res.ok) throw new Error("Failed to fetch providers");
      return res.json();
    },
    staleTime: 300000,
  });
  const filteredServices = services?.filter((s) => {
    const q = searchQuery.toLowerCase();
    return (
      (!searchQuery ||
        s.title.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q)) &&
      (!serviceType || s.serviceType === serviceType) &&
      (!location ||
        (s.location &&
          s.location.toLowerCase().includes(location.toLowerCase())))
    );
  });

  const clearFilters = () => {
    setSearchQuery("");
    setServiceType("");
    setLocation("");
  };

  const handleContactProvider = () =>
    toast({
      title: "Contact Request Sent",
      description: "The service provider will contact you soon.",
    });

  const getServiceIcon = (type: string) => {
    switch (type) {
      case "transportation":
        return <Truck className="h-6 w-6" />;
      case "equipment_rental":
        return <Tractor className="h-6 w-6" />;
      case "advisory":
        return <Brain className="h-6 w-6" />;
      default:
        return <Info className="h-6 w-6" />;
    }
  };

  const getServiceTypeLabel = (type: string) => {
    switch (type) {
      case "transportation":
        return "Transportation";
      case "equipment_rental":
        return "Equipment Rental";
      case "advisory":
        return "Advisory Services";
      default:
        return type;
    }
  };

  const getProviderForService = (s: Service) =>
    providers?.find((p) => p.id === s.providerId);

  const openServiceDetails = (s: Service) => {
    setSelectedService(s);
    setIsServiceDialogOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>Agricultural Services - Digi Fasal</title>
        <meta
          name="description"
          content="Find agricultural services including transportation, equipment rental, and advisory services."
        />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold mb-2">
            Agricultural Services
          </h1>
          <p className="text-neutral-dark">
            Connect with service providers offering logistics, equipment
            rentals, and agricultural consulting services.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Mobile Filters Sheet */}
          <div className="block lg:hidden w-full mb-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filter Services</SheetTitle>
                </SheetHeader>
                <div className="py-4 space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">
                      Service Type
                    </label>
                    <Select value={serviceType} onValueChange={setServiceType}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Service Types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Service Types</SelectItem>
                        <SelectItem value="transportation">Transportation</SelectItem>
                        <SelectItem value="equipment_rental">Equipment Rental</SelectItem>
                        <SelectItem value="advisory">Advisory Services</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Location</label>
                    <Input
                      placeholder="Enter location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" className="w-full" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-lg p-4 sticky top-4 card-shadow">
              <h2 className="font-heading font-semibold text-lg mb-4">Filters</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Service Type</label>
                  <Select value={serviceType} onValueChange={setServiceType}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Service Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Service Types</SelectItem>
                      <SelectItem value="transportation">Transportation</SelectItem>
                      <SelectItem value="equipment_rental">Equipment Rental</SelectItem>
                      <SelectItem value="advisory">Advisory Services</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Location</label>
                  <Input
                    placeholder="Enter location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                <Button variant="outline" className="w-full" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-medium h-4 w-4" />
              <Input
                type="text"
                placeholder="Search services..."
                className="pl-10 pr-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-medium"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Active Filters Display */}
            {(serviceType || location) && (
              <div className="flex flex-wrap gap-2 mb-4 text-sm">
                <div className="font-medium py-1">Active filters:</div>
                {serviceType && (
                  <div className="flex items-center bg-neutral-100 rounded-full px-3 py-1">
                    Service: {getServiceTypeLabel(serviceType)}
                    <button className="ml-2" onClick={() => setServiceType("")}>
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )}
                {location && (
                  <div className="flex items-center bg-neutral-100 rounded-full px-3 py-1">
                    Location: {location}
                    <button className="ml-2" onClick={() => setLocation("")}>
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )}
                <button className="text-primary hover:underline" onClick={clearFilters}>
                  Clear all
                </button>
              </div>
            )}

            {/* Service List or Loading State */}
            {(isLoadingServices || isLoadingProviders) ? (
              <div className="grid gap-6">
                {Array(3).fill(0).map((_, i) => (
                  <Card key={i}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center">
                        <Skeleton className="h-10 w-10 mr-4 rounded-full" />
                        <div>
                          <Skeleton className="h-5 w-40 mb-1" />
                          <Skeleton className="h-4 w-24" />
                        </div>
                        <Skeleton className="h-6 w-24 ml-auto" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-3/4" />
                    </CardContent>
                    <CardFooter>
                      <Skeleton className="h-10 w-32 mr-2" />
                      <Skeleton className="h-10 w-32" />
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : filteredServices?.length ? (
              <div className="grid gap-6">
                {filteredServices.map((s) => {
                  const provider = getProviderForService(s);
                  return (
                    <Card key={s.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                          <div className="flex items-center">
                            <div className="bg-primary/10 p-2 rounded-full mr-3">
                              {getServiceIcon(s.serviceType)}
                            </div>
                            <div>
                              <CardTitle className="text-xl">{s.title}</CardTitle>
                              <CardDescription className="flex items-center">
                                <span>{provider?.fullName}</span>
                                {s.rating && (
                                  <div className="flex items-center ml-2">
                                    <Star className="h-3 w-3 text-secondary fill-secondary" />
                                    <span className="text-xs font-medium ml-1">{s.rating}</span>
                                  </div>
                                )}
                              </CardDescription>
                            </div>
                          </div>
                          <Badge className="ml-auto">{getServiceTypeLabel(s.serviceType)}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-neutral-dark mb-3">{s.description}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-neutral-medium">
                          {s.location && (
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              <span>{s.location}</span>
                            </div>
                          )}
                          {s.availability && (
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              <span>{s.availability}</span>
                            </div>
                          )}
                          {s.price && (
                            <div className="font-semibold text-primary">
                              ₹{s.price}
                              {s.pricingUnit && (
                                <span className="font-normal text-neutral-medium">
                                  {" "}{s.pricingUnit}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </CardContent>
                      <CardFooter className="flex flex-wrap gap-2">
                        <Button variant="outline" onClick={() => openServiceDetails(s)}>
                          View Details
                        </Button>
                        <Button className="bg-primary text-white" onClick={handleContactProvider}>
                          Contact Provider
                        </Button>
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white rounded-lg p-8 text-center card-shadow">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-xl font-heading font-semibold mb-2">No Services Found</h3>
                <p className="text-neutral-dark mb-4">
                  We couldn't find any services matching your search criteria.
                </p>
                <Button variant="outline" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
