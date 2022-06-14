// import { useBridgeCommand, useBridgeQuery } from '@sd/client';
import React from 'react';

import { ReactComponent as Image } from '../assets/svg/image.svg';
import { TopBar } from '../components/layout/TopBar';

interface AlbumProps {
	id: number;
	title: string;
	images: string[];
}

function Album(props: AlbumProps) {
	const { id, title, images } = props;

	return (
		<article className="group cursor-pointer">
			<div className="relative w-36 h-32 rounded-md">
				<div
					className="w-full rounded-md h-32 duration-300 no-repeat bg-center bg-cover"
					style={{
						backgroundImage: `url(${images[0]})`
					}}
					key={images[0]}
				></div>
			</div>
			<h3
				style={{
					fontSize: 14
				}}
				className="font-semibold mt-1 group-hover:opacity-60 duration-300"
			>
				{title}
			</h3>
			<h4 className="text-sm mt-0 text-gray-300 group-hover:opacity-60 duration-300">
				{images.length}
			</h4>
		</article>
	);
}

export const PhotosScreen: React.FC<{}> = (props) => {
	// Fetch albums
	const albums = [
		{
			id: 1,
			title: 'Selfies',
			images: ['https://pbs.twimg.com/profile_images/1516440650471944192/sbA26BqA_400x400.jpg']
		},
		{
			id: 2,
			title: 'Album 2',
			images: ['https://picsum.photos/id/10/200/300']
		}
	];

	return (
		<div className="flex flex-col w-full h-screen overflow-x-hidden custom-scroll page-scroll">
			<TopBar />
			<div data-tauri-drag-region className="flex flex-shrink-0 w-full h-5" />
			<div className="flex flex-col p-5 pt-0 space-y-5 pb-7">
				<h1 className="text-xl font-bold">Photos</h1>
				<h2 className="text-lg font-bold">Albums</h2>
				<div className="flex space-x-4">
					{albums.map((album) => (
						<Album {...album} key={album.id} />
					))}
				</div>
			</div>
		</div>
	);
};
