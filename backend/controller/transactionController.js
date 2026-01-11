import mongoose from "mongoose";
import TransactionModel from "../models/Transaction.js";
import BookModel from "../models/Book.js";
import StudentModel from "../models/Student.js";

export const issueBook = async (req, res) => {
  try {
    const { bookId, studentId, dueDate, note } = req.body;

    // Validate IDs
    if (
      !mongoose.Types.ObjectId.isValid(bookId) ||
      !mongoose.Types.ObjectId.isValid(studentId)
    ) {
      return res.status(400).json({ message: "Invalid book or student ID" });
    }

    const book = await BookModel.findById(bookId);
    const student = await StudentModel.findById(studentId);

    if (!book || !book.isActive) {
      return res.status(404).json({ message: "Book not found or inactive" });
    }

    if (!student || !student.isActive) {
      return res.status(404).json({ message: "Student not found or inactive" });
    }

    if (book.availableCopies <= 0) {
      return res.status(400).json({ message: "No copies available" });
    }

    // Create transaction
    const transaction = await TransactionModel.create({
      book: bookId,
      student: studentId,
      dueDate,
      note,
      status: "Issued"
    });

    // Update available copies
    book.availableCopies -= 1;
    await book.save();

    res.status(201).json({
      message: "Book issued successfully",
      transaction
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const returnBook = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid transaction ID" });
    }

    const transaction = await TransactionModel.findById(id).populate("book");

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    if (transaction.status === "Returned") {
      return res.status(400).json({ message: "Book already returned" });
    }

    // Update transaction
    transaction.status = "Returned";
    transaction.returnDate = new Date();
    await transaction.save();

    // Restore available copies
    transaction.book.availableCopies += 1;
    await transaction.book.save();

    res.json({
      message: "Book returned successfully",
      transaction
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllTransactions = async (req, res) => {
  try {
    const transactions = await TransactionModel.find()
      .populate("book", "title author")
      .populate("student", "fullName studentId")
      .sort({ createdAt: -1 });

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
