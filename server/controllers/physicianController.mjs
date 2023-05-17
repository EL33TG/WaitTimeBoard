import { Router } from "express";
import * as physicianService from "../services/physicianService.mjs";
const router = new Router();

// Get all physicians
router.route("/physicians").get(physicianService.getPhysicians);

// Add a physician
router.route("/physicians/add").post(physicianService.addPhysician);

// Delete a physician
router.route("/physicians/del").delete(physicianService.deletePhysician);

export default router;
