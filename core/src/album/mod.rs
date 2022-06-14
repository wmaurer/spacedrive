use serde::{Deserialize, Serialize};
use thiserror::Error;
use ts_rs::TS;

use crate::{
	file::File,
	prisma::{self, album, file, file_in_album},
	CoreContext, CoreError, CoreResponse,
};

pub async fn create_album(ctx: CoreContext, name: String) -> Result<CoreResponse, CoreError> {
	use album::*;

	let created_album = ctx
		.database
		.album()
		.create(
			pub_id::set(uuid::Uuid::new_v4().to_string()),
			name::set(name),
			vec![],
		)
		.exec()
		.await
		.unwrap();

	Ok(CoreResponse::AlbumCreateResponse {
		pub_id: created_album.pub_id,
	})
}

pub async fn update_album(
	ctx: CoreContext,
	id: i32,
	name: String,
) -> Result<CoreResponse, CoreError> {
	use album::*;

	ctx.database
		.album()
		.find_unique(id::equals(id))
		.update(vec![name::set(name)])
		.exec()
		.await
		.unwrap();

	Ok(CoreResponse::Success(()))
}

pub async fn album_assign(
	ctx: CoreContext,
	file_id: i32,
	album_id: i32,
) -> Result<CoreResponse, CoreError> {
	ctx.database.file_in_album().create(
		file_in_album::album::link(album::id::equals(album_id)),
		file_in_album::file::link(file::id::equals(file_id)),
		vec![],
	);

	Ok(CoreResponse::Success(()))
}

pub async fn album_delete(ctx: CoreContext, id: i32) -> Result<CoreResponse, CoreError> {
	use album::*;

	ctx.database
		.album()
		.find_unique(id::equals(id))
		.delete()
		.exec()
		.await
		.unwrap();

	Ok(CoreResponse::Success(()))
}

#[derive(Debug, Clone, Serialize, Deserialize, TS)]
#[ts(export)]
pub struct Album {
	pub id: i32,
	pub pub_id: String,
	pub name: String,

	pub date_created: chrono::DateTime<chrono::Utc>,
	pub date_modified: chrono::DateTime<chrono::Utc>,
}

#[derive(Debug, Clone, Serialize, Deserialize, TS)]
#[ts(export)]
pub struct FileInAlbum {
	pub album_id: i32,
	pub album: Option<Album>,

	pub file_id: i32,
	pub file: Option<File>,

	pub date_created: chrono::DateTime<chrono::Utc>,
}

impl Into<Album> for album::Data {
	fn into(self) -> Album {
		Album {
			id: self.id,
			pub_id: self.pub_id,
			name: self.name,
			date_created: self.date_created.into(),
			date_modified: self.date_modified.into(),
		}
	}
}

impl Into<FileInAlbum> for file_in_album::Data {
	fn into(self) -> FileInAlbum {
		FileInAlbum {
			album_id: self.album_id,
			album: self.album.map(|t| (*t).into()),
			file_id: self.file_id,
			file: self.file.map(|f| (*f).into()),
			date_created: self.date_created.into(),
		}
	}
}

#[derive(Serialize, Deserialize, TS, Debug)]
#[ts(export)]
pub struct AlbumWithFiles {
	pub album: Album,
	pub files_in_album: Vec<FileInAlbum>,
}

#[derive(Error, Debug)]
pub enum AlbumError {
	#[error("Album not found")]
	AlbumNotFound(i32),
	#[error("Database error")]
	DatabaseError(#[from] prisma::QueryError),
}
