import React from 'react';
import UpdatePatientForm from './UpdatepatientForm';

const UpdatePatient = ({ mountedPatient, setMountedPatient }) => {
  return (
    <div>
      <UpdatePatientForm mountedPatient={mountedPatient} setMountedPatient={setMountedPatient} />
    </div>
  );
};

export default UpdatePatient;
