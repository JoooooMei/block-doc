import React, { useState } from 'react';
import { useCreateJournalEntry } from '../../../hooks/useCreateJournalEntry';
import JournalEntryForm from './JournalEntryForm';

const NewJournalEntry = ({ provider, patient }) => {
  const { create, entry, loading, error } = useCreateJournalEntry();

  const [diagnose, setDiagnose] = useState('');
  const [note, setNote] = useState('');

  const handleNewEntry = async () => {
    const record = {
      provider: provider,
      patientId: patient,
      recordType: 1,
      note,
      diagnose,
    };

    await create(record);

    if (entry) {
      setDiagnose('');
      setNote('');
    }
  };

  return (
    <>
      <JournalEntryForm
        diagnose={diagnose}
        setDiagnose={setDiagnose}
        note={note}
        setNote={setNote}
        handleNewEntry={handleNewEntry}
      />
      <div>
        <h1>Test Add Record</h1>
        <button onClick={handleNewEntry}>Skicka test-record</button>
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
            <b>Note:</b> {entry.addedToDb.note}
          </p>
          <p>
            <b>Diagnose:</b> {entry.addedToDb.diagnose}
          </p>
        </div>
      )}
      {console.log('entry', entry)}
    </>
  );
};

export default NewJournalEntry;
