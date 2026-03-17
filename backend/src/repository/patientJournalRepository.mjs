import { smartContractModel } from '../Models/SmartContractModel.mjs';
import providerModel from '../Models/schema/providerModel.mjs';
import journalEntryModel from '../Models/schema/journalEntryModel.mjs';
import patientModel from '../Models/schema/patientModel.mjs';
import { hashRecord } from '../utils/integrity/v1/hashRecord.mjs';
import { hashPatientId } from '../utils/integrity/v1/hashPatientId.mjs';
import { v4 as uuidv4 } from 'uuid';

const SUBGRAPH_URL = 'http://localhost:8000/subgraphs/name/blockdoc';

export class PatientJournalRepository {
  constructor() {
    this.smartContract = new smartContractModel();
  }

  async searchPatient(query) {
    return await patientModel.find({
      $or: [
        { patientId: { $regex: query, $options: 'i' } },
        { firstName: { $regex: query, $options: 'i' } },
        { lastName: { $regex: query, $options: 'i' } },
      ],
    });
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

    const recordId = uuidv4();
    const timestamp = new Date().toISOString();

    // Hash data for blockchain — recordId is baked in so hash is unique to this entry
    const recordEntry = [
      { recordId },
      { note },
      { diagnose },
      { date: timestamp },
      { recordType },
    ];
    const hashedPatientId = hashPatientId(patientId);
    const hashedRecord = hashRecord(recordEntry);

    // Append to blockchain
    const blockchainRecord = await this.smartContract.addRecord(
      hashedPatientId,
      hashedRecord,
      recordType
    );

    // Append to db
    record.recordId = recordId;
    record.timestamp = timestamp;
    record.blockchainTimestamp = blockchainRecord.timestamp;
    record.txHash = blockchainRecord.txHash;
    record.hashVersion = process.env.HASH_VERSION;

    const dbRecord = await journalEntryModel.create(record);

    return {
      addedToDb: dbRecord,
      addedToBlockchain: {
        hashedPatientId,
        hashedRecord,
        recordType,
        txHash: blockchainRecord.txHash,
      },
    };
  }

  async getRecords(patientId) {
    return await journalEntryModel.find({ patientId });
  }

  async verifyRecord(id) {
    const record = await journalEntryModel.findById(id);
    if (!record) throw new Error('Record not found');

    // hash record from DB
    const recordEntry = [
      { recordId: record.recordId },
      { note: record.note },
      { diagnose: record.diagnose },
      { date: record.timestamp },
      { recordType: record.recordType },
    ];
    const computedRecordHash = hashRecord(recordEntry);
    const computedPatientIdHash = hashPatientId(record.patientId);

    // query subgraph for a matching event
    const query = `{
      journalRecords(where: {
        recordHash: "${computedRecordHash}",
        patientId: "${computedPatientIdHash}"
      }) {
        id
        txHash
        author
        timestamp
      }
    }`;

    const response = await fetch(SUBGRAPH_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });

    const { data } = await response.json();
    const matches = data?.journalRecords ?? [];

    return {
      verified: matches.length > 0,
      recordId: record.recordId,
      computedRecordHash,
      onChain: matches[0] ?? null,
    };
  }

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
