import { RotateCcw } from "lucide-react";

const TransactionRow = ({ transaction, onReturn }) => {
  if (!transaction) return null;

  const bookTitle = transaction.book?.title || "Deleted Book";
  const bookAuthor = transaction.book?.author || "—";

  const studentName =
    transaction.student?.fullName || "Deleted Student";
  const studentId =
    transaction.student?.studentId || "—";

  const issueDate = transaction.issueDate
    ? new Date(transaction.issueDate).toLocaleDateString()
    : "—";

  const dueDate = transaction.dueDate
    ? new Date(transaction.dueDate).toLocaleDateString()
    : "—";

  const status = transaction.status || "Unknown";

  return (
    <tr className="border-b border-black/5 hover:bg-white/30">
      {/* BOOK */}
      <td className="px-6 py-4">
        <div className="font-medium">{bookTitle}</div>
        <div className="text-sm text-slate-500">{bookAuthor}</div>
      </td>

      {/* STUDENT */}
      <td className="px-6 py-4">
        <div className="font-medium">{studentName}</div>
        <div className="text-sm text-slate-500">{studentId}</div>
      </td>

      {/* ISSUE DATE */}
      <td className="px-6 py-4">{issueDate}</td>

      {/* DUE DATE */}
      <td className="px-6 py-4">{dueDate}</td>

      {/* STATUS */}
      <td className="px-6 py-4">
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${
            status === "Returned"
              ? "bg-green-100 text-green-700"
              : "bg-slate-200 text-slate-700"
          }`}
        >
          {status}
        </span>
      </td>

      {/* ACTION */}
      {status === "Issued" && (
        <td className="px-6 py-4">
          <button
            onClick={() => onReturn(transaction._id)}
            className="px-4 py-2 rounded-lg border flex items-center gap-2 text-sm"
          >
            <RotateCcw size={16} />
            Return
          </button>
        </td>
      )}
    </tr>
  );
};

export default TransactionRow;