import PageTransitionWrapper from '@/components/layout/PageTransitionWrapper';

import LandingFooter from '../../components/layout/LandingFooter';
import LandingHeader from '../../components/layout/LandingHeader';

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LandingHeader />
      <PageTransitionWrapper>{children}</PageTransitionWrapper>
      <LandingFooter />
    </>
  );
}
