"use client";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCookieConsent } from "@/hooks/use-cookie-consent";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";

export default function CookieConsentBanner() {
	const { consents, isConsentGiven, updateConsent, acceptAll, rejectAll } =
		useCookieConsent();
	const [showDetails, setShowDetails] = useState(false);
	const [localConsents, setLocalConsents] = useState(consents);

	if (isConsentGiven) {
		return null;
	}

	const handleToggle = (key: keyof typeof localConsents) => {
		if (key === "necessary") return; // Can't toggle necessary cookies
		setLocalConsents((prev) => ({ ...prev, [key]: !prev[key] }));
	};

	const handleSave = () => {
		updateConsent(localConsents);
	};

	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0, y: 50 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: 50 }}
				className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
			>
				<div className="mx-auto max-w-7xl">
					<div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
						{!showDetails ? (
							<div className="p-6">
								<div className="flex items-start justify-between mb-4">
									<h3 className="text-lg font-semibold">Cookie settings</h3>
									<Button
										variant="ghost"
										size="icon"
										className="h-8 w-8"
										onClick={() => setShowDetails(true)}
									>
										<X className="h-4 w-4" />
									</Button>
								</div>
								<p className="text-gray-600 mb-6">
									We use cookies to enhance your browsing experience, serve
									personalized ads or content, and analyze our traffic. By
									clicking "Accept all", you consent to our use of cookies.
								</p>
								<div className="flex flex-col sm:flex-row gap-3">
									<Button variant="outline" onClick={() => rejectAll()}>
										Reject all
									</Button>
									<Button
										variant="outline"
										onClick={() => setShowDetails(true)}
									>
										Customize
									</Button>
									<Button onClick={() => acceptAll()}>Accept all</Button>
								</div>
							</div>
						) : (
							<div className="p-6">
								<div className="flex items-start justify-between mb-4">
									<h3 className="text-lg font-semibold">Cookie preferences</h3>
									<Button
										variant="ghost"
										size="icon"
										className="h-8 w-8"
										onClick={() => setShowDetails(false)}
									>
										<X className="h-4 w-4" />
									</Button>
								</div>

								<Tabs defaultValue="essential" className="w-full">
									<TabsList className="grid grid-cols-4 mb-4">
										<TabsTrigger value="essential">Essential</TabsTrigger>
										<TabsTrigger value="analytics">Analytics</TabsTrigger>
										<TabsTrigger value="marketing">Marketing</TabsTrigger>
										<TabsTrigger value="preferences">Preferences</TabsTrigger>
									</TabsList>
									<TabsContent value="essential" className="space-y-4">
										<div className="flex items-center justify-between">
											<div>
												<h4 className="font-medium">Essential cookies</h4>
												<p className="text-sm text-gray-500">
													These cookies are necessary for the website to
													function and cannot be switched off.
												</p>
											</div>
											<Switch checked={true} disabled />
										</div>
									</TabsContent>
									<TabsContent value="analytics" className="space-y-4">
										<div className="flex items-center justify-between">
											<div>
												<h4 className="font-medium">Analytics cookies</h4>
												<p className="text-sm text-gray-500">
													These cookies allow us to count visits and traffic
													sources so we can measure and improve the performance
													of our site.
												</p>
											</div>
											<Switch
												checked={localConsents.analytics}
												onCheckedChange={() => handleToggle("analytics")}
											/>
										</div>
									</TabsContent>
									<TabsContent value="marketing" className="space-y-4">
										<div className="flex items-center justify-between">
											<div>
												<h4 className="font-medium">Marketing cookies</h4>
												<p className="text-sm text-gray-500">
													These cookies may be set through our site by our
													advertising partners to build a profile of your
													interests.
												</p>
											</div>
											<Switch
												checked={localConsents.marketing}
												onCheckedChange={() => handleToggle("marketing")}
											/>
										</div>
									</TabsContent>
									<TabsContent value="preferences" className="space-y-4">
										<div className="flex items-center justify-between">
											<div>
												<h4 className="font-medium">Preference cookies</h4>
												<p className="text-sm text-gray-500">
													These cookies enable personalized features and
													functionality on our website.
												</p>
											</div>
											<Switch
												checked={localConsents.preferences}
												onCheckedChange={() => handleToggle("preferences")}
											/>
										</div>
									</TabsContent>
								</Tabs>

								<div className="flex flex-col sm:flex-row gap-3 mt-6">
									<Button variant="outline" onClick={() => rejectAll()}>
										Reject all
									</Button>
									<Button
										variant="outline"
										onClick={() => setShowDetails(false)}
									>
										Back
									</Button>
									<Button onClick={handleSave}>Save preferences</Button>
								</div>
							</div>
						)}
					</div>
				</div>
			</motion.div>
		</AnimatePresence>
	);
}
