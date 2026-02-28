import { smartContractModel } from '../Models/SmartContractModel.mjs';
import providerModel from '../Models/schema/providerModel.mjs';
import journalEntryModel from '../Models/schema/journalEntryModel.mjs';
import patientModel from '../Models/schema/patientModel.mjs';
import { hashRecord } from '../utils/integrity/v1/hashRecord.mjs';
import { hashPatientId } from '../utils/integrity/v1/hashPatientId.mjs';

export class PatientJournalRepository {
  constructor() {
    this.smartContract = new smartContractModel();
  }

  async getAllPatients() {
    return await patientModel.find();
  }

  async addPatient(patient) {
    const newPatient = await patientModel.create(patient);

    return newPatient;
  }

  async addRecord(record) {
    const { patientId, note, diagnose, recordType } = record;

    const timestamp = new Date().toISOString();

    // Hash data for blockchain
    const recordEntry = [
      { note },
      { diagnose },
      { date: timestamp },
      { recordType },
    ];
    const hashedId = hashPatientId(patientId);
    const hashedRecord = hashRecord(recordEntry);

    // Append to blockchain
    const blockchainRecord = await this.smartContract.addRecord(
      hashedId,
      hashedRecord,
      recordType
    );

    // Append to db
    record.timestamp = timestamp;
    record.blockchainTimestamp = blockchainRecord.timestamp;
    record.hashVersion = process.env.HASH_VERSION;

    const dbRecord = await journalEntryModel.create(record);

    return {
      addedToDb: dbRecord,
      addedToBlockchain: {
        hashedId,
        hashedRecord,
        recordType,
        txHash: blockchainRecord,
      },
    };
  }

  async verifyRecord() {}

  async authorizeProvider(providerAddress) {
    return await this.smartContract.authorizeProvider(providerAddress);
  }

  async revokeProvider(providerAddress) {
    return await this.smartContract.revokeProvider(providerAddress);
  }

  async isProvider(providerAddress) {
    return await this.smartContract.isProvider(providerAddress);
  }

  async addProvider(user) {
    const addedUser = await providerModel.create(user);

    addedUser.password = undefined;

    return addedUser;
  }
}
