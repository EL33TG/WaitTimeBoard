import { Router } from "express";
import * as patientService from "../services/patientService.mjs";
const router = new Router();

// Get all patients
router.route("/patients").get(patientService.getPatients);

// Add a patient
router.route("/patients/add").post(patientService.addPatient);

// Delete a patient
router.route("/patients/del").delete(patientService.deletePatient);

export default router;
