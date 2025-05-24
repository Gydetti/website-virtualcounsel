import Footer from '@/components/layout/footer';
import PageTransitionWrapper from '@/components/layout/PageTransitionWrapper';

import LandingHeader from '../../components/layout/LandingHeader';

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LandingHeader />
      <PageTransitionWrapper>{children}</PageTransitionWrapper>
      <Footer hideNewsletter />
    </>
  );
}
