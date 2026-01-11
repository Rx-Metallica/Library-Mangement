import { useEffect, useState } from "react";
import axios from "axios";
import { BookOpen, Search } from "lucide-react";
import { toast } from "react-toastify";

import Layout from "../Layout";
import TransactionRow from "./TransactionRow";
import IssueBookModal from "./IssueBookModal";

const API = "http://localhost:4000/api/transactions";

const IssueReturnPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [tab, setTab] = useState("active"); // active | returned
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const fetchTransactions = async () => {
    try {
      const res = await axios.get(API);
      setTransactions(res.data || []);
    } catch {
      toast.error("Failed to load transactions");
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const returnBook = async (id) => {
    try {
      await axios.patch(`${API}/return/${id}`);
      toast.success("Book returned");
      fetchTransactions();
    } catch {
      toast.error("Return failed");
    }
  };

  const q = search.toLowerCase();

  /* ---------------- SAFE FILTER ---------------- */
  const filtered = transactions
    .filter((t) => {
      if (!t) return false;

      // tab filter
      if (tab === "active" && t.status !== "Issued") return false;
      if (tab === "returned" && t.status !== "Returned") return false;

      // search filter (SAFE)
      const bookTitle = t.book?.title?.toLowerCase() || "";
      const studentName = t.student?.fullName?.toLowerCase() || "";

      return (
        bookTitle.includes(q) ||
        studentName.includes(q)
      );
    });

  const activeCount = transactions.filter(
    (t) => t?.status === "Issued"
  ).length;

  const returnedCount = transactions.filter(
    (t) => t?.status === "Returned"
  ).length;

  return (
    <Layout>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-semibold">Issue & Return</h1>
        <p className="text-gray-500">Manage book transactions</p>
      </div>

      {/* Search + Issue Button */}
      <div className="flex items-center justify-between mb-6 gap-4">
        {/* SEARCH */}
        <div className="relative w-105">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2
                       text-slate-700 pointer-events-none z-10"
          />
          <input
            className="w-full h-11 pl-11 pr-4 rounded-xl
                       bg-white border border-black/20
                       focus:outline-none focus:ring-2 focus:ring-black/30"
            placeholder="Search by book or student..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <button
          onClick={() => setOpen(true)}
          className="h-11 bg-slate-900 text-white px-6 rounded-xl
                     flex items-center gap-2"
        >
          <BookOpen size={18} />
          Issue Book
        </button>
      </div>

      {/* Tabs */}
      <div className="flex bg-slate-100 rounded-xl p-1 w-fit mb-6">
        <button
          onClick={() => setTab("active")}
          className={`px-6 py-2 rounded-lg text-sm font-medium ${
            tab === "active" ? "bg-white shadow" : "text-slate-500"
          }`}
        >
          Active ({activeCount})
        </button>

        <button
          onClick={() => setTab("returned")}
          className={`px-6 py-2 rounded-lg text-sm font-medium ${
            tab === "returned" ? "bg-white shadow" : "text-slate-500"
          }`}
        >
          Returned ({returnedCount})
        </button>
      </div>

      {/* Table / Empty State */}
      {filtered.length === 0 ? (
        <div className="glass rounded-xl p-20 text-center text-slate-500">
          <BookOpen className="mx-auto mb-4" size={32} />
          <p className="font-semibold">No {tab} issues</p>
          <p className="text-sm">
            {tab === "active"
              ? "All books have been returned"
              : "No books returned yet"}
          </p>
        </div>
      ) : (
        <div className="glass rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-white/40">
              <tr>
                {["Book", "Student", "Issue Date", "Due Date", "Status"].map(
                  (h) => (
                    <th
                      key={h}
                      className="px-6 py-4 text-left text-sm font-semibold"
                    >
                      {h}
                    </th>
                  )
                )}

                {tab === "active" && (
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Action
                  </th>
                )}
              </tr>
            </thead>

            <tbody>
              {filtered.map((tx) => (
                <TransactionRow
                  key={tx._id}
                  transaction={tx}
                  onReturn={returnBook}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Issue Modal */}
      <IssueBookModal
        open={open}
        onClose={() => setOpen(false)}
        refresh={fetchTransactions}
      />
    </Layout>
  );
};

export default IssueReturnPage;