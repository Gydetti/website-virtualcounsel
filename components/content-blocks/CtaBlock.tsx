import { Button } from "@/components/ui/button";
import type { ctaBlockSchema } from "@/lib/schemas/contentBlocks.schema";
import Link from "next/link";
import type { FC } from "react";
import type { z } from "zod";

// Infer props type from the Zod schema
type CtaBlockProps = z.infer<typeof ctaBlockSchema>;

const CtaBlock: FC<CtaBlockProps> = ({ text, href, external, variant }) => {
	return (
		<Button asChild variant={variant === "primary" ? "default" : variant}>
			<Link href={href} {...(external ? { target: "_blank" } : {})}>
				{text}
			</Link>
		</Button>
	);
};

export default CtaBlock;
