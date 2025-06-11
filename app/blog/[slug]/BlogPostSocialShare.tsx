'use client';

import { Share2 } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface BlogPostSocialShareProps {
  title: string;
  url: string;
}

// Client-side sharing functions
const shareOnTwitter = (title: string, url: string) => {
  const text = encodeURIComponent(title);
  const shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(url)}`;
  window.open(shareUrl, '_blank', 'width=600,height=400');
};

const shareOnFacebook = (url: string) => {
  const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
  window.open(shareUrl, '_blank', 'width=600,height=400');
};

const shareOnLinkedIn = (title: string, url: string) => {
  const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
  window.open(shareUrl, '_blank', 'width=600,height=400');
};

const copyToClipboard = async (url: string) => {
  try {
    await navigator.clipboard.writeText(url);
    alert('Link gekopieerd naar klembord!');
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = url;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    alert('Link gekopieerd naar klembord!');
  }
};

export default function BlogPostSocialShare({ title, url }: BlogPostSocialShareProps) {
  return (
    <div className="flex items-center justify-between mt-12 pt-8 border-t">
      <div className="flex items-center">
        <span className="mr-4">Deel dit artikel</span>
        <div className="flex space-x-2">
          <Button
            size="icon"
            variant="ghost"
            aria-label="Share on Twitter"
            onClick={() => shareOnTwitter(title, url)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-5"
            >
              <title>Twitter</title>
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
            </svg>
          </Button>
          <Button
            size="icon"
            variant="ghost"
            aria-label="Share on Facebook"
            onClick={() => shareOnFacebook(url)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-5"
            >
              <title>Facebook</title>
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </Button>
          <Button
            size="icon"
            variant="ghost"
            aria-label="Share on LinkedIn"
            onClick={() => shareOnLinkedIn(title, url)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-5"
            >
              <title>LinkedIn</title>
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </Button>
          <Button
            size="icon"
            variant="ghost"
            aria-label="Copy link"
            onClick={() => copyToClipboard(url)}
          >
            <Share2 className="size-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
