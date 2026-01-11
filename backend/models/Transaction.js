import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true
    },
    issueDate: {
      type: Date,
      default: Date.now
    },
    dueDate: {
      type: Date,
      required: true
    },
    returnDate: {
      type: Date
    },
    status: {
      type: String,
      enum: ["Issued", "Returned", "Overdue"],
      default: "Issued"
    },
    note: {
      type: String
    }
  },
  { timestamps: true }
);

const TransactionModel = mongoose.models.Transaction || mongoose.model("Transaction", transactionSchema);

export default TransactionModel;