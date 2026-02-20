import canonicalize from 'canonicalize';
import crypto from 'crypto';
import { normalize } from './normalizeRecord.mjs';

export const hashRecord = (record) => {
  const normalized = normalize(record);
  const canonical = canonicalize(normalized);

  if (!canonical) {
    throw new Error('Canonicalization failed');
  }

  return (
    '0x' +
    crypto
      .createHmac('sha256', process.env.HASH_PATIENT_SECRET)
      .update(canonical)
      .digest('hex')
  );
};
