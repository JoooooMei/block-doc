import crypto from 'crypto';

export function hashPatientId(patientId) {
  return (
    '0x' +
    crypto
      .createHmac('sha256', process.env.HASH_PATIENT_SECRET)
      .update(String(patientId).normalize('NFC'))
      .digest('hex')
  );
}
