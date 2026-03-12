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

    return await this.journalRepository.addRecord(data);
  }

  async fetchPatientRecords(patientId) {
    if (!patientId) {
      throw new Error('Missing patientId');
    }

    return await this.journalRepository.getRecords(patientId);
  }

  async fetchPatientById(patientId) {
    return await this.journalRepository.getPatientById(patientId);
  }

  async createNewPatient(patient) {
    return await this.journalRepository.addNewPatient(patient);
  }
}
