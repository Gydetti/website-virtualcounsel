import { type VariantProps, cva } from "class-variance-authority";
import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
	"inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
	{
		variants: {
			variant: {
				default:
					"border-transparent bg-[rgba(var(--primary-rgb),0.1)] text-primary hover:bg-[rgba(var(--primary-rgb),0.2)]",
				dark: "border-transparent bg-[rgba(var(--primary-rgb),0.8)] text-primary hover:bg-[rgba(var(--primary-rgb),0.7)]",
				secondary:
					"border-transparent bg-[rgba(var(--secondary-rgb),0.1)] text-secondary hover:bg-[rgba(var(--secondary-rgb),0.2)]",
				accent:
					"border-transparent bg-[rgba(var(--accent-rgb),0.1)] text-accent hover:bg-[rgba(var(--accent-rgb),0.2)]",
				destructive:
					"border-transparent bg-destructive text-destructive-foreground hover:bg-destructive-80",
				outline: "text-foreground",
				light: "border-transparent bg-blue-100 text-primary hover:bg-blue-200",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

export interface BadgeProps
	extends HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
	return (
		<div className={cn(badgeVariants({ variant }), className)} {...props} />
	);
}

export { Badge, badgeVariants };
