import { Edit, Trash2 } from "lucide-react";

const BookRow = ({ book, onEdit, onToggle }) => {
  const available = book.availableCopies ?? 0;
  const total = book.totalCopies ?? 0;

  const isFull = available === total;

  return (
    <tr className="border-b border-black/5 hover:bg-white/30">
      <td className="px-6 py-4">{book.title}</td>
      <td className="px-6 py-4">{book.author}</td>
      <td className="px-6 py-4">{book.isbn}</td>
      <td className="px-6 py-4">{book.category}</td>

      {/* Available / Total */}
      <td className="px-6 py-4">
        <span
          className={`inline-flex items-center justify-center
            px-3 py-1 rounded-full text-sm font-semibold
            ${
              isFull
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
        >
          {available}/{total}
        </span>
      </td>

      {/* Actions */}
      <td className="px-6 py-4 flex gap-3">
        <button
          onClick={() => onEdit(book)}
          className="p-2 rounded-lg bg-blue-500/10 text-blue-600 hover:bg-blue-500/20"
        >
          <Edit size={16} />
        </button>

        <button
          onClick={() => onToggle(book)}
          className="p-2 rounded-lg bg-red-500/10 text-red-600 hover:bg-red-500/20"
        >
          <Trash2 size={16} />
        </button>
      </td>
    </tr>
  );
};

export default BookRow;