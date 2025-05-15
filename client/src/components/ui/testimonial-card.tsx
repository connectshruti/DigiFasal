import React from 'react';
import { Card, CardContent } from "../ui/card";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { TestimonialWithUser } from "../../types";

interface TestimonialCardProps {
  className:string;
  avatarClassName:string;
  ratingClassName:string;
  testimonial: TestimonialWithUser;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const initials = testimonial.user?.fullName
    ? testimonial.user.fullName
        .split(' ')
        .map(name => name[0])
        .join('')
    : 'U';
  
  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star 
          key={i}
          className={`h-4 w-4 ${i < rating ? 'text-green-500 fill-green-300' : 'text-gray-200'}`}
        />
      ));
  };
  
  return (
    <Card className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-0">
        <div className="flex items-center gap-4 mb-4">
          <Avatar className="h-12 w-12 border-2 border-green-50">
            <AvatarImage src={testimonial.user?.profileImage} alt={testimonial.user?.fullName} />
            <AvatarFallback className="bg-green-50 text-green-600 font-medium">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium text-gray-800">{testimonial.user?.fullName}</h3>
            <p className="text-sm text-gray-500">
              {testimonial.user?.role === 'farmer' && 'Farmer'}
              {testimonial.user?.role === 'buyer' && 'Buyer'}
              {testimonial.user?.role === 'service_provider' && 'Service Provider'}
              {testimonial.user?.city && ` • ${testimonial.user.city}`}
            </p>
          </div>
        </div>
        <p className="text-gray-700 mb-4 leading-relaxed">"{testimonial.content}"</p>
        <div className="flex items-center gap-1">
          {renderStars(testimonial.rating)}
          <span className="text-xs text-gray-400 ml-1">{testimonial.rating}.0</span>
        </div>
      </CardContent>
    </Card>
  );
}