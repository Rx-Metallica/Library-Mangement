import { useEffect, useState } from "react";
import axios from "axios";
import { Plus, Search } from "lucide-react";
import { toast } from "react-toastify";

import Layout from "../Layout";
import BookRow from "./BookRow";
import BookFormSheet from "./BookFormSheet";

const API = "http://localhost:4000/api/books";

const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);

  /* Fetch all books */
  const fetchBooks = async () => {
    try {
      const res = await axios.get(API);
      setBooks(res.data);
    } catch (err) {
      const message =
        err.response?.data?.message ||
        "Failed to load books";

      toast.error(message);
      console.error("Fetch books error:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  /* Activate / Deactivate */
  const toggleStatus = async (book) => {
    try {
      await axios.patch(
        `${API}/${book._id}/${book.isActive ? "deactivate" : "activate"}`
      );

      toast.success("Action successful");
      fetchBooks();
    } catch (err) {
      const message =
        err.response?.data?.message ||
        "Action failed. Please try again.";

      toast.error(message);
      console.error("Toggle status error:", err.response?.data || err.message);
    }
  };

  /* Client-side search */
  const filteredBooks = books.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-semibold">Books Management</h1>
        <p className="text-gray-500">Add, edit, and manage books</p>
      </div>

      {/* Search + Add */}
      <div className="flex items-center justify-between mb-6 gap-4">
        {/* Search */}
        <div className="relative w-96">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-700"
          />

          <input
            type="text"
            placeholder="Search books by title or author..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-11 pl-11 pr-4 rounded-xl
                       bg-white/70 backdrop-blur-md
                       border border-black/20
                       focus:outline-none focus:ring-2 focus:ring-black/30"
          />
        </div>

        {/* Add Book */}
        <button
          onClick={() => {
            setEditingBook(null);
            setOpen(true);
          }}
          className="h-11 bg-slate-900 text-white px-6 rounded-xl
                     flex items-center gap-2 whitespace-nowrap"
        >
          <Plus size={18} />
          Add Book
        </button>
      </div>

      {/* Table */}
      <div className="glass overflow-hidden rounded-xl">
        <table className="w-full">
          <thead className="bg-white/40">
            <tr>
              {[
                "Title",
                "Author",
                "ISBN",
                "Category",
                "Available",
                "Actions",
              ].map((h) => (
                <th
                  key={h}
                  className="px-6 py-4 text-left text-sm font-semibold"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
                <BookRow
                  key={book._id}
                  book={book}
                  onEdit={(b) => {
                    setEditingBook(b);
                    setOpen(true);
                  }}
                  onToggle={toggleStatus}
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-10 text-center text-gray-500"
                >
                  No books found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Modal */}
      <BookFormSheet
        open={open}
        book={editingBook}
        onClose={() => setOpen(false)}
        refresh={fetchBooks}
      />
    </Layout>
  );
};

export default BooksPage;