"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import type { ReactEventHandler } from "react";

interface OptimizedImageProps {
	src: string;
	alt: string;
	width?: number;
	height?: number;
	fill?: boolean;
	sizes?: string;
	priority?: boolean;
	placeholder?: 'blur' | 'empty';
	blurDataURL?: string;
	className?: string;
	objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
	onLoad?: () => void;
	onError?: ReactEventHandler<HTMLImageElement>;
}

export default function OptimizedImage({
	src,
	alt,
	width,
	height,
	fill = false,
	sizes,
	priority = false,
	placeholder = 'empty',
	blurDataURL,
	className,
	objectFit = "cover",
	onLoad,
	onError,
}: OptimizedImageProps) {
	// Initialize isLoading based on priority to skip skeleton for priority images
	const [isLoading, setIsLoading] = useState(!priority);
	const [hasError, setHasError] = useState(false);

	// Handle image load
	const handleImageLoad = () => {
		setIsLoading(false);
		if (onLoad) onLoad();
	};

	// Handle image error and fallback to default placeholder
	const handleImageError: ReactEventHandler<HTMLImageElement> = (event) => {
		setHasError(true);
		setIsLoading(false);
		if (onError) onError(event);
	};

	// Default sizes if not provided
	const defaultSizes = fill
		? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
		: undefined;

	return (
		<div className={cn("relative overflow-hidden", className)}>
			{isLoading && (
				<div
					className="absolute inset-0 bg-gray-200 animate-pulse"
					style={{ zIndex: 1 }}
					aria-hidden="true"
				/>
			)}
			<Image
				src={hasError ? "/placeholder.svg" : src || "/placeholder.svg"}
				alt={alt}
				width={fill ? undefined : width}
				height={fill ? undefined : height}
				fill={fill}
				sizes={sizes || defaultSizes}
				priority={priority}
				placeholder={placeholder}
				blurDataURL={blurDataURL}
				onLoad={handleImageLoad}
				onError={handleImageError}
				className={cn(
					"transition-opacity duration-300",
					isLoading ? "opacity-0" : "opacity-100",
					objectFit === "cover" && "object-cover",
					objectFit === "contain" && "object-contain",
					objectFit === "fill" && "object-fill",
					objectFit === "none" && "object-none",
					objectFit === "scale-down" && "object-scale-down",
				)}
			/>
		</div>
	);
}
