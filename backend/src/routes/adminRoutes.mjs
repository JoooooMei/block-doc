import { Router } from 'express';
import {
  addProvider,
  authorizeProvider,
  revokeProvider,
} from '../controller/adminController.mjs';

const adminRouter = Router();

adminRouter.post('/add-provider', addProvider);
adminRouter.post('/authorize-provider', authorizeProvider);
adminRouter.post('/revoke-provider', revokeProvider);

export default adminRouter;
