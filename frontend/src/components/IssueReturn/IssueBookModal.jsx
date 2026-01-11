import { useEffect, useState } from "react";
import axios from "axios";
import { X, Search, BookOpen, Users } from "lucide-react";
import { toast } from "react-toastify";

const API = "http://localhost:4000/api";

const IssueBookModal = ({ open, onClose, refresh }) => {
  const [books, setBooks] = useState([]);
  const [students, setStudents] = useState([]);

  const [form, setForm] = useState({
    bookId: "",
    studentId: "",
    dueDate: "",
    note: "",
  });

  const [bookSearch, setBookSearch] = useState("");
  const [studentSearch, setStudentSearch] = useState("");

  const [showBooks, setShowBooks] = useState(false);
  const [showStudents, setShowStudents] = useState(false);

  useEffect(() => {
    if (open) {
      axios.get(`${API}/books`).then((res) => setBooks(res.data));
      axios.get(`${API}/students`).then((res) => setStudents(res.data));
    }
  }, [open]);

  if (!open) return null;

  const submit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${API}/transactions/issue`, form);
      toast.success("Book issued successfully");
      refresh();
      onClose();
    } catch {
      toast.error("Issue failed");
    }
  };

  const filteredBooks = books.filter((b) =>
    b.title.toLowerCase().includes(bookSearch.toLowerCase())
  );

  const filteredStudents = students.filter((s) =>
    s.fullName.toLowerCase().includes(studentSearch.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <form
        onSubmit={submit}
        className="relative w-full max-w-xl bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8"
      >
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5"
        >
          <X />
        </button>

        <h2 className="text-2xl font-semibold mb-6">Issue Book</h2>

        {/* BOOK SEARCH */}
        <div className="relative mb-5">
          <label className="text-sm font-medium flex gap-2 items-center">
            <BookOpen size={16} /> Book
          </label>

          <div className="relative mt-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              className="w-full pl-10 pr-4 py-2 rounded-xl border"
              placeholder="Search book..."
              value={bookSearch}
              onChange={(e) => {
                setBookSearch(e.target.value);
                setShowBooks(true);
              }}
            />
          </div>

          {showBooks && bookSearch && (
            <div className="absolute z-50 mt-1 w-full bg-white border rounded-xl shadow max-h-40 overflow-y-auto">
              {filteredBooks.length === 0 ? (
                <div className="px-4 py-2 text-sm text-gray-500">
                  No books found
                </div>
              ) : (
                filteredBooks.map((b) => (
                  <div
                    key={b._id}
                    onClick={() => {
                      setForm({ ...form, bookId: b._id });
                      setBookSearch(b.title);
                      setShowBooks(false); // ✅ CLOSE DROPDOWN
                    }}
                    className="px-4 py-2 cursor-pointer hover:bg-slate-100"
                  >
                    {b.title}
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* STUDENT SEARCH */}
        <div className="relative mb-5">
          <label className="text-sm font-medium flex gap-2 items-center">
            <Users size={16} /> Student
          </label>

          <div className="relative mt-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              className="w-full pl-10 pr-4 py-2 rounded-xl border"
              placeholder="Search student..."
              value={studentSearch}
              onChange={(e) => {
                setStudentSearch(e.target.value);
                setShowStudents(true);
              }}
            />
          </div>

          {showStudents && studentSearch && (
            <div className="absolute z-50 mt-1 w-full bg-white border rounded-xl shadow max-h-40 overflow-y-auto">
              {filteredStudents.length === 0 ? (
                <div className="px-4 py-2 text-sm text-gray-500">
                  No students found
                </div>
              ) : (
                filteredStudents.map((s) => (
                  <div
                    key={s._id}
                    onClick={() => {
                      setForm({ ...form, studentId: s._id });
                      setStudentSearch(s.fullName);
                      setShowStudents(false); // ✅ CLOSE DROPDOWN
                    }}
                    className="px-4 py-2 cursor-pointer hover:bg-slate-100"
                  >
                    {s.fullName}
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* DUE DATE */}
        <input
          type="date"
          required
          className="w-full rounded-xl border px-4 py-2 mb-4"
          value={form.dueDate}
          onChange={(e) =>
            setForm({ ...form, dueDate: e.target.value })
          }
        />

        {/* NOTE */}
        <textarea
          className="w-full rounded-xl border px-4 py-2"
          placeholder="Note (optional)"
          value={form.note}
          onChange={(e) =>
            setForm({ ...form, note: e.target.value })
          }
        />

        {/* ACTIONS */}
        <div className="mt-6 flex justify-end gap-3">
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
            Issue Book
          </button>
        </div>
      </form>
    </div>
  );
};

export default IssueBookModal;