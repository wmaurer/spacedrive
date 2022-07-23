// import { useBridgeCommand, useBridgeQuery } from '@sd/client';
import { Tab } from '@headlessui/react';
import clsx from 'clsx';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useKey } from 'rooks';

import { TopBar } from '../components/layout/TopBar';

interface AlbumProps {
	id: number;
	title: string;
	images: string[];
}

function Album(props: AlbumProps) {
	const { id, title, images } = props;

	return (
		<Link to={`/album/${id}`}>
			<article className="cursor-pointer hover:opacity-60 duration-300">
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
					className="font-semibold mt-1"
				>
					{title}
				</h3>
				<h4 className="text-sm mt-0 text-gray-300">{images.length}</h4>
			</article>
		</Link>
	);
}

const tabs = {
	Albums: () => {
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
			<div className="flex space-x-4">
				{albums.map((album) => (
					<Album {...album} key={album.id} />
				))}
			</div>
		);
	},
	Photos: () => <p className="text-gray">No photos yet, sorry.</p>
};

export function PhotosScreen() {
	// I have to prevent default for these keys so it doesn't go brr when you use tabs
	useKey('ArrowLeft', (e) => e.preventDefault());
	useKey('ArrowRight', (e) => e.preventDefault());

	const [hoveredMenuItem, setHoveredMenuItem] = useState('');

	return (
		<div className="flex flex-col w-full h-screen overflow-x-hidden">
			<TopBar />

			<div className="flex flex-col space-y-5 pb-7">
				{/* Multi button with photos, albums, */}
				<Tab.Group>
					<Tab.List className="pl-5  border-gray-500 bg-gray-550/50 p-[5px] w-full space-x-2 text-sm relative">
						{Object.keys(tabs).map((key) => (
							<Tab
								onFocus={() => setHoveredMenuItem(key)}
								className={({ selected }) =>
									clsx({
										'rounded px-2 py-1 outline-none duration-150': true,
										'bg-white/10': selected,
										'hover:bg-white/5 active:bg-white/10': !selected
									})
								}
							>
								{key}
							</Tab>
						))}
					</Tab.List>
					<Tab.Panels className="p-5 pt-0">
						{Object.values(tabs).map((content) => (
							<Tab.Panel className="outline-none">{content}</Tab.Panel>
						))}
					</Tab.Panels>
				</Tab.Group>
			</div>
		</div>
	);
}
