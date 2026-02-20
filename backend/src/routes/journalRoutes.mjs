import { Router } from 'express';
import {
  addRecord,
  getData,
  verifyRecord,
} from '../controller/patientJournalController.mjs';

const journalRouter = Router();

journalRouter.get('/data', getData);
journalRouter.post('/add-record', addRecord);
journalRouter.post('/verify-record', verifyRecord);

export default journalRouter;
