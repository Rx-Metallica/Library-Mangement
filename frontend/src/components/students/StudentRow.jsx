import { Edit, Trash2, UserCheck, UserX } from "lucide-react";

const StudentRow = ({ student, onEdit, onToggle, onDelete }) => {
  return (
    <tr className="border-b border-black/5 hover:bg-white/30">
      <td className="px-6 py-4">{student.studentId}</td>
      <td className="px-6 py-4">{student.fullName}</td>
      <td className="px-6 py-4 text-blue-600">{student.email}</td>
      <td className="px-6 py-4">{student.department}</td>
      <td className="px-6 py-4">Year {student.yearOfStudy}</td>

      {/* Status */}
      <td className="px-6 py-4">
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold
            ${
              student.isActive
                ? "bg-green-100 text-green-700"
                : "bg-gray-200 text-gray-600"
            }`}
        >
          {student.isActive ? "Active" : "Inactive"}
        </span>
      </td>

      {/* Actions */}
      <td className="px-6 py-4 flex gap-3">
        <button
          onClick={() => onToggle(student)}
          className={`p-2 rounded-lg ${
            student.isActive
              ? "bg-orange-500/10 text-orange-600"
              : "bg-green-500/10 text-green-600"
          }`}
        >
          {student.isActive ? <UserX size={16} /> : <UserCheck size={16} />}
        </button>

        <button
          onClick={() => onEdit(student)}
          className="p-2 rounded-lg bg-blue-500/10 text-blue-600"
        >
          <Edit size={16} />
        </button>

        <button
          onClick={() => onDelete(student._id)}
          className="p-2 rounded-lg bg-red-500/10 text-red-600"
        >
          <Trash2 size={16} />
        </button>
      </td>
    </tr>
  );
};

export default StudentRow;