import React from 'react';
import AppIcon from './AppIcon';
import EditProfileIcon from '../icons/EditProfileIcon';
import ReadIcon from '../icons/ReadIcon';
import WriteIcon from '../icons/WriteIcon';

const PatientCard = ({ mountedPatient, setMainView, setJournalVersion }) => {
  return (
    <>
      <div className="patient-card">
        <div className="icon-wrapper">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#1f1f1f">
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
          <h3>
            {mountedPatient.firstName} {mountedPatient.lastName}
          </h3>
        </div>
        <span>{mountedPatient?.patientId}</span>
        <ul>
          <li>
            {mountedPatient?.contact?.street}{' '}
            {mountedPatient?.contact?.streetNumber}{' '}
          </li>
          <li>
            {mountedPatient?.contact?.zip} {mountedPatient?.contact?.city}
          </li>
          <li>{mountedPatient?.contact?.email}</li>
        </ul>
      </div>
      {mountedPatient.patientId && (
        <div className="app-selector-card">
          <div onClick={() => setMainView('edit-info')}>
            <AppIcon name={'Redigera Personuppgifter'} icon={EditProfileIcon} />
          </div>

          <div onClick={() => setMainView('write-journal')}>
            <AppIcon name={'Skriv Journal'} icon={WriteIcon} />
          </div>

          <div onClick={() => { setMainView('read-journal'); setJournalVersion(v => v + 1); }}>
            <AppIcon name="Läs Journal" icon={ReadIcon} />
          </div>
        </div>
      )}
    </>
  );
};

export default PatientCard;
