import { useState } from 'react';

import './App.css';
import BlockDoc from './components/BlockDoc';
import NewJournalEntry from './components/newJournalEntry/NewJournalEntry';

function App() {
  const [provider, setProvider] = useState(
    '0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199'
  );
  const [mountedPatient, setMountedPatient] = useState(191212121212);

  return (
    <>
      <BlockDoc />

      <NewJournalEntry provider={provider} patient={mountedPatient} />
    </>
  );
}

export default App;
