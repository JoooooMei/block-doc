import React from 'react';

const SuccessCard = ({ entry }) => {
  return (
    <>
      <div className="card success-card">
        <h3>Journal sparad</h3>

        <p>
          <b>Personummer</b> {entry.addedToDb.patientId}
        </p>

        <p>
          <b>Anteckning</b> {entry.addedToDb.note}
        </p>
        <p>
          <b>Dignos</b> {entry.addedToDb.diagnose}
          <p>
            <b>Blockchain hash:</b> {entry.addedToBlockchain.hashedRecord}
          </p>
        </p>
      </div>
    </>
  );
};

export default SuccessCard;
