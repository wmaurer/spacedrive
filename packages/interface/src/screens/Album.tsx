import React from 'react';
import { useParams } from 'react-router';

export function AlbumScreen() {
	const { id } = useParams();

	// Fetch images from album with id

	return (
		<div className="flex flex-col w-full h-screen overflow-x-hidden custom-scroll page-scroll">
			<div data-tauri-drag-region className="flex flex-shrink-0 w-full h-5" />
			<div className="flex flex-col p-5 pt-0 space-y-5 pb-7">
				<h1 className="text-xl font-bold">Album madness</h1>
				<code>id: {id}</code>
			</div>
		</div>
	);
}
