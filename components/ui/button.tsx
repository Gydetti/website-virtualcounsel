"use client";
import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";
import "./spark-button.css";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 rounded-md text-base font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
	{
		variants: {
			variant: {
				default:
					"bg-primary text-primary-foreground shadow-lg hover:shadow-xl hover:bg-primary hover:brightness-110 transition-shadow duration-200",
				destructive:
					"bg-destructive text-destructive-foreground shadow-lg hover:shadow-xl transition-shadow duration-200 hover:bg-destructive/90",
				outline:
					"border border-input bg-background shadow-lg hover:shadow-xl transition-shadow duration-200 hover:bg-accent hover:text-accent-foreground",
				secondary:
					"bg-[var(--secondary)] text-secondary-foreground shadow-lg hover:shadow-xl transition-shadow duration-200 hover:bg-[rgba(var(--secondary-rgb),0.8)]",
				ghost: "hover:bg-accent hover:text-accent-foreground",
				link: "text-primary underline-offset-4 hover:underline",
				white:
					"bg-white text-gray-900 shadow-lg hover:bg-gray-100 transition-shadow duration-200",
				spark:
					"bg-primary text-primary-foreground shadow-lg hover:shadow-xl hover:bg-primary hover:brightness-110 transition-shadow duration-200",
			},
			size: {
				default: "px-4 py-2.5",
				sm: "px-3 py-2.5 rounded-md",
				lg: "px-8 py-2.5 rounded-md",
				icon: "h-10 w-10",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

export interface ButtonProps
	extends ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, children, ...props }, ref) => {
		const Comp = asChild ? Slot : "button";

		if (variant === "spark") {
			return (
				<Comp
					ref={ref}
					type={props.type || "button"}
					className={cn(
						buttonVariants({ variant: "default", size }),
						"spark-button",
						className,
					)}
					{...props}
				>
					<span className="spark__container">
						<span className="spark" />
					</span>
					<span className="backdrop" />
					<span className="text">{children}</span>
				</Comp>
			);
		}

		return (
			<Comp
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			>
				{children}
			</Comp>
		);
	},
);
Button.displayName = "Button";

export { Button, buttonVariants };
