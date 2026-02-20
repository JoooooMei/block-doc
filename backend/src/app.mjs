import express from 'express';
import dotenv from 'dotenv';
import { connectDb } from './db/blockDockDB.mjs';
import journalRouter from './routes/journalRoutes.mjs';
import adminRouter from './routes/adminRoutes.mjs';

dotenv.config({ path: './config/config.env' });

await connectDb();

const app = express();

app.use(express.json());

app.use('/api/v1', journalRouter);
app.use('/api/v1', adminRouter);

export { app };
