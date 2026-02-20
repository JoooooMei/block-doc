import { PatientJournalRepository } from '../repository/patientJournalRepository.mjs';

const repository = new PatientJournalRepository();

export const addProvider = async (req, res) => {
  try {
    const user = await new PatientJournalRepository().addProvider(req.body);

    res.status(201).json({ success: true, statusCode: 201, data: user });
  } catch (error) {}
};

export const authorizeProvider = async (req, res) => {
  try {
    const { providerAddress } = req.body;
    const txHash = await repository.authorizeProvider(providerAddress);
    res.json({ success: true, txHash });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};

export const revokeProvider = async (req, res) => {
  try {
    const { providerAddress } = req.body;
    const txHash = await repository.revokeProvider(providerAddress);
    res.json({ success: true, txHash });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};
