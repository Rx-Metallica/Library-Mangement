import { useEffect, useState } from "react";
import axios from "axios";
import { X } from "lucide-react";
import { toast } from "react-toastify";

const API = "http://localhost:4000/api/books";

const BookFormSheet = ({ open, onClose, refresh, book }) => {
  const [form, setForm] = useState({
    title: "",
    author: "",
    isbn: "",
    category: "",
    publisher: "",
    publishedYear: "",
    totalCopies: "",
    shelfLocation: "",
  });

  /* Populate form in edit mode */
  useEffect(() => {
    if (book) {
      setForm({
        title: book.title ?? "",
        author: book.author ?? "",
        isbn: book.isbn ?? "",
        category: book.category ?? "",
        publisher: book.publisher ?? "",
        publishedYear: book.publishedYear ?? "",
        totalCopies: book.totalCopies ?? "",
        shelfLocation: book.shelfLocation ?? "",
      });
    } else {
      setForm({
        title: "",
        author: "",
        isbn: "",
        category: "",
        publisher: "",
        publishedYear: "",
        totalCopies: "",
        shelfLocation: "",
      });
    }
  }, [book]);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (book) {
        /* UPDATE — ISBN NOT SENT (backend rule) */
        const updatePayload = {
          title: form.title,
          author: form.author,
          category: form.category,
          publisher: form.publisher,
          publishedYear: Number(form.publishedYear),
          totalCopies: Number(form.totalCopies),
          shelfLocation: form.shelfLocation,
        };

        await axios.put(`${API}/${book._id}`, updatePayload);
        toast.success("Book updated successfully");
      } else {
        /* CREATE — FULL PAYLOAD */
        const createPayload = {
          title: form.title,
          author: form.author,
          isbn: form.isbn,
          category: form.category,
          publisher: form.publisher,
          publishedYear: Number(form.publishedYear),
          totalCopies: Number(form.totalCopies),
          shelfLocation: form.shelfLocation,
        };

        await axios.post(API, createPayload);
        toast.success("Book added successfully");
      }

      await refresh();
      onClose();
    } catch (err) {
      const msg =
        err.response?.data?.message || "Operation failed. Try again.";
      toast.error(msg);
      console.error("Book API Error:", err.response?.data || err.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 relative"
      >
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-black"
        >
          <X />
        </button>

        <h2 className="text-2xl font-semibold mb-6">
          {book ? "Edit Book" : "Add New Book"}
        </h2>

        <div className="grid grid-cols-2 gap-5">
          {/* Title */}
          <div className="col-span-2">
            <label className="text-sm font-medium">Title *</label>
            <input
              className="mt-1 w-full rounded-xl border px-4 py-2"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
              required
            />
          </div>

          {/* Author */}
          <div>
            <label className="text-sm font-medium">Author *</label>
            <input
              className="mt-1 w-full rounded-xl border px-4 py-2"
              value={form.author}
              onChange={(e) =>
                setForm({ ...form, author: e.target.value })
              }
              required
            />
          </div>

          {/* ISBN (disabled on edit) */}
          <div>
            <label className="text-sm font-medium">ISBN *</label>
            <input
              className="mt-1 w-full rounded-xl border px-4 py-2"
              value={form.isbn}
              disabled={!!book}
              onChange={(e) =>
                setForm({ ...form, isbn: e.target.value })
              }
              required={!book}
            />
          </div>

          {/* Category */}
          <div>
            <label className="text-sm font-medium">Category</label>
            <input
              className="mt-1 w-full rounded-xl border px-4 py-2"
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value })
              }
            />
          </div>

          {/* Publisher */}
          <div>
            <label className="text-sm font-medium">Publisher</label>
            <input
              className="mt-1 w-full rounded-xl border px-4 py-2"
              value={form.publisher}
              onChange={(e) =>
                setForm({ ...form, publisher: e.target.value })
              }
            />
          </div>

          {/* Published Year */}
          <div>
            <label className="text-sm font-medium">Published Year</label>
            <input
              type="number"
              className="mt-1 w-full rounded-xl border px-4 py-2"
              value={form.publishedYear}
              onChange={(e) =>
                setForm({ ...form, publishedYear: e.target.value })
              }
            />
          </div>

          {/* Total Copies */}
          <div>
            <label className="text-sm font-medium">Total Copies *</label>
            <input
              type="number"
              className="mt-1 w-full rounded-xl border px-4 py-2"
              value={form.totalCopies}
              onChange={(e) =>
                setForm({ ...form, totalCopies: e.target.value })
              }
              required
            />
          </div>

          {/* Shelf Location */}
          <div className="col-span-2">
            <label className="text-sm font-medium">Shelf Location</label>
            <input
              className="mt-1 w-full rounded-xl border px-4 py-2"
              value={form.shelfLocation}
              onChange={(e) =>
                setForm({ ...form, shelfLocation: e.target.value })
              }
            />
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl border"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-6 py-2 rounded-xl bg-slate-900 text-white"
          >
            {book ? "Update Book" : "Add Book"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookFormSheet;
