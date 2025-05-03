"use client";

import type React from "react";

import { useEffect } from "react";

interface DataLayerProviderProps {
	children: React.ReactNode;
}

export default function DataLayerProvider({
	children,
}: DataLayerProviderProps) {
	useEffect(() => {
		// Initialize dataLayer
		window.dataLayer = window.dataLayer || [];

		// Push initial page data
		window.dataLayer.push({
			page: {
				path: window.location.pathname,
				title: document.title,
				referrer: document.referrer,
			},
			user: {
				// Add any user data here if available
				type: "visitor",
			},
			site: {
				language: navigator.language,
				viewport: {
					width: window.innerWidth,
					height: window.innerHeight,
				},
			},
		});
	}, []);

	return <>{children}</>;
}
