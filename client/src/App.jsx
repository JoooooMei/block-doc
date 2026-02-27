import { useState } from 'react';

import './App.css';
import BlockDoc from './components/BlockDoc';
import { JournalService } from './services/journalServices';
import { JournalRepository } from './repository/JournalRepository';
import { ApiClient } from './core/ApiClient';
import { BLOCK_DOC_API } from './config/config';

function App() {
  const client = new ApiClient(BLOCK_DOC_API);
  const repo = new JournalRepository(client);
  const patientJournal = new JournalService(repo);

  const [entry, setEntry] = useState(null);

  const handleTestAdd = async () => {
    try {
      const record = {
        provider: '0x1234567890abcdef1234567890abcdef12345678',
        patientId: '19121212-1212',
        recordType: 1,
        note: 'Test från frontend',
        diagnose: 'Virusinfektion',
      };

      const result = await patientJournal.createRecord(record);
      console.log('Record added:', result);

      setEntry(result.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <BlockDoc />

      <div>
        <h1>Test Add Record</h1>
        <button onClick={handleTestAdd}>Skicka test-record</button>
      </div>
      {entry && (
        <div>
          Det gick bra
          <p>
            <b>Blockchain hash:</b> {entry.addedToBlockchain.hashedRecord}
          </p>
          <p>
            <b>Patient ID:</b> {entry.addedToDb.patientId}
          </p>
          <p>
            <b>Diagnose:</b> {entry.addedToDb.diagnose}
          </p>
        </div>
      )}
      {console.log('entry', entry)}
    </>
  );
}

export default App;
