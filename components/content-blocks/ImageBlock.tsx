import Image from "next/image";

export interface ImageBlockProps {
	src: string;
	alt: string;
	width?: number;
	height?: number;
	caption?: string;
}

export default function ImageBlock({
	src,
	alt,
	width = 800,
	height = 600,
	caption,
}: ImageBlockProps) {
	return (
		<section className="image-block py-8">
			<div className="container mx-auto text-center">
				<Image
					src={src}
					alt={alt}
					width={width}
					height={height}
					className="mx-auto"
				/>
				{caption && <p className="text-sm text-gray-600 mt-2">{caption}</p>}
			</div>
		</section>
	);
}
