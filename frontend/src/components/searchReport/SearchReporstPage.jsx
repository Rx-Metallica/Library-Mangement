import { useEffect, useState } from "react";
import axios from "axios";
import {
  Search,
  Download,
  Book,
  Users,
  Repeat,
} from "lucide-react";

import Layout from "../Layout";

const API = "http://localhost:4000/api";

const SearchReportsPage = () => {
  const [activeTab, setActiveTab] = useState("books");
  const [search, setSearch] = useState("");

  const [books, setBooks] = useState([]);
  const [students, setStudents] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const [stats, setStats] = useState({
    totalBooks: 0,
    availableCopies: 0,
    issued: 0,
    overdue: 0,
    activeStudents: 0,
  });

  /* ---------------- FETCH DATA ---------------- */
  useEffect(() => {
    axios.get(`${API}/books`).then((res) => {
      const data = res.data || [];
      setBooks(data);
      setStats((s) => ({
        ...s,
        totalBooks: data.length,
        availableCopies: data.reduce(
          (sum, b) => sum + (b?.availableCopies || 0),
          0
        ),
      }));
    });

    axios.get(`${API}/students`).then((res) => {
      const data = res.data || [];
      setStudents(data);
      setStats((s) => ({
        ...s,
        activeStudents: data.filter((x) => x?.isActive).length,
      }));
    });

    axios.get(`${API}/transactions`).then((res) => {
      const data = res.data || [];
      setTransactions(data);
      setStats((s) => ({
        ...s,
        issued: data.filter((t) => t?.status === "Issued").length,
        overdue: 0,
      }));
    });
  }, []);

  /* ---------------- EXPORT ---------------- */
  const exportCSV = (url) => {
    window.open(url, "_blank");
  };

  const q = search.toLowerCase();

  /* ---------------- SAFE FILTERS ---------------- */
  const filteredBooks = books.filter(
    (b) =>
      b &&
      (
        b.title?.toLowerCase().includes(q) ||
        b.author?.toLowerCase().includes(q)
      )
  );

  const filteredStudents = students.filter(
    (s) =>
      s &&
      (
        s.fullName?.toLowerCase().includes(q) ||
        s.studentId?.toLowerCase().includes(q)
      )
  );

  const filteredTransactions = transactions.filter(
    (t) =>
      t &&
      t.book &&
      t.student &&
      (
        t.book.title?.toLowerCase().includes(q) ||
        t.student.fullName?.toLowerCase().includes(q)
      )
  );

  return (
    <Layout>
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-semibold">Search & Reports</h1>
        <p className="text-gray-500">Search and export data</p>
      </div>

      {/* SEARCH */}
      <div className="relative w-130 mb-6">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2
                     text-slate-700 pointer-events-none z-10"
        />
        <input
          className="w-full h-11 pl-11 pr-4 rounded-xl border border-black/20
                     focus:outline-none focus:ring-2 focus:ring-black/30"
          placeholder="Search across books, students, and transactions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* STATS */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        {[
          ["Total Books", stats.totalBooks],
          ["Available Copies", stats.availableCopies],
          ["Issued", stats.issued],
          ["Overdue", stats.overdue],
          ["Active Students", stats.activeStudents],
        ].map(([label, value]) => (
          <div key={label} className="glass rounded-xl p-5">
            <p className="text-sm text-gray-500">{label}</p>
            <p className="text-2xl font-semibold">{value}</p>
          </div>
        ))}
      </div>

      {/* TABS */}
      <div className="flex bg-slate-100 rounded-xl p-1 w-fit mb-6">
        <Tab
          icon={Book}
          label={`Books (${books.length})`}
          active={activeTab === "books"}
          onClick={() => setActiveTab("books")}
        />
        <Tab
          icon={Users}
          label={`Students (${students.length})`}
          active={activeTab === "students"}
          onClick={() => setActiveTab("students")}
        />
        <Tab
          icon={Repeat}
          label={`Transactions (${transactions.length})`}
          active={activeTab === "transactions"}
          onClick={() => setActiveTab("transactions")}
        />
      </div>

      {/* TABLE */}
      <div className="glass rounded-xl overflow-hidden">
        <TableHeader
          title={
            activeTab === "books"
              ? "Books Report"
              : activeTab === "students"
              ? "Students Report"
              : "Transactions Report"
          }
          onExport={() =>
            exportCSV(
              activeTab === "books"
                ? `${API}/reports/books/csv`
                : activeTab === "students"
                ? `${API}/reports/students/csv`
                : `${API}/reports/transactions/csv`
            )
          }
        />

        <div className="max-h-105 overflow-y-auto">
          <table className="w-full">
            <thead className="sticky top-0 bg-white z-10">
              {activeTab === "books" && (
                <tr>
                  <Th>Title</Th>
                  <Th>Author</Th>
                  <Th>Category</Th>
                  <Th>Available</Th>
                </tr>
              )}
              {activeTab === "students" && (
                <tr>
                  <Th>Student ID</Th>
                  <Th>Name</Th>
                  <Th>Department</Th>
                  <Th>Status</Th>
                </tr>
              )}
              {activeTab === "transactions" && (
                <tr>
                  <Th>Book</Th>
                  <Th>Student</Th>
                  <Th>Issue Date</Th>
                  <Th>Due Date</Th>
                  <Th>Status</Th>
                </tr>
              )}
            </thead>

            <tbody>
              {activeTab === "books" &&
                filteredBooks.map((b) => (
                  <tr key={b._id} className="border-b">
                    <Td>{b.title || "—"}</Td>
                    <Td>{b.author || "—"}</Td>
                    <Td>{b.category || "—"}</Td>
                    <Td>
                      <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
                        {b.availableCopies}/{b.totalCopies}
                      </span>
                    </Td>
                  </tr>
                ))}

              {activeTab === "students" &&
                filteredStudents.map((s) => (
                  <tr key={s._id} className="border-b">
                    <Td>{s.studentId}</Td>
                    <Td>{s.fullName}</Td>
                    <Td>{s.department}</Td>
                    <Td>
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          s.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-slate-200 text-slate-600"
                        }`}
                      >
                        {s.isActive ? "Active" : "Inactive"}
                      </span>
                    </Td>
                  </tr>
                ))}

              {activeTab === "transactions" &&
                filteredTransactions.map((t) => (
                  <tr key={t._id} className="border-b">
                    <Td>{t.book?.title || "Deleted Book"}</Td>
                    <Td>{t.student?.fullName || "Deleted Student"}</Td>
                    <Td>{new Date(t.issueDate).toLocaleDateString()}</Td>
                    <Td>{new Date(t.dueDate).toLocaleDateString()}</Td>
                    <Td>
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          t.status === "Returned"
                            ? "bg-green-100 text-green-700"
                            : "bg-slate-200 text-slate-700"
                        }`}
                      >
                        {t.status}
                      </span>
                    </Td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

/* ---------------- SMALL COMPONENTS ---------------- */

const Tab = ({ icon: Icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium ${
      active ? "bg-white shadow" : "text-slate-500"
    }`}
  >
    <Icon size={16} />
    {label}
  </button>
);

const TableHeader = ({ title, onExport }) => (
  <div className="flex justify-between items-center px-6 py-4 border-b">
    <h3 className="font-semibold">{title}</h3>
    <button
      onClick={onExport}
      className="flex items-center gap-2 px-4 py-2 rounded-xl border text-sm"
    >
      <Download size={16} />
      Export CSV
    </button>
  </div>
);

const Th = ({ children }) => (
  <th className="px-6 py-4 text-left text-sm font-semibold bg-white">
    {children}
  </th>
);

const Td = ({ children }) => (
  <td className="px-6 py-4">{children}</td>
);

export default SearchReportsPage;