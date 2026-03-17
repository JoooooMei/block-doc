import { PatientJournalRepository } from '../repository/patientJournalRepository.mjs';

const repository = new PatientJournalRepository();

export const getPatient = async (req, res) => {
  console.log('GET THIS', req.params.patientId);

  try {
    const patient = await repository.searchPatient(req.params.patientId);

    res.status(200).json({
      success: true,
      patient,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const getAllPatients = async (req, res) => {
  try {
    const patients = await repository.getAllPatients();
    res.status(200).json({ success: true, patients });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const addPatient = async (req, res) => {
  try {
    const data = await repository.addPatient(req.body);
    res.status(201).json({ success: true, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const addRecord = async (req, res) => {
  try {
    const data = await repository.addRecord(req.body);

    res.status(201).json({ success: true, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const verifyRecord = async (req, res) => {
  console.log('VERIFYING');
  try {
    const data = await repository.verifyRecord(req.params.id);
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getRecords = async (req, res) => {
  try {
    console.log('Please get:', req.params.patientId);
    const data = await repository.getRecords(req.params.patientId);

    res.status(200).json({ success: true, data });
  } catch (error) {}
};

export const getData = async (req, res) => {
  res.json({ message: 'API running!' });
};
