import {
  BookOpen,
  Plus,
  Users,
  AlertTriangle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ActionCard = ({
  icon: Icon,
  title,
  desc,
  color,
  onClick,
}) => (
  <div
    onClick={onClick}
    className="flex items-center gap-4 p-4 rounded-xl glass
               cursor-pointer hover:scale-[1.02] transition"
  >
    <div className={`p-3 rounded-xl ${color}`}>
      <Icon className="w-5 h-5" />
    </div>
    <div>
      <p className="font-medium">{title}</p>
      <p className="text-sm text-gray-500">{desc}</p>
    </div>
  </div>
);

const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <div className="glass p-6">
      <h2 className="text-lg font-semibold mb-4">
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {/* Issue Book */}
        <ActionCard
          icon={BookOpen}
          title="Issue Book"
          desc="Issue a book to a student"
          color="bg-slate-200/60"
          onClick={() => navigate("/issue-return")}
        />

        {/* Add Book */}
        <ActionCard
          icon={Plus}
          title="Add Book"
          desc="Add a new book"
          color="bg-yellow-200/60"
          onClick={() => navigate("/books")}
        />

        {/* Register Student */}
        <ActionCard
          icon={Users}
          title="Register Student"
          desc="Add new student"
          color="bg-green-200/60"
          onClick={() => navigate("/students")}
        />

        {/* Reports */}
        <ActionCard
          icon={AlertTriangle}
          title="View Reports"
          desc="Generate reports"
          color="bg-orange-200/60"
          onClick={() => navigate("/reports")}
        />
      </div>
    </div>
  );
};

export default QuickActions;