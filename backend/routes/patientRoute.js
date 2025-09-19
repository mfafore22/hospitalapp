import express from 'express';
import { fetchPatients, createPatient } from '../controllers/patientController.js';

const router = express.Router();

router.get('/', fetchPatients);
router.post('/', createPatient);

export default router;
