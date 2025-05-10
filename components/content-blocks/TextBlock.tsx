export interface TextBlockProps {
	content: string;
}

export default function TextBlock({ content }: TextBlockProps) {
	return (
		<section className="text-block py-8">
			{" "}
			{/* Changed class for clarity if needed */}
			<div className="container mx-auto">
				{/* In future, this might use a Markdown renderer or more complex HTML */}
				<p>{content}</p>
			</div>
		</section>
	);
}
