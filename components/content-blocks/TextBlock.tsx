import type { FC } from 'react';

interface TextBlockProps {
  content: string;
}

const TextBlock: FC<TextBlockProps> = ({ content }) => (
  <p className="mb-6 text-lg leading-relaxed text-[var(--body)]">{content}</p>
);

export default TextBlock;
