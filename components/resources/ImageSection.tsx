import Image from "next/image";

export interface ImageSectionProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export default function ImageSection({ src, alt, width = 800, height = 600 }: ImageSectionProps) {
  return (
    <section className="image-section py-8">
      <div className="container mx-auto">
        <Image src={src} alt={alt} width={width} height={height} />
      </div>
    </section>
  );
} 