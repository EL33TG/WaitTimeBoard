import { Router } from "express";
import * as waitingTimeService from "../services/waitingTimeService.mjs";
const router = new Router();

// Get all waitingTime
router.route("/logs").get(waitingTimeService.getWaitingTime);

// Add a waitingTime
router.route("/logs/add").post(waitingTimeService.addWaitingTime);

export default router;
