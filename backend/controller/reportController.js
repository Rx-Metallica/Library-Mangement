import Book from "../models/Book.js";
import Student from "../models/Student.js";
import Transaction from "../models/Transaction.js";
import { Parser } from "json2csv";

export const getReportSummary = async (req, res) => {
  try {
    const totalBooks = await Book.countDocuments({ isActive: true });

    const availableCopiesAgg = await Book.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: null, total: { $sum: "$availableCopies" } } }
    ]);

    const availableCopies = availableCopiesAgg[0]?.total || 0;

    const issuedBooks = await Transaction.countDocuments({ status: "Issued" });
    const overdueBooks = await Transaction.countDocuments({ status: "Overdue" });

    const activeStudents = await Student.countDocuments({ isActive: true });

    res.json({
      totalBooks,
      availableCopies,
      issuedBooks,
      overdueBooks,
      activeStudents
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBookReport = async (req, res) => {
  try {
    const books = await Book.find({ isActive: true })
      .select("title author category availableCopies");

    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const exportBookCSV = async (req, res) => {
  try {
    const books = await Book.find({ isActive: true })
      .select("title author category availableCopies")
      .lean();

    const parser = new Parser({
      fields: ["title", "author", "category", "availableCopies"]
    });

    const csv = parser.parse(books);

    res.header("Content-Type", "text/csv");
    res.attachment("book_report.csv");
    res.send(csv);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStudentReport = async (req, res) => {
  try {
    const students = await Student.find()
      .select("studentId fullName department isActive");

    const formatted = students.map(s => ({
      studentId: s.studentId,
      name: s.fullName,
      department: s.department,
      status: s.isActive ? "Active" : "Inactive"
    }));

    res.json(formatted);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const exportStudentCSV = async (req, res) => {
  try {
    const students = await Student.find().lean();

    const formatted = students.map(s => ({
      studentId: s.studentId,
      name: s.fullName,
      department: s.department,
      status: s.isActive ? "Active" : "Inactive"
    }));

    const parser = new Parser({
      fields: ["studentId", "name", "department", "status"]
    });

    const csv = parser.parse(formatted);

    res.header("Content-Type", "text/csv");
    res.attachment("student_report.csv");
    res.send(csv);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTransactionReport = async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .populate("book", "title")
      .populate("student", "fullName studentId");

    const formatted = transactions.map(t => ({
      book: t.book?.title,
      student: `${t.student?.fullName} (${t.student?.studentId})`,
      issueDate: t.issueDate,
      dueDate: t.dueDate,
      status: t.status
    }));

    res.json(formatted);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const exportTransactionCSV = async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .populate("book", "title")
      .populate("student", "fullName studentId")
      .lean();

    const formatted = transactions.map(t => ({
      book: t.book?.title,
      student: `${t.student?.fullName} (${t.student?.studentId})`,
      issueDate: t.issueDate,
      dueDate: t.dueDate,
      status: t.status
    }));

    const parser = new Parser({
      fields: ["book", "student", "issueDate", "dueDate", "status"]
    });

    const csv = parser.parse(formatted);

    res.header("Content-Type", "text/csv");
    res.attachment("transaction_report.csv");
    res.send(csv);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
