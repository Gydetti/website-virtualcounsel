import type { FC } from "react";

interface ListBlockProps {
	ordered?: boolean;
	items: string[];
}

const ListBlock: FC<ListBlockProps> = ({ ordered = false, items }) => {
	if (ordered) {
		return (
			<ol className="list-decimal list-inside space-y-1">
				{items.map((item) => (
					<li key={item}>{item}</li>
				))}
			</ol>
		);
	}
	return (
		<ul className="list-disc list-inside space-y-1">
			{items.map((item) => (
				<li key={item}>{item}</li>
			))}
		</ul>
	);
};

export default ListBlock;
