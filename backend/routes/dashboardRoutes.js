import express from "express";
import {
  getDashboardSummary,
  getRecentActivity
} from "../controller/dashboardController.js";

const router = express.Router();

router.get("/summary", getDashboardSummary);
router.get("/recent-activity", getRecentActivity);

export default router;
