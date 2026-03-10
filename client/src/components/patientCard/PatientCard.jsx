import React from 'react';
import AppIcon from './AppIcon';
import EditProfileIcon from '../icons/EditProfileIcon';
import ReadIcon from '../icons/ReadIcon';
import WriteIcon from '../icons/WriteIcon';

const PatientCard = ({ mountedPatient, setMainView }) => {
  return (
    <>
      <div className="patient-card">
        {console.log('Mounted Patient', mountedPatient)}
        <h2>
          {mountedPatient.firstName} {mountedPatient.lastName}
        </h2>
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
        <hr />
      </div>
      {mountedPatient.patientId && (
        <div className="app-selector-card">
          <div onClick={() => setMainView('edit-info')}>
            <AppIcon name={'Redigera Personuppgifter'} icon={EditProfileIcon} />
          </div>

          <div onClick={() => setMainView('write-journal')}>
            <AppIcon name={'Skriv Journal'} icon={WriteIcon} />
          </div>

          <div onClick={() => setMainView('read-journal')}>
            <AppIcon name="Läs Journal" icon={ReadIcon} />
          </div>
        </div>
      )}
    </>
  );
};

export default PatientCard;
