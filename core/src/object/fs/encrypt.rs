use std::path::PathBuf;

use serde::{Serialize, Deserialize};

use crate::{object::preview::file_path_with_file, job::{StatefulJob, WorkerContext, JobState, JobError, JobResult}};

pub struct EncryptFilesJob {}

#[derive(Serialize, Deserialize, Debug)]
pub struct EncryptFilesJobInit {
    pub location_id: i32,
    pub path: PathBuf,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct EncryptFilesJobState {

}

#[derive(Serialize, Deserialize, Debug)]
pub struct EncryptFilesJobStep {
    file: file_path_with_file::Data,
}

pub const ENCRYPT_JOB_NAME: &str = "encryptor";

#[async_trait::async_trait]
impl StatefulJob for EncryptFilesJob {
    type Init = EncryptFilesJobInit;
    type Data = EncryptFilesJobState;
    type Step = EncryptFilesJobStep;

    fn name(&self) -> &'static str {
        ENCRYPT_JOB_NAME
    }

    async fn init(&self,
        ctx: WorkerContext,
        state: &mut JobState<Self::Init, Self::Data, Self::Step>,
    ) -> Result<(), JobError> {
        let library_ctx = ctx.library_ctx();

        todo!()
    }

    async fn execute_step(
		&self,
		ctx: WorkerContext,
		state: &mut JobState<Self::Init, Self::Data, Self::Step>,
	) -> Result<(), JobError> {

        todo!()
    }

    async fn finalize(
		&self,
		_ctx: WorkerContext,
		state: &mut JobState<Self::Init, Self::Data, Self::Step>,
	) -> JobResult {

        todo!()
    }
}