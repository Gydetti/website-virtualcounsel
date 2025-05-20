import type { FC } from 'react';
import type { z } from 'zod';

import type { videoBlockSchema } from '@/lib/schemas/contentBlocks.schema';

// Props inferred from Zod schema
type VideoBlockProps = z.infer<typeof videoBlockSchema>;

const VideoBlock: FC<VideoBlockProps> = ({ src, caption }) => {
  // Basic iframe embed, could be enhanced for specific providers (YouTube, Vimeo)
  // or use a dedicated video player component
  return (
    <figure>
      <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
        <iframe
          src={src}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={caption || 'Embedded video'}
        />
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
};

export default VideoBlock;
