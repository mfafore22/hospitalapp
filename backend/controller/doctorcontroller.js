import { getDoctors, addDoctor } from '../models/doctorModel.js';

export const fetchDoctors = async (req, res) => {
  try {
    const doctors = await getDoctors();
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createDoctor = async (req, res) => {
  try {
    const { name, available } = req.body;
    const doctor = await addDoctor(name, available);
    res.status(201).json(doctor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
