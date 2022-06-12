// import { useBridgeCommand, useBridgeQuery } from '@sd/client';
import React from 'react';

import { ReactComponent as Image } from '../assets/svg/image.svg';

interface AlbumProps {
	id: number;
	title: string;
	images: string[];
}

function Album(props: AlbumProps) {
	const { id, title, images } = props;

	return (
		<article className="group cursor-pointer">
			<div className="relative w-52 h-28 rounded-md overflow-hidden border-2 border-[#1E1E27]">
				<div className="absolute z-10 left-0 top-0 flex items-center space-x-1 bg-[#1E1E27] w-fit px-2 rounded-br-md">
					<Image />
					<span className="text-sm">{images.length}</span>
				</div>
				<div className="flex">
					{images.map((src) => (
						<div
							className="w-1/3 h-40 group-hover:scale-110 duration-300 no-repeat bg-center bg-cover"
							style={{
								backgroundImage: `url(${src})`
							}}
							key={src}
						></div>
					))}
				</div>
			</div>
			<h3 className="text-sm mt-1 group-hover:opacity-60 duration-300">{title}</h3>
		</article>
	);
}

export const PhotosScreen: React.FC<{}> = (props) => {
	// Fetch albums
	const albums = [
		{
			id: 1,
			title: 'Album 1',
			images: [
				'https://picsum.photos/id/1/200/300',
				'https://picsum.photos/id/2/200/300',
				'https://picsum.photos/id/3/200/300'
			]
		},
		{
			id: 2,
			title: 'Album 2',
			images: [
				'https://picsum.photos/id/5/200/300',
				'https://picsum.photos/id/6/200/300',
				'https://picsum.photos/id/7/200/300'
			]
		}
	];

	return (
		<div className="flex flex-col w-full h-screen overflow-x-hidden custom-scroll page-scroll">
			{/* <TopBar /> */}
			<div data-tauri-drag-region className="flex flex-shrink-0 w-full h-5" />
			<div className="flex flex-col p-5 space-y-5 pb-7">
				<h1 className="text-xl font-bold">Photos</h1>
				<h2 className="text-lg font-bold">Albums</h2>
				<div className="flex space-x-2">
					{albums.map((album) => (
						<Album {...album} key={album.id} />
					))}
				</div>
			</div>
		</div>
	);
};
