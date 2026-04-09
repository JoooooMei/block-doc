import { SmartContractRepository } from './smartContractRepository.mjs';
import providerModel from '../Models/schema/providerModel.mjs';
import journalEntryModel from '../Models/schema/journalEntryModel.mjs';
import patientModel from '../Models/schema/patientModel.mjs';

export class PatientJournalRepository {
  constructor() {
    this.smartContract = new SmartContractRepository();
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

  async updatePatient(patient) {
    const { patientId, contact, ...fields } = patient;

    const update = { ...fields };

    if (contact) {
      for (const [key, value] of Object.entries(contact)) {
        update[`contact.${key}`] = value;
      }
    }

    const updated = await patientModel.findOneAndUpdate(
      { patientId },
      { $set: update },
      { new: true }
    );
    return updated;
  }

  async addRecord({ hashedPatientId, hashedRecord, recordType, dbRecord }) {
    const blockchainRecord = await this.smartContract.addRecord(
      hashedPatientId,
      hashedRecord,
      recordType
    );

    const savedRecord = await journalEntryModel.create({
      ...dbRecord,
      blockchainTimestamp: blockchainRecord.timestamp,
      txHash: blockchainRecord.txHash,
    });

    return {
      addedToDb: savedRecord,
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

  async getRecordById(id) {
    return await journalEntryModel.findById(id);
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
