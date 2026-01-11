import BookModel from "../models/Book.js";
import StudentModel from "../models/Student.js";
import TransactionModel from "../models/Transaction.js";

/*
|--------------------------------------------------------------------------
| DASHBOARD SUMMARY
| GET /api/dashboard/summary
|--------------------------------------------------------------------------
*/
export const getDashboardSummary = async (req, res) => {
  try {
    const totalBooks = await BookModel.countDocuments({ isActive: true });

    const activeStudents = await StudentModel.countDocuments({ isActive: true });

    const booksIssued = await TransactionModel.countDocuments({
      status: "Issued"
    });

    const overdueBooks = await TransactionModel.countDocuments({
      status: "Overdue"
    });

    res.json({
      totalBooks,
      activeStudents,
      booksIssued,
      overdueBooks
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/*
|--------------------------------------------------------------------------
| RECENT ACTIVITY
| GET /api/dashboard/recent-activity
|--------------------------------------------------------------------------
*/
export const getRecentActivity = async (req, res) => {
  try {
    const recentTransactions = await TransactionModel.find()
      .populate("book", "title author")
      .populate("student", "fullName studentId")
      .sort({ createdAt: -1 })
      .limit(5);

    res.json(recentTransactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
