import express from "express";
import {
  issueBook,
  returnBook,
  getAllTransactions
} from "../controller/transactionController.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| TRANSACTIONS
|--------------------------------------------------------------------------
*/

// Issue a book
router.post("/issue", issueBook);

// Return a book
router.patch("/return/:id", returnBook);

// Get all transactions (history)
router.get("/", getAllTransactions);

export default router;
