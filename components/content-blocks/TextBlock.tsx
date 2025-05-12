import type { FC } from "react";

interface TextBlockProps {
	content: string;
}

const TextBlock: FC<TextBlockProps> = ({ content }) => <p>{content}</p>;

export default TextBlock;
