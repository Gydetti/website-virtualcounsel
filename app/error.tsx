'use client';

import { useEffect } from 'react';

const errorPageData = {
  title: 'Something went wrong!',
  description:
    'We encountered an unexpected error. Please try refreshing the page or contact us if the problem persists.',
  buttonText: 'Try again',
};

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container mx-auto py-16 text-center">
      <h1 className="font-bold mb-4">{errorPageData.title ?? 'Something went wrong!'}</h1>
      <p className="text-neutral-text/600 mb-6">
        {errorPageData.description ??
          'We encountered an unexpected error. Please try refreshing the page or contact us if the problem persists.'}
      </p>
      <p className="text-sm text-neutral-text/400 mb-6">{error.message}</p>
      <button
        type="button"
        onClick={() => reset()}
        className="px-4 py-2 bg-primary text-white rounded hover:bg-primary90"
      >
        {errorPageData.buttonText ?? 'Try again'}
      </button>
    </div>
  );
}
