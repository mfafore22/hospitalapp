import express from 'express';
import { fetchDoctors, createDoctor } from '../controllers/doctorController.js';

const router = express.Router();

router.get('/', fetchDoctors);
router.post('/', createDoctor);

export default router;
