import { Router } from 'express';
import {
  addPatient,
  addRecord,
  getAllPatients,
  getData,
  verifyRecord,
} from '../controller/patientJournalController.mjs';

const journalRouter = Router();

journalRouter.get('/data', getData);
journalRouter.get('/patients', getAllPatients);

journalRouter.post('/patients', addPatient);
journalRouter.post('/add-record', addRecord);
journalRouter.post('/verify-record', verifyRecord);

export default journalRouter;
