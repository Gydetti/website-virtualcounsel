import Link from 'next/link';

export default function LandingHeader() {
  return (
    <header className="landing-header py-4 bg-white border-b">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-lg font-bold">
          Home
        </Link>
      </div>
    </header>
  );
}
