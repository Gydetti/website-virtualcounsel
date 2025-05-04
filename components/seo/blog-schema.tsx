import type { BlogPosting, WithContext } from "schema-dts";

interface BlogSchemaProps {
	title: string;
	description: string;
	datePublished: string;
	dateModified?: string;
	authorName: string;
	authorUrl?: string;
	imageUrl: string;
	url: string;
	publisherName?: string;
	publisherLogo?: string;
}

export default function BlogSchema({
	title,
	description,
	datePublished,
	dateModified,
	authorName,
	authorUrl,
	imageUrl,
	url,
	publisherName = "Your Business Name",
	publisherLogo = "https://your-domain.com/logo.png",
}: BlogSchemaProps) {
	const blogSchema: WithContext<BlogPosting> = {
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		headline: title,
		description: description,
		image: imageUrl,
		datePublished: datePublished,
		dateModified: dateModified || datePublished,
		author: {
			"@type": "Person",
			name: authorName,
			url: authorUrl,
		},
		publisher: {
			"@type": "Organization",
			name: publisherName,
			logo: {
				"@type": "ImageObject",
				url: publisherLogo,
			},
		},
		mainEntityOfPage: {
			"@type": "WebPage",
			"@id": url,
		},
	};

	return (
		<script type="application/ld+json" key="blog-schema">
			{JSON.stringify(blogSchema)}
		</script>
	);
}
