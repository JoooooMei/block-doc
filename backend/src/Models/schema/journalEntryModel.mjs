import mongoose from 'mongoose';

const journalEntrySchema = new mongoose.Schema({
  provider: {
    type: String,
    required: [true, 'No provider selected for this entry'],
  },
  patientId: {
    type: String,
    required: [true, 'No patient selected for this entry'],
  },
  recordType: Number,
  note: String,
  diagnose: String,
  date: String,
  timestamp: String,
  blockchainTimestamp: String,
  hashVersion: String,
  recordId: { type: String, unique: true },
  txHash: String,
});

export default mongoose.model('journalEntry', journalEntrySchema);
