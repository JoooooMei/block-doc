import React from 'react';
import PatientCard from '../patientCard/PatientCard';
import { formatDate } from '../../helper/formatDate';

const PatientJournalRecords = ({ records, mountedPatient }) => {
  return (
    <div>
      {console.log(records)}

      <div className="icon-wrapper">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#1f1f1f">
          <path d="M270-80q-45 0-77.5-30.5T160-186v-558q0-38 23.5-68t61.5-38l395-78v640l-379 76q-9 2-15 9.5t-6 16.5q0 11 9 18.5t21 7.5h450v-640h80v720H270Zm90-233 200-39v-478l-200 39v478Zm-80 16v-478l-15 3q-11 2-18 9.5t-7 18.5v457q5-2 10.5-3.5T261-293l19-4Zm-40-472v482-482Z" />
        </svg>
        <h3>
          {mountedPatient.firstName} {mountedPatient.lastName}
        </h3>
      </div>

      <ul className="journal-records-list">
        {records.map((r) => (
          <li key={r._id} className="card margin-top-2">
            <div className="journal-heading">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#1f1f1f">
                <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h168q13-36 43.5-58t68.5-22q38 0 68.5 22t43.5 58h168q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm80-80h280v-80H280v80Zm0-160h400v-80H280v80Zm0-160h400v-80H280v80Zm221.5-198.5Q510-807 510-820t-8.5-21.5Q493-850 480-850t-21.5 8.5Q450-833 450-820t8.5 21.5Q467-790 480-790t21.5-8.5ZM200-200v-560 560Z" />
              </svg>
              <span className="date">{formatDate(r.timestamp)}</span>
            </div>
            <div className="journal-note">
              <div className="note">
                <h4>Anteckning</h4>
                {r.note}
              </div>
              <div>
                <h4>Diagnos</h4>
                {r.diagnose}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientJournalRecords;
