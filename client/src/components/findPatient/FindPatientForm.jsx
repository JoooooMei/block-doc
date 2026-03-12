import React, { useState } from 'react';
import { journalService } from '../../container/container';

const FindPatientForm = ({ mountedPatient, setMountedPatient }) => {
  const [patientId, setPatientId] = useState('');
  const [matchingPatients, setMatchingPatients] = useState([]);

  const handleFindPatient = async (value) => {
    if (value.length > 0) {
      const result = await journalService.fetchPatientById(value);

      setMatchingPatients(result.patient);
    }

    if (value.length === 0) {
      setMatchingPatients('');
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setPatientId(value);
    handleFindPatient(value);
  };

  return (
    <div>
      <form className="find-patient-form">
        <div className="input-wrapper">
          <label htmlFor="patientId">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#1f1f1f">
              <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
            </svg>
          </label>
          <div className="find-patient-wrapper">
            <input
              type="text"
              name="patientId"
              value={patientId}
              onChange={handleChange}
              autoComplete="off"
              placeholder="Namn eller personnummer"
            />
            {patientId && patientId.length < 12 && (
              <ul className="find-patient-list">
                {matchingPatients.length > 0 &&
                  matchingPatients.map((p) => (
                    <li
                      key={p.patientId}
                      onClick={() => {
                        setMountedPatient(p),
                          setMatchingPatients(''),
                          setPatientId('');
                      }}>
                      <div>
                        <p>{p.firstName}</p>
                        <p>{p.lastName}</p>
                      </div>
                      <p className="patient-id">{p.patientId}</p>
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default FindPatientForm;
