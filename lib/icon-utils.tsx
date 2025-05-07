import { BarChart2, Code, Globe, Megaphone, Users, Zap } from "lucide-react";
import type { ComponentType, SVGProps } from "react";

export const iconComponents: Record<
	string,
	ComponentType<SVGProps<SVGSVGElement>>
> = {
	Globe,
	BarChart2,
	Zap,
	Users,
	Code,
	Megaphone,
};
