import React from 'react';

const JournalEntryForm = ({
  diagnose,
  setDiagnose,
  note,
  setNote,
  handleNewEntry,
}) => {
  return (
    <>
      <form action="">
        <div>
          <label htmlFor="note">Anteckning</label>
          <textarea
            name="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="diagnose">Dagnos</label>
          <input
            type="text"
            name="diagnose"
            value={diagnose}
            onChange={(e) => setDiagnose(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleNewEntry}>
          Spara
        </button>
      </form>
    </>
  );
};

export default JournalEntryForm;
