import BookModel from "../models/Book.js";
import mongoose from "mongoose";


export const createBook = async (req, res) => {
  try {
    const {
      title,
      author,
      isbn,
      category,
      publisher,
      publishedYear,
      totalCopies,
      shelfLocation
    } = req.body;

    // Check if book already exists
    const existingBook = await BookModel.findOne({ isbn });
    if (existingBook) {
      return res.status(400).json({ message: "Book with this ISBN already exists" });
    }

    const book = await BookModel.create({
      title,
      author,
      isbn,
      category,
      publisher,
      publishedYear,
      totalCopies,
      availableCopies: totalCopies,
      shelfLocation
    });

    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllBooks = async (req, res) => {
  try {
    const { search, category } = req.query;

    let query = { isActive: true };

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { author: { $regex: search, $options: "i" } },
        { isbn: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } }
      ];
    }

    if (category) {
      query.category = category;
    }

    const books = await BookModel.find(query).sort({ createdAt: -1 });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBookById = async (req, res) => {
  try {
    const { bookId } = req.params;

    const book = await BookModel.findById(bookId);

    if (!book || !book.isActive) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBook = async (req, res) => {
  try {
    const { bookId } = req.params;

    // Optional safety check
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      return res.status(400).json({ message: "Invalid book ID" });
    }

    const book = await BookModel.findById(bookId);

    if (!book || !book.isActive) {
      return res.status(404).json({ message: "Book not found" });
    }

    const {
      title,
      author,
      category,
      publisher,
      publishedYear,
      totalCopies,
      shelfLocation
    } = req.body;

    // Handle totalCopies update safely
    if (totalCopies !== undefined) {
      const issuedCopies = book.totalCopies - book.availableCopies;

      if (totalCopies < issuedCopies) {
        return res.status(400).json({
          message: "Total copies cannot be less than already issued copies"
        });
      }

      book.availableCopies = totalCopies - issuedCopies;
      book.totalCopies = totalCopies;
    }

    // Update other fields
    if (title !== undefined) book.title = title;
    if (author !== undefined) book.author = author;
    if (category !== undefined) book.category = category;
    if (publisher !== undefined) book.publisher = publisher;
    if (publishedYear !== undefined) book.publishedYear = publishedYear;
    if (shelfLocation !== undefined) book.shelfLocation = shelfLocation;

    await book.save();

    res.json({
      message: "Book updated successfully",
      book
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const softDeleteBook = async (req, res) => {
  try {
    const { bookId } = req.params;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      return res.status(400).json({ message: "Invalid book ID" });
    }

    const book = await BookModel.findById(bookId);

    if (!book || !book.isActive) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Prevent deletion if book is currently issued
    if (book.availableCopies !== book.totalCopies) {
      return res.status(400).json({
        message: "Cannot deactivate book while copies are issued"
      });
    }

    book.isActive = false;
    await book.save();

    res.json({
      message: "Book deactivated successfully"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
