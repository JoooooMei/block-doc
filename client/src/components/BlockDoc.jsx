import React, { useEffect, useState } from 'react';
import FindPatientForm from './findPatient/FindPatientForm';
import NewJournalEntry from './newJournalEntry/NewJournalEntry';
import PatientCard from './patientCard/PatientCard';
import BlockIcon from './icons/BlockIcon';
import AddPatient from './addPatient/AddPatient';
import AddPatientForm from './addPatient/AddPatientForm';
import { journalService } from '../container/container';
import PatientJournalRecords from './journalRecords/PatientJournalRecords';
import UpdatePatient from './updatePatient/UpdatePatient';

const BlockDoc = () => {
  const [mainView, setMainView] = useState('');
  const [provider, setProvider] = useState(
    '0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199'
  );
  const [mountedPatient, setMountedPatient] = useState(null);

  const [records, setRecords] = useState([]);
  const [journalVersion, setJournalVersion] = useState(0);

  useEffect(() => {
    if (!mountedPatient) return;

    const getPatientJournal = async () => {
      try {
        const response = await journalService.fetchPatientRecords(
          mountedPatient.patientId
        );

        if (response.success) {
          setRecords(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getPatientJournal();
  }, [mountedPatient, journalVersion]);
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
        </div>

        <AddPatient
          setMountedPatient={setMountedPatient}
          setMainView={setMainView}
        />

        <div>
          {mountedPatient && (
            <PatientCard
              mountedPatient={mountedPatient}
              setMainView={setMainView}
              setJournalVersion={setJournalVersion}
            />
          )}
        </div>
      </aside>
      <main>
        {mainView === 'write-journal' && (
          <NewJournalEntry
            provider={provider}
            patient={mountedPatient}
            onEntryCreated={() => setJournalVersion((v) => v + 1)}
          />
        )}

        {mainView === 'read-journal' && (
          <>
            <PatientJournalRecords
              records={records}
              mountedPatient={mountedPatient}
            />
          </>
        )}

        {mainView === 'edit-info' && (
          <UpdatePatient
            key={mountedPatient.patientId}
            mountedPatient={mountedPatient}
            setMountedPatient={setMountedPatient}
          />
        )}

        {mainView === 'add-new-patient' && (
          <AddPatientForm
            mountedPatient={mountedPatient}
            setMountedPatient={setMountedPatient}
          />
        )}
      </main>
    </>
  );
};

export default BlockDoc;
