/* biome-disable-file */
"use client";
import { siteConfig } from "@/lib/siteConfig";
import Script from "next/script";

export default function TrackingScripts() {
	// Gate on Cookiebot consent categories
	const canLoadAnalytics =
		typeof window !== "undefined" &&
		window.Cookiebot?.consent?.statistics === true;
	const canLoadMarketing =
		typeof window !== "undefined" &&
		window.Cookiebot?.consent?.marketing === true;

	return (
		<>
			{/* Google Tag Manager */}
			{canLoadAnalytics && (
				<>
					<Script
						id="gtm-script"
						type="text/partytown"
						data-cookieconsent="statistics"
						strategy="afterInteractive"
						// eslint-disable-next-line react/no-danger
						// biome-disable-next-line lint/security/noDangerouslySetInnerHtml
						// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
						dangerouslySetInnerHTML={{
							__html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'? '&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${siteConfig.tracking.gtmId}');`,
						}}
					/>
					<noscript>
						<iframe
							title="Google Tag Manager"
							src={`https://www.googletagmanager.com/ns.html?id=${siteConfig.tracking.gtmId}`}
							height="0"
							width="0"
							style={{ display: "none", visibility: "hidden" }}
						/>
					</noscript>
				</>
			)}

			{/* Google Analytics 4 */}
			{canLoadAnalytics && (
				<>
					<Script
						src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.tracking.ga4Id}`}
						type="text/partytown"
						data-cookieconsent="statistics"
						strategy="beforeInteractive"
					/>
					<Script
						id="ga4-script"
						type="text/partytown"
						data-cookieconsent="statistics"
						strategy="afterInteractive"
						// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
						dangerouslySetInnerHTML={{
							__html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${siteConfig.tracking.ga4Id}');`,
						}}
					/>
				</>
			)}

			{/* Facebook Pixel */}
			{canLoadMarketing && (
				<Script
					id="facebook-pixel"
					type="text/partytown"
					data-cookieconsent="marketing"
					strategy="afterInteractive"
					// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
					dangerouslySetInnerHTML={{
						__html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js'); fbq('init', '${siteConfig.tracking.fbPixelId}'); fbq('track', 'PageView');`,
					}}
				/>
			)}

			{/* LinkedIn Insight Tag */}
			{canLoadMarketing && (
				<Script
					id="linkedin-insight"
					type="text/partytown"
					data-cookieconsent="marketing"
					strategy="afterInteractive"
					// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
					dangerouslySetInnerHTML={{
						__html: `_linkedin_partner_id="${siteConfig.tracking.linkedinId}";window._linkedin_data_partner_ids=window._linkedin_data_partner_ids||[];window._linkedin_data_partner_ids.push(_linkedin_partner_id);(function(l){if(!l){window.lintrk=function(a,b){window.lintrk.q.push([a,b])};window.lintrk.q=[];}var s=document.getElementsByTagName("script")[0],b=document.createElement("script");b.type="text/javascript";b.async=true;b.src="https://snap.licdn.com/li.lms-analytics/insight.min.js";s.parentNode.insertBefore(b,s);})(window.lintrk);`,
					}}
				/>
			)}

			{/* HubSpot Tracking Code */}
			{canLoadMarketing && (
				<Script
					id="hubspot-tracking"
					type="text/partytown"
					data-cookieconsent="marketing"
					strategy="afterInteractive"
					// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
					dangerouslySetInnerHTML={{
						__html: `(function(d,s,i,r){if(d.getElementById(i))return;var n=d.createElement(s),e=d.getElementsByTagName(s)[0];n.id=i;n.src='//js.hs-scripts.com/${siteConfig.tracking.hubspotId}.js';e.parentNode.insertBefore(n,e);})(document,"script","hs-script-loader");`,
					}}
				/>
			)}

			{/* Google Ads Conversion Tracking */}
			{canLoadMarketing && (
				<Script
					id="google-ads"
					type="text/partytown"
					data-cookieconsent="marketing"
					strategy="afterInteractive"
					// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
					dangerouslySetInnerHTML={{
						__html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${siteConfig.tracking.googleAdsId}');`,
					}}
				/>
			)}
		</>
	);
}
