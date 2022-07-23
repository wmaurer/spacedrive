import styled from '@emotion/styled';
import React from 'react';
import { useParams } from 'react-router';
import { VirtuosoGrid } from 'react-virtuoso';

import { TopBar } from '../components/layout/TopBar';

const ListContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
`;

export function AlbumScreen() {
	const { id } = useParams();

	// Fetch images from album with id

	const images = [...Array(250)].map(
		(_, i) => `https://source.unsplash.com/featured/200x200?sig=${i}`
	);

	return (
		<div className="flex flex-col w-full h-screen overflow-x-hidden custom-scroll page-scroll">
			<TopBar />

			<div className="flex flex-col space-y-5 w-full h-full">
				<VirtuosoGrid
					className="explorer-scroll flex flex-row"
					totalCount={images.length}
					overscan={50}
					components={{
						List: ListContainer
					}}
					itemContent={(index) => {
						console.log('index', index);
						return (
							<div
								className="bg-no-repeat bg-cover bg-center w-32 h-32"
								style={{
									backgroundImage: `url(${images[index]}`
								}}
							></div>
						);
					}}
				/>
			</div>
		</div>
	);
}
