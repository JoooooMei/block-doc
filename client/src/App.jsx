import { useState } from 'react';

import './App.css';
import BlockDoc from './components/BlockDoc';
let num = 1000000;

function App() {
  return (
    <>
      {console.log(num.toLocaleString())}
      <BlockDoc />
    </>
  );
}

export default App;
