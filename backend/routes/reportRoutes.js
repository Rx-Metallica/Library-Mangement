import express from "express";
import {
  getReportSummary,
  getBookReport,
  getStudentReport,
  getTransactionReport,
  exportBookCSV,
  exportStudentCSV,
  exportTransactionCSV
} from "../controller/reportController.js";

const router = express.Router();

/* Summary */
router.get("/summary", getReportSummary);

/* Reports */
router.get("/books", getBookReport);
router.get("/students", getStudentReport);
router.get("/transactions", getTransactionReport);

/* CSV Exports */
router.get("/books/csv", exportBookCSV);
router.get("/students/csv", exportStudentCSV);
router.get("/transactions/csv", exportTransactionCSV);

export default router;
