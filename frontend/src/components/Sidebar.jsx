import { NavLink } from "react-router-dom";
import {
  Book,
  LayoutDashboard,
  Library,
  Users,
  RefreshCcw,
  Search,
} from "lucide-react";

const Sidebar = () => {
  const baseLink =
    "flex items-center gap-3 px-4 py-3 rounded-xl transition-colors duration-200";

  const inactive = "text-white hover:bg-blue-500/20";

  const active = "bg-yellow-400 text-black font-semibold";

  return (
    <aside className="w-64 h-screen bg-slate-900 p-6 flex flex-col">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-10">
        <div className="w-10 h-10 rounded-xl bg-yellow-400 flex items-center justify-center">
          <Library className="text-black" size={20} />
        </div>

        <div>
          <h1 className="text-lg font-bold text-white">LibraryOS</h1>
          <p className="text-xs text-slate-400">Management System</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `${baseLink} ${isActive ? active : inactive}`
          }
        >
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>

        <NavLink
          to="/books"
          className={({ isActive }) =>
            `${baseLink} ${isActive ? active : inactive}`
          }
        >
          <Book size={18} />
          Books
        </NavLink>

        <NavLink
          to="/students"
          className={({ isActive }) =>
            `${baseLink} ${isActive ? active : inactive}`
          }
        >
          <Users size={18} />
          Students
        </NavLink>

        <NavLink
          to="/issue-return"
          className={({ isActive }) =>
            `${baseLink} ${isActive ? active : inactive}`
          }
        >
          <RefreshCcw size={18} />
          Issue / Return
        </NavLink>

        <NavLink
          to="/reports"
          className={({ isActive }) =>
            `${baseLink} ${isActive ? active : inactive}`
          }
        >
          <Search size={18} />
          Search & Reports
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;