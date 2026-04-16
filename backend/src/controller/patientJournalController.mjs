import { PatientJournalService } from '../service/patientJournalService.mjs';

const patientJournalService = new PatientJournalService();

export const getPatient = async (req, res) => {
  try {
    const patient = await patientJournalService.searchPatient(
      req.params.patientId
    );
    res.status(200).json({ success: true, patient });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getAllPatients = async (req, res) => {
  try {
    const patients = await patientJournalService.getAllPatients();
    res.status(200).json({ success: true, patients });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const addPatient = async (req, res) => {
  try {
    const data = await patientJournalService.addPatient(req.body);
    res.status(201).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const updatePatient = async (req, res) => {
  try {
    const data = await patientJournalService.updatePatient({
      patientId: req.params.patientId,
      ...req.body,
    });
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const addRecord = async (req, res) => {
  try {
    const data = await patientJournalService.addRecord(req.body);
    res.status(201).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const verifyRecord = async (req, res) => {
  try {
    const data = await patientJournalService.verifyRecordById(req.params.id);
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getRecords = async (req, res) => {
  try {
    const data = await patientJournalService.getRecords(req.params.patientId);
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getData = async (req, res) => {
  res.json({ message: 'API running!' });
};
