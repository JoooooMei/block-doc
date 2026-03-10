import React, { useState } from 'react';
import FindPatientForm from './findPatient/FindPatientForm';
import NewJournalEntry from './newJournalEntry/NewJournalEntry';
import PatientCard from './patientCard/PatientCard';
import BlockIcon from './icons/BlockIcon';
import AddPatient from './addPatient/AddPatient';
import AddPatientForm from './addPatient/AddPatientForm';

const BlockDoc = () => {
  const [mainView, setMainView] = useState('');
  const [provider, setProvider] = useState(
    '0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199'
  );
  const [mountedPatient, setMountedPatient] = useState('');
  return (
    <>
      {console.log('Visa: ', mainView)}
      <aside>
        <div className="block-doc-logo">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#1f1f1f">
            <path d="M440-183v-274L200-596v274l240 139Zm80 0 240-139v-274L520-457v274Zm-40-343 237-137-237-137-237 137 237 137ZM160-252q-19-11-29.5-29T120-321v-318q0-22 10.5-40t29.5-29l280-161q19-11 40-11t40 11l280 161q19 11 29.5 29t10.5 40v318q0 22-10.5 40T800-252L520-91q-19 11-40 11t-40-11L160-252Zm320-228Z" />
          </svg>
          <h1>Block Doc</h1>
        </div>
        <div className="aside-section-card">
          <FindPatientForm
            mountedPatient={mountedPatient}
            setMountedPatient={setMountedPatient}
          />
          <AddPatient
            setMountedPatient={setMountedPatient}
            setMainView={setMainView}
          />
        </div>
        <div>
          <PatientCard
            mountedPatient={mountedPatient}
            setMainView={setMainView}
          />
        </div>
      </aside>
      <main>
        {mainView === 'write-journal' && (
          <NewJournalEntry provider={provider} patient={mountedPatient} />
        )}

        {mainView === 'read-jounral' && ''}

        {mainView === 'edit-info' && ''}

        {mainView === 'add-new-patient' && <AddPatientForm />}
      </main>
    </>
  );
};

export default BlockDoc;
