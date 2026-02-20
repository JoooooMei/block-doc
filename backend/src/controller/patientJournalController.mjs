import { PatientJournalRepository } from '../repository/patientJournalRepository.mjs';

const repository = new PatientJournalRepository();

export const addRecord = async (req, res) => {
  try {
    const data = await repository.addRecord(req.body);

    res.json({ success: true, data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};

export const verifyRecord = async (req, res) => {
  try {
    const data = await repository.verifyRecord(req.body);
  } catch (error) {}
};

export const getData = async (req, res) => {
  res.json({ message: 'API running!' });
};
