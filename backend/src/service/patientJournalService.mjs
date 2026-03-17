import { PatientJournalRepository } from '../repository/patientJournalRepository.mjs';
import { hashRecord } from '../utils/integrity/v1/hashRecord.mjs';
import { hashPatientId } from '../utils/integrity/v1/hashPatientId.mjs';
import { v4 as uuidv4 } from 'uuid';

const SUBGRAPH_URL = 'http://localhost:8000/subgraphs/name/blockdoc';

export class PatientJournalService {
  constructor() {
    this.repository = new PatientJournalRepository();
  }

  async #verifyRecord(record) {
    const recordEntry = [
      { recordId: record.recordId },
      { note: record.note },
      { diagnose: record.diagnose },
      { date: record.timestamp },
      { recordType: record.recordType },
    ];
    const computedRecordHash = hashRecord(recordEntry);
    const computedPatientIdHash = hashPatientId(record.patientId);

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
    const onChain = matches[0] ?? null;

    const timeDeviation =
      onChain
        ? Math.abs(new Date(record.timestamp) - new Date(onChain.timestamp * 1000)) / 1000
        : null;

    return {
      verified: matches.length > 0,
      computedRecordHash,
      timeDeviation,
      onChain,
    };
  }

  searchPatient(query) {
    return this.repository.searchPatient(query);
  }

  getAllPatients() {
    return this.repository.getAllPatients();
  }

  addPatient(patient) {
    return this.repository.addPatient(patient);
  }

  addRecord(record) {
    const { patientId, note, diagnose, recordType } = record;

    const recordId = uuidv4();
    const timestamp = new Date().toISOString();

    const recordEntry = [
      { recordId },
      { note },
      { diagnose },
      { date: timestamp },
      { recordType },
    ];
    const hashedPatientId = hashPatientId(patientId);
    const hashedRecord = hashRecord(recordEntry);

    return this.repository.addRecord({
      hashedPatientId,
      hashedRecord,
      recordType,
      dbRecord: { ...record, recordId, timestamp, hashVersion: process.env.HASH_VERSION },
    });
  }

  async getRecords(patientId) {
    const records = await this.repository.getRecords(patientId);
    return Promise.all(
      records.map(async (record) => {
        const verification = await this.#verifyRecord(record);
        return { ...record.toObject(), ...verification };
      })
    );
  }

  async verifyRecordById(id) {
    const record = await this.repository.getRecordById(id);
    if (!record) throw new Error('Record not found');
    return { recordId: record.recordId, ...(await this.#verifyRecord(record)) };
  }

  authorizeProvider(address) {
    return this.repository.authorizeProvider(address);
  }

  revokeProvider(address) {
    return this.repository.revokeProvider(address);
  }

  isProvider(address) {
    return this.repository.isProvider(address);
  }

  addProvider(user) {
    return this.repository.addProvider(user);
  }
}
