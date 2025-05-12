import type { FC } from "react";
import type { ContentBlock } from "@/lib/schemas/contentBlocks.schema";

import HeadingBlock from "./HeadingBlock";
import TextBlock from "./TextBlock";
import ImageBlock from "./ImageBlock";
import VideoBlock from "./VideoBlock";
import QuoteBlock from "./QuoteBlock";
import CtaBlock from "./CtaBlock";
import FormBlock from "./FormBlock";
import ListBlock from "./ListBlock";

interface ContentBlockRendererProps {
  block: ContentBlock;
}

const ContentBlockRenderer: FC<ContentBlockRendererProps> = ({ block }) => {
  switch (block.type) {
    case "heading":
      return <HeadingBlock level={block.level} text={block.text} />;
    case "text":
      return <TextBlock content={block.content} />;
    case "image":
      return <ImageBlock image={block.image} caption={block.caption} />;
    case "video":
      return <VideoBlock src={block.src} caption={block.caption} />;
    case "quote":
      return <QuoteBlock text={block.text} author={block.author} source={block.source} />;
    case "cta":
      return <CtaBlock text={block.text} href={block.href} external={block.external} variant={block.variant} />;
    case "list":
      return <ListBlock ordered={block.ordered} items={block.items} />;
    case "form":
      return <FormBlock config={block.config} title={block.title} description={block.description} />;
    default:
      return null; // Unknown block type
  }
};

export default ContentBlockRenderer; 