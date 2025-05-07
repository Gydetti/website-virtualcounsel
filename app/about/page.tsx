import { Section } from "@/components/layout/Section";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import LazySection from "@/components/ui/lazy-section";
import OptimizedImage from "@/components/ui/optimized-image";
import { defaultMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site.config";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";

export const metadata = defaultMetadata({
	title: `${siteConfig.site.name} | About`,
	description: "Learn more about our company, our mission, and our team.",
});

// Disable this page if not enabled in config
if (siteConfig.enabledPages && !siteConfig.enabledPages.includes("/about")) {
	notFound();
}

export default function AboutPage() {
	const teamMembers = [
		{
			name: "[TEAM_MEMBER_1_NAME]",
			role: "[TEAM_MEMBER_1_ROLE]",
			bio: "[TEAM_MEMBER_1_BIO: A brief description of this team member's background and expertise.]",
			image: "/placeholder.svg?height=300&width=300",
		},
		{
			name: "[TEAM_MEMBER_2_NAME]",
			role: "[TEAM_MEMBER_2_ROLE]",
			bio: "[TEAM_MEMBER_2_BIO: A brief description of this team member's background and expertise.]",
			image: "/placeholder.svg?height=300&width=300",
		},
		{
			name: "[TEAM_MEMBER_3_NAME]",
			role: "[TEAM_MEMBER_3_ROLE]",
			bio: "[TEAM_MEMBER_3_BIO: A brief description of this team member's background and expertise.]",
			image: "/placeholder.svg?height=300&width=300",
		},
		{
			name: "[TEAM_MEMBER_4_NAME]",
			role: "[TEAM_MEMBER_4_ROLE]",
			bio: "[TEAM_MEMBER_4_BIO: A brief description of this team member's background and expertise.]",
			image: "/placeholder.svg?height=300&width=300",
		},
	];

	const values = [
		{
			title: "[VALUE_1_TITLE]",
			description:
				"[VALUE_1_DESCRIPTION: Explain this core value and why it matters to your business.]",
		},
		{
			title: "[VALUE_2_TITLE]",
			description:
				"[VALUE_2_DESCRIPTION: Explain this core value and why it matters to your business.]",
		},
		{
			title: "[VALUE_3_TITLE]",
			description:
				"[VALUE_3_DESCRIPTION: Explain this core value and why it matters to your business.]",
		},
		{
			title: "[VALUE_4_TITLE]",
			description:
				"[VALUE_4_DESCRIPTION: Explain this core value and why it matters to your business.]",
		},
	];

	return (
		<>
			{/* About Hero */}
			<section className="relative overflow-hidden bg-gradient-to-r from-blue-100 to-transparent">
				{/* Background patterns */}
				<div className="absolute inset-0 bg-grid-pattern opacity-10" />
				<div className="absolute top-20 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
				<div className="absolute bottom-10 left-10 w-72 h-72 bg-blue-100/20 rounded-full blur-3xl" />

				<Section className="relative z-10">
					<div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
						<LazySection animation="slide-right" className="relative z-10">
							<Badge className="mb-4 bg-blue-100 text-primary hover:bg-blue-200">
								[ABOUT_PAGE_BADGE]
							</Badge>
							<h1
								id="about-page-heading"
								className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance break-words break-all whitespace-normal max-w-full mb-6"
							>
								[ABOUT_PAGE_TITLE]
							</h1>
							<p className="text-gray-700 mb-6">
								[ABOUT_PAGE_DESCRIPTION_1: Introduce your company and its
								mission.]
							</p>
							<p className="text-gray-700">
								[ABOUT_PAGE_DESCRIPTION_2: Share your company's story and what
								makes it unique.]
							</p>
						</LazySection>

						<LazySection
							animation="slide-left"
							delay={0.15}
							className="transform md:translate-y-6 w-full max-w-[600px] ml-auto"
						>
							<AspectRatio
								ratio={6 / 5}
								className="overflow-hidden rounded-xl shadow-2xl relative"
							>
								<OptimizedImage
									src="/images/placeholders/placeholder-user.jpg"
									alt="About Our Company"
									fill
									sizes="(max-width: 600px) 100vw, 600px"
									className="absolute inset-0 object-cover"
								/>
							</AspectRatio>
						</LazySection>
					</div>
				</Section>
			</section>

			<LazySection>
				<section className="py-16 bg-white">
					<div className="container-wide">
						<div className="text-center mb-16">
							<Badge className="mb-4 bg-blue-100 text-primary hover:bg-blue-200">
								[OUR_STORY_BADGE]
							</Badge>
							<h2 className="text-3xl font-bold mb-6">[OUR_STORY_TITLE]</h2>
							<p className="text-gray-700 max-w-3xl mx-auto">
								[OUR_STORY_DESCRIPTION: A brief overview of your company's
								journey.]
							</p>
						</div>

						<div className="grid md:grid-cols-3 gap-8">
							<Card className="p-6 w-full break-all whitespace-normal">
								<h3 className="mb-4">[MILESTONE_1_TITLE]</h3>
								<p className="text-gray-600 mb-2">[MILESTONE_1_DATE]</p>
								<p>[MILESTONE_1_DESCRIPTION]</p>
							</Card>
							<Card className="p-6 w-full break-all whitespace-normal">
								<h3 className="mb-4">[MILESTONE_2_TITLE]</h3>
								<p className="text-gray-600 mb-2">[MILESTONE_2_DATE]</p>
								<p>[MILESTONE_2_DESCRIPTION]</p>
							</Card>
							<Card className="p-6 w-full break-all whitespace-normal">
								<h3 className="mb-4">[MILESTONE_3_TITLE]</h3>
								<p className="text-gray-600 mb-2">[MILESTONE_3_DATE]</p>
								<p>[MILESTONE_3_DESCRIPTION]</p>
							</Card>
						</div>
					</div>
				</section>
			</LazySection>

			<LazySection>
				<section className="py-16 bg-gray-50">
					<div className="container-wide">
						<div className="text-center mb-16">
							<Badge className="mb-4 bg-blue-100 text-primary hover:bg-blue-200">
								[OUR_VALUES_BADGE]
							</Badge>
							<h2 className="text-3xl font-bold mb-6">[OUR_VALUES_TITLE]</h2>
							<p className="text-gray-700 max-w-3xl mx-auto">
								[OUR_VALUES_DESCRIPTION: Explain why your values matter and how
								they guide your business.]
							</p>
						</div>

						<div className="grid md:grid-cols-2 gap-8">
							{values.map((value) => (
								<Card
									key={value.title}
									className="p-6 w-full break-all whitespace-normal"
								>
									<h3 className="text-xl font-bold mb-4">{value.title}</h3>
									<p className="text-gray-600">{value.description}</p>
								</Card>
							))}
						</div>
					</div>
				</section>
			</LazySection>

			<LazySection>
				<section className="py-16 bg-white">
					<div className="container-wide">
						<div className="text-center mb-16">
							<Badge className="mb-4 bg-blue-100 text-primary hover:bg-blue-200">
								[OUR_TEAM_BADGE]
							</Badge>
							<h2 className="text-3xl font-bold mb-6">[OUR_TEAM_TITLE]</h2>
							<p className="text-gray-700 max-w-3xl mx-auto">
								[OUR_TEAM_DESCRIPTION: Introduce your team and their collective
								expertise.]
							</p>
						</div>

						<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
							{teamMembers.map((member) => (
								<Card
									key={member.name}
									className="overflow-hidden w-full break-all whitespace-normal"
								>
									<div className="relative h-64 w-full">
										<Image
											src={member.image || "/placeholder.svg"}
											alt={member.name}
											fill
											className="object-cover"
										/>
									</div>
									<CardContent className="p-6">
										<h3 className="mb-1">{member.name}</h3>
										<p className="text-primary font-medium mb-4">
											{member.role}
										</p>
										<p className="text-gray-600">{member.bio}</p>
									</CardContent>
								</Card>
							))}
						</div>
					</div>
				</section>
			</LazySection>

			<section className="py-16 bg-primary text-white">
				<div className="container-wide text-center">
					<h2 className="text-3xl font-bold mb-6">[JOIN_OUR_TEAM_TITLE]</h2>
					<p className="text-xl mb-8 max-w-2xl mx-auto">
						[JOIN_OUR_TEAM_DESCRIPTION: Encourage potential team members to
						apply.]
					</p>
					<Button size="lg" className="bg-white text-primary hover:bg-gray-100">
						[JOIN_OUR_TEAM_BUTTON_TEXT]
						<ArrowRight className="ml-2 h-4 w-4" />
					</Button>
				</div>
			</section>
		</>
	);
}
