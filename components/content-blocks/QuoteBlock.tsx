import Link from 'next/link';
import type { FC } from 'react';
import type { z } from 'zod';

import type { quoteBlockSchema } from '@/lib/schemas/contentBlocks.schema';

// Props inferred from Zod schema
type QuoteBlockProps = z.infer<typeof quoteBlockSchema>;

const QuoteBlock: FC<QuoteBlockProps> = ({ text, author, source }) => {
  return (
    <figure>
      <blockquote>
        <p>{text}</p>
      </blockquote>
      {(author || source) && (
        <figcaption>
          {author}
          {author && source && ', '}
          {source && (
            <cite>
              <Link href={source.href} target={source.external ? '_blank' : undefined}>
                {source.text}
              </Link>
            </cite>
          )}
        </figcaption>
      )}
    </figure>
  );
};

export default QuoteBlock;
