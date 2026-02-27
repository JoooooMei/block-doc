export class JournalRepository {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  addRecord(record) {
    return this.apiClient.post('/api/v1/add-record', record);
  }

  getRecords(patientId) {
    return this.apiClient.get(`/api/v1/records/${patientId}`);
  }
}
