import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  slug: string;
}

export default function BlogCard({
  title,
  excerpt,
  date,
  category,
  image,
  slug,
}: BlogCardProps) {
  return (
    <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-gray-200 shadow-sm">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardHeader className="pt-6">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline" className="text-xs font-normal">
            {category}
          </Badge>
          <span className="text-xs text-gray-500">{date}</span>
        </div>
        <CardTitle className="text-xl font-bold hover:text-primary transition-colors">
          <Link href={`/blog/${slug}`}>{title}</Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-body-base text-gray-600">
          {excerpt}
        </CardDescription>
      </CardContent>
      <CardFooter className="pt-0">
        <Button
          variant="link"
          className="p-0 h-auto text-primary group"
          asChild
        >
          <Link href={`/blog/${slug}`}>
            Read more
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
