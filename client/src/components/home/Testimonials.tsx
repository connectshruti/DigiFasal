import React from 'react';
import { TestimonialCard } from "../ui/testimonial-card";
import { useQuery } from "@tanstack/react-query";
import { Testimonial, TestimonialWithUser, User } from "../../types";
import { Skeleton } from "../ui/skeleton";
import { Leaf } from "lucide-react";

export default function Testimonials() {
  const { data: testimonials, isLoading: isLoadingTestimonials } = useQuery<Testimonial[]>({
    queryKey: ['/api/testimonials'],
    staleTime: 60000,
  });
  
  const { data: users, isLoading: isLoadingUsers } = useQuery<User[]>({
    queryKey: ['/api/users/role/all'],
    staleTime: 300000,
  });
  
  // Combine testimonials with user data
  const testimonialWithUsers: TestimonialWithUser[] = testimonials
    ? testimonials.map(testimonial => ({
        ...testimonial,
        user: users?.find(user => user.id === testimonial.userId)
      }))
    : [];
  
  const isLoading = isLoadingTestimonials || isLoadingUsers;
  
  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-gray-800 mb-3">
            Voices From Our <span className="text-green-600">Farming Community</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Real stories from farmers and buyers who've transformed their harvests
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            Array(3).fill(0).map((_, index) => (
              <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center mb-5">
                  <Skeleton className="h-14 w-14 rounded-full mr-4" />
                  <div>
                    <Skeleton className="h-5 w-32 mb-2" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
                <Skeleton className="h-4 w-full mb-3" />
                <Skeleton className="h-4 w-full mb-3" />
                <Skeleton className="h-4 w-5/6 mb-6" />
                <div className="flex justify-center">
                  {Array(5).fill(0).map((_, i) => (
                    <Skeleton key={i} className="h-5 w-5 mx-1 rounded-full" />
                  ))}
                </div>
              </div>
            ))
          ) : testimonialWithUsers.length > 0 ? (
            testimonialWithUsers.map((testimonial) => (
              <TestimonialCard 
                key={testimonial.id} 
                testimonial={testimonial}
                className="border border-gray-200 hover:border-green-200"
                avatarClassName="border-2 border-green-100"
                ratingClassName="text-green-600"
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="mx-auto w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-4">
                <Leaf className="w-10 h-10 text-green-400" />
              </div>
              <h3 className="text-xl font-medium text-gray-700 mb-2">No testimonials yet</h3>
              <p className="text-gray-500">Be the first to share your experience</p>
            </div>
          )}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-500 flex items-center justify-center">
            <Leaf className="h-4 w-4 text-green-500 mr-2" />
            Join 10,000+ satisfied users growing with us
          </p>
        </div>
      </div>
    </section>
  );
}