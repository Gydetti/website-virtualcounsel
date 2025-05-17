import Image from 'next/image'; // Use standard Next.js Image
import type { FC } from 'react';

interface ImageBlockProps {
  image: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  };
  caption?: string;
}

const ImageBlock: FC<ImageBlockProps> = ({ image, caption }) => {
  // Default width/height or fetch from image metadata if available
  const width = image.width || 800; // Example default
  const height = image.height || 600; // Example default

  return (
    <figure className="my-8 max-w-full mx-auto">
      <Image
        src={image.src}
        alt={image.alt}
        width={width}
        height={height}
        className="rounded-xl shadow-xl w-full h-auto" // Removed object-cover and aspect-[16/9]
        priority // Consider making this conditional if multiple images are on a page
      />
      {caption && (
        <figcaption className="mt-3 text-sm text-center text-foreground leading-snug">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

export default ImageBlock;
