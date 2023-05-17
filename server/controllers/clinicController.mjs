import { Router } from "express";
import * as clinicService from "../services/clinicService.mjs";
const router = new Router();

// Get all clinics
router.route("/clinics").get(clinicService.getClinics);

// Add a clinic
router.route("/clinics/add").post(clinicService.addClinic);

// Add a new group clinic
router.route("/clinics/add-group").post(clinicService.createGroupClinic)

// Update a clinic
router.route("/clinics/update").put(clinicService.updateClinic);

// Delete a clinic
router.route("/clinics/del").delete(clinicService.deleteClinic);

export default router;
