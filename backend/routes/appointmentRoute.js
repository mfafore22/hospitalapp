import express from 'express';
import { fetchAppointments, createAppointment, removeAppointment } from '../controllers/appointmentController.js';

const router = express.Router();

router.get('/', fetchAppointments);
router.post('/', createAppointment);
router.delete('/:id', removeAppointment);

export default router;
