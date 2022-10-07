use std::{path::PathBuf, collections::VecDeque};

use serde::{Serialize, Deserialize};

use sd_crypto::{primitives::{Algorithm, HashingAlgorithm, generate_salt, generate_master_key, generate_nonce, Mode, to_array}, protected::Protected, keys::hashing::Params, objects::{memory::MemoryEncryption, stream::StreamEncryption}, header::{keyslot::{Keyslot, KeyslotVersion}, file::{FileHeaderVersion, FileHeader}}};

use crate::{job::{StatefulJob, WorkerContext, JobState, JobError, JobResult, JobReportUpdate}, prisma::file_path};

use std::fs::File;

pub struct EncryptFilesJob {}

#[derive(Serialize, Deserialize, Debug)]
pub struct EncryptFilesJobInit {
    pub location_id: i32,
    pub paths: Vec<PathBuf>,
    pub password: Vec<u8>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct EncryptFilesJobState {

}

// file_path::include!(file_path_with_file { file });

#[derive(Serialize, Deserialize, Debug)]
pub struct EncryptFilesJobStep {
    // should maybe be file_path_with_data::Data
    file: PathBuf,
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

    async fn init(
        &self,
        ctx: WorkerContext,
        state: &mut JobState<Self::Init, Self::Data, Self::Step>,
    ) -> Result<(), JobError> {
        let library_ctx = ctx.library_ctx();

        let files = state.init.paths.clone().into_iter().map(|p| EncryptFilesJobStep { file: p }).collect::<VecDeque<_>>();

        state.steps = files;

        todo!()
    }

    async fn execute_step(
		&self,
		ctx: WorkerContext,
		state: &mut JobState<Self::Init, Self::Data, Self::Step>,
	) -> Result<(), JobError> {

        let step = &state.steps[0];

        // hardcoded temporarily until we can get this from the UI
        let algorithm = Algorithm::XChaCha20Poly1305;
        let hashing_algorithm = HashingAlgorithm::Argon2id(Params::Standard);

        let input_path = step.file.clone();
        
        // append `.sd` extension
        let mut output_path = step.file.clone();
        output_path.push(".sd");

        let mut reader = File::open(input_path).unwrap();
        let mut writer = File::create(output_path).unwrap();
    
        // hardcoded until we're able
        let password = Protected::new(b"abcd".to_vec());
    
        let salt = generate_salt();
        let mk = generate_master_key();
        let mk_nonce = generate_nonce(algorithm.nonce_len(Mode::Memory));
        let nonce = generate_nonce(algorithm.nonce_len(Mode::Stream));
    
        let hashed_password = hashing_algorithm.hash(password, salt).unwrap();
        let mem_encryptor = MemoryEncryption::new(hashed_password, algorithm).unwrap();
        let encrypted_master_key = to_array(mem_encryptor.encrypt(mk.expose().as_ref(), &mk_nonce).unwrap()).unwrap();
    
        let mut keyslots: Vec<Keyslot> = Vec::new();
        keyslots.push(Keyslot::new(KeyslotVersion::V1, algorithm, hashing_algorithm, salt, encrypted_master_key, mk_nonce));
    
        let header = FileHeader::new(FileHeaderVersion::V1, algorithm, nonce, keyslots);
        let aad = header.generate_aad();
        header.write(&mut writer).unwrap();
    
        let encryptor = StreamEncryption::new(mk, &header.nonce, algorithm).unwrap();
        encryptor.encrypt_streams(&mut reader, &mut writer, &aad).unwrap();

        ctx.progress(vec![JobReportUpdate::CompletedTaskCount(
			state.step_number + 1,
		)]);

        Ok(())
    }

    async fn finalize(
		&self,
		_ctx: WorkerContext,
		state: &mut JobState<Self::Init, Self::Data, Self::Step>,
	) -> JobResult {

        todo!()
    }
}