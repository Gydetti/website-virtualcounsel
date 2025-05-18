import { siteConfig } from '@/lib/siteConfig';

export default function LandingFooter() {
  return (
    <footer className="landing-footer py-4 bg-neutral-surface border-t">
      <div className="container mx-auto text-center text-sm">
        © {new Date().getFullYear()} {siteConfig.site.name}. All rights reserved.
      </div>
    </footer>
  );
}
