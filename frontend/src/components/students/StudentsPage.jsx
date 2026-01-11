import { useEffect, useState } from "react";
import axios from "axios";
import { Plus, Search } from "lucide-react";
import { toast } from "react-toastify";

import Layout from "../Layout";
import StudentRow from "./StudentRow";
import StudentFormModal from "./StudentFormModal";

const API = "http://localhost:4000/api/students";

const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  const fetchStudents = async () => {
    try {
      const res = await axios.get(API);
      setStudents(res.data);
    } catch {
      toast.error("Failed to load students");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const toggleStatus = async (student) => {
    try {
      const url = `${API}/${student._id}/${student.isActive ? "deactivate" : "activate"}`;
      await axios.patch(url);
      toast.success("Status updated");
      fetchStudents();
    } catch {
      toast.error("Action failed");
    }
  };

  const deleteStudent = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      toast.success("Student deleted");
      fetchStudents();
    } catch {
      toast.error("Delete failed");
    }
  };

  const filteredStudents = students.filter(
    (s) =>
      s.fullName.toLowerCase().includes(search.toLowerCase()) ||
      s.studentId.toLowerCase().includes(search.toLowerCase()) ||
      s.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-semibold">Student Records</h1>
        <p className="text-gray-500">Manage student information</p>
      </div>

      {/* Search + Add */}
      <div className="flex items-center justify-between mb-6 gap-4">
        <div className="relative w-105">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-700 z-10"
          />
          <input
            className="w-full h-11 pl-11 pr-4 rounded-xl
                       bg-white/70 backdrop-blur-md
                       border border-black/20
                       focus:outline-none focus:ring-2 focus:ring-black/30"
            placeholder="Search students by name, ID, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <button
          onClick={() => {
            setEditingStudent(null);
            setOpen(true);
          }}
          className="h-11 bg-slate-900 text-white px-6 rounded-xl flex items-center gap-2"
        >
          <Plus size={18} /> Add Student
        </button>
      </div>

      {/* Table */}
      <div className="glass overflow-hidden rounded-xl">
        <table className="w-full">
          <thead className="bg-white/40">
            <tr>
              {[
                "Student ID",
                "Name",
                "Email",
                "Department",
                "Year",
                "Status",
                "Actions",
              ].map((h) => (
                <th key={h} className="px-6 py-4 text-left text-sm font-semibold">
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filteredStudents.map((student) => (
              <StudentRow
                key={student._id}
                student={student}
                onEdit={(s) => {
                  setEditingStudent(s);
                  setOpen(true);
                }}
                onToggle={toggleStatus}
                onDelete={deleteStudent}
              />
            ))}
          </tbody>
        </table>
      </div>

      <StudentFormModal
        open={open}
        student={editingStudent}
        onClose={() => setOpen(false)}
        refresh={fetchStudents}
      />
    </Layout>
  );
};

export default StudentsPage;