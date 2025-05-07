import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import Image from "next/image";

export interface TestimonialProps {
  quote: string;
  name: string;
  title: string;
  image: string;
  rating?: number;
}

export default function TestimonialCard({
  quote,
  name,
  title,
  image,
  rating = 5,
}: TestimonialProps) {
  return (
    <Card className="border-none shadow-lg hover:shadow-xl transition-all bg-white h-full">
      <CardContent className="p-8">
        {rating > 0 && (
          <div className="flex items-center mb-6">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                aria-hidden="true"
                className={`h-5 w-5 ${
                  star <= rating
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
        )}
        <p className="text-gray-700 italic mb-8">{quote}</p>
        <div className="flex items-center mt-auto">
          <div className="mr-4">
            <Image
              src={image || "/placeholder.svg"}
              alt={name}
              width={60}
              height={60}
              className="rounded-full border-2 border-gray-100"
            />
          </div>
          <div>
            <h4 className="text-gray-900">{name}</h4>
            <p className="text-gray-600">{title}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
