export class JournalService {
  constructor(journalRepository) {
    this.journalRepository = journalRepository;
  }

  async createRecord(data) {
    if (
      !data.provider ||
      !data.patientId ||
      !data.recordType ||
      !data.note ||
      !data.diagnose
    ) {
      throw new Error('Invalid journal data');
    }

    return this.journalRepository.addRecord(data);
  }

  async fetchPatientRecords(patientId) {
    if (!patientId) {
      throw new Error('Missing patientId');
    }

    return this.journalRepository.getRecords(patientId);
  }
}
