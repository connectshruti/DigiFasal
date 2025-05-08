import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { LucideIcon } from "lucide-react";

interface RoleCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  imageSrc: string;
  role: string;
}

export function RoleCard({ title, description, icon: Icon, imageSrc, role }: RoleCardProps) {
  return (
    <Card className="bg-white rounded-xl border border-[#f0f0f0] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 overflow-hidden group">
      <div className="h-56 overflow-hidden">
        <img 
          src={imageSrc} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
        />
      </div>
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <div className="p-2 mr-3 rounded-lg bg-[#f0f7f4]">
            <Icon className="h-5 w-5 text-[#4a7c59]" />
          </div>
          <h3 className="text-xl font-medium text-[#1f2937]">{title}</h3>
        </div>
        <p className="text-[#6b7280] mb-6 leading-relaxed">{description}</p>
        <Link href={`/register?role=${role}`}>
          <Button className="w-full bg-[#4a7c59] hover:bg-[#3a6a4a] text-white py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-md">
            Register as {title.split(' ').pop()}
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}