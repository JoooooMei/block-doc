export class JournalRepository {
  constructor(apiClient) {
    this.apiClient = apiClient;
    this.baseUrl = '/api/v1';
  }

  addRecord(record) {
    return this.apiClient.post(`${this.baseUrl}/add-record`, record);
  }

  getRecords(patientId) {
    return this.apiClient.get(`${this.baseUrl}/journal/${patientId}`);
  }

  getPatientById(patientId) {
    return this.apiClient.get(`${this.baseUrl}/patients/${patientId}`);
  }

  addNewPatient(patient) {
    return this.apiClient.post(`${this.baseUrl}/patients`, patient);
  }
}
