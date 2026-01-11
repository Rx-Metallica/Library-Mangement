import express from "express";

import { createBook, getAllBooks,getBookById, updateBook, softDeleteBook } from "../controller/bookController.js";

const router = express.Router();

/*
  Books CRUD
*/
// Create book
router.post("/", createBook);

// Get all books (search/filter)
router.get("/", getAllBooks);

// Get single book by ID
router.get("/:bookId", getBookById);

// Update book
router.put("/:bookId", updateBook);

// Soft delete book
router.patch("/:bookId/deactivate", softDeleteBook);

export default router;