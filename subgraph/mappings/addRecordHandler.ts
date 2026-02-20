import { RecordAdded } from '../generated/BlockDoc/BlockDoc';
import { JournalRecord } from '../generated/schema';

export function handleRecordAdded(event: RecordAdded): void {
  let id = event.transaction.hash.toHex() + '-' + event.logIndex.toString();
  let record = new JournalRecord(id);

  record.patientId = event.params.patientId.toHex();
  record.recordHash = event.params.recordHash.toHex();
  record.author = event.params.author.toHex();
  record.recordType = event.params.recordType;
  record.timestamp = event.params.timestamp;

  record.save();
}
