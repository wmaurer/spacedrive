import clsx from 'clsx';
import Prism from 'prismjs';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-typescript';
import { useEffect } from 'react';

import '../atom-one.css';

interface MarkdownPageProps {
	children: React.ReactNode;
	classNames?: string;
	articleClassNames?: string;
}

function MarkdownPage(props: MarkdownPageProps) {
	useEffect(() => {
		Prism.highlightAll();
	}, []);

	return (
		<div className={clsx('p-4 mb-10', props.classNames)}>
			<article
				id="content"
				className={clsx(
					'prose text-[15px] sm:text-[16px] prose-img:rounded prose-code:text-gray-400 prose-code:font-normal prose-code:before:hidden prose-code:p-1 prose-code:bg-gray-650 prose-code:rounded-md prose-code:after:hidden prose-h1:text-[3.25em] prose-blockquote:bg-gray-600 prose-blockquote:rounded prose-a:text-primary prose-a:no-underline lg:prose-xs dark:prose-invert prose-td:p-2 prose-th:p-2 prose-td:border-l prose-td:border-gray-500 prose-td:last:border-r prose-table:border-b prose-table:border-gray-500 prose-tr:even:bg-gray-700',
					props.articleClassNames
				)}
			>
				{props.children}
			</article>
		</div>
	);
}

export default MarkdownPage;
