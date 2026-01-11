import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    author: {
      type: String,
      required: true,
      trim: true
    },
    isbn: {
      type: String,
      required: true,
      unique: true
    },
    category: {
      type: String,
      required: true
    },
    publisher: {
      type: String
    },
    publishedYear: {
      type: Number
    },
    availableCopies: {
      type: Number,
      required: true,
      min: 0
    },
    totalCopies: {
      type: Number,
      required: true,
      min: 0
    },
    shelfLocation: {
      type: String
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

const BookModel = mongoose.models.Book || mongoose.model("Book", bookSchema);


export default BookModel;