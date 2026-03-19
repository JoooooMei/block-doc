import React from 'react';
import {
  formatDate,
  formatDateSeconds,
  formatUnixTimestamp,
} from '../../helper/formatDate';

const PatientJournalProof = ({ proof }) => {
  return (
    <div className="proof">
      {console.log('Proof: ', proof)}
      <ul>
        <li>
          <b>Verified:</b> {proof.verified ? 'true' : 'false'}
        </li>
        <li>
          <b>Blockchain hash:</b> {proof.onChain?.recordHash}
        </li>
        <li>
          <b>Verification:</b> {proof?.computedRecordHash}
        </li>
        <li>
          <b>Added to database:</b> {formatDateSeconds(proof?.timestamp)}
        </li>
        <li>
          <b>Added to blockchain:</b>{' '}
          {formatUnixTimestamp(proof?.onChain?.timestamp)}
        </li>
      </ul>
    </div>
  );
};

export default PatientJournalProof;
