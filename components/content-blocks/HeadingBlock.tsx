import type { FC } from "react";

interface HeadingBlockProps {
  level: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  text: string;
}

const HeadingBlock: FC<HeadingBlockProps> = ({ level, text }) => {
  const Tag = level;
  return <Tag>{text}</Tag>;
};

export default HeadingBlock; 