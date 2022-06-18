import React from 'react';

export const ContentScreen: React.FC<{}> = (props) => {
	return (
		<div className="flex flex-col w-full h-screen custom-scroll page-scroll">
			<div data-tauri-drag-region className="flex flex-shrink-0 w-full h-5" />
			<div className="flex flex-col p-5 space-y-5 pb-7">
				<p className="px-5 py-3 mb-3 text-sm text-gray-400 rounded-md bg-gray-50 dark:text-gray-400 dark:bg-gray-600">
					<b>Note: </b>This is a pre-alpha build of Spacedrive, many features are yet to be
					functional.
				</p>
			</div>
		</div>
	);
};
