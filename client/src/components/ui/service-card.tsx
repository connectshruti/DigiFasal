import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  buttonText: string;
  onClick: () => void;
}

export function ServiceCard({ 
  title, 
  description, 
  icon: Icon, 
  buttonText, 
  onClick 
}: ServiceCardProps) {
  return (
    <Card className="bg-white rounded-xl border border-[#f0f0f0] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 group">
      <CardContent className="p-6">
        <div className="flex items-center justify-center mb-5">
          <div className="p-3 rounded-xl bg-[#f0f7f4] group-hover:bg-[#4a7c59] transition-colors duration-300">
            <Icon className="h-6 w-6 text-[#4a7c59] group-hover:text-white transition-colors duration-300" />
          </div>
        </div>
        <h3 className="text-xl font-medium text-[#1f2937] text-center mb-3">{title}</h3>
        <p className="text-[#6b7280] text-center mb-6 leading-relaxed">{description}</p>
        <Button 
          variant="outline" 
          className="w-full border-[#4a7c59] text-[#4a7c59] hover:bg-[#4a7c59] hover:text-white py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-md"
          onClick={onClick}
        >
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
}