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
      patientId: patient.patientId,
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
      <div className="icon-wrapper">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#1f1f1f">
          <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h360v80H200v560h560v-360h80v360q0 33-23.5 56.5T760-120H200Zm120-160v-80h320v80H320Zm0-120v-80h320v80H320Zm0-120v-80h320v80H320Zm360-80v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80Z"></path>
        </svg>
        <h3>Ny daganteckning</h3>
      </div>
      <JournalEntryForm
        diagnose={diagnose}
        setDiagnose={setDiagnose}
        note={note}
        setNote={setNote}
        handleNewEntry={handleNewEntry}
      />

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
