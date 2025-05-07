"use client";

import { useEffect } from "react";

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
      <h1 className="text-2xl font-bold mb-4">Something went wrong!</h1>
      <p className="text-gray-600 mb-6">{error.message}</p>
      <button
        type="button"
        onClick={() => reset()}
        className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
      >
        Try again
      </button>
    </div>
  );
}
