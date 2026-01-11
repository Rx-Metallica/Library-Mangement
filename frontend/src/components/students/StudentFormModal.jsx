import { useEffect, useState } from "react";
import axios from "axios";
import { X } from "lucide-react";
import { toast } from "react-toastify";

const API = "http://localhost:4000/api/students";

const StudentFormModal = ({ open, onClose, refresh, student }) => {
  const [form, setForm] = useState({
    studentId: "",
    fullName: "",
    email: "",
    phone: "",
    department: "",
    yearOfStudy: "",
  });

  useEffect(() => {
    if (student) {
      setForm({
        studentId: student.studentId ?? "",
        fullName: student.fullName ?? "",
        email: student.email ?? "",
        phone: student.phone ?? "",
        department: student.department ?? "",
        yearOfStudy: student.yearOfStudy ?? "",
      });
    } else {
      setForm({
        studentId: "",
        fullName: "",
        email: "",
        phone: "",
        department: "",
        yearOfStudy: "",
      });
    }
  }, [student]);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      studentId: form.studentId,
      fullName: form.fullName,
      email: form.email,
      phone: form.phone,
      department: form.department,
      yearOfStudy: Number(form.yearOfStudy),
    };

    try {
      if (student) {
        await axios.put(`${API}/${student._id}`, payload);
        toast.success("Student updated");
      } else {
        await axios.post(API, payload);
        toast.success("Student added");
      }

      await refresh();
      onClose();
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error("Operation failed");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 relative"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500"
        >
          <X />
        </button>

        <h2 className="text-2xl font-semibold mb-6">
          {student ? "Edit Student" : "Add New Student"}
        </h2>

        <div className="grid grid-cols-2 gap-5">
          {[
            ["studentId", "Student ID *"],
            ["fullName", "Full Name *"],
            ["email", "Email"],
            ["phone", "Phone"],
            ["department", "Department"],
            ["yearOfStudy", "Year of Study"],
          ].map(([key, label]) => (
            <div key={key}>
              <label className="text-sm font-medium">{label}</label>
              <input
                className="mt-1 w-full rounded-xl border px-4 py-2"
                value={form[key]}
                onChange={(e) =>
                  setForm({ ...form, [key]: e.target.value })
                }
                required={label.includes("*")}
              />
            </div>
          ))}
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
            {student ? "Update Student" : "Add Student"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentFormModal;