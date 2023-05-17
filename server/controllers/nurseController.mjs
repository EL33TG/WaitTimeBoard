import { Router } from "express";
import * as nurseService from "../services/nurseService.mjs";
const router = new Router();

// Get all nurses
router.route("/nurses").get(nurseService.getNurses);

// Add a nurse
router.route("/nurses/add").post(nurseService.addNurse);

// Delete a nurse
router.route("/nurses/del").delete(nurseService.deleteNurse);

export default router;
