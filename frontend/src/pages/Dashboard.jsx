import { useEffect, useState } from "react";
import axios from "axios";
import {
  Book,
  Users,
  BookOpen,
  AlertTriangle,
} from "lucide-react";

import Layout from "../components/Layout";
import StatCard from "../components/dashboard/StatCard";
import RecentActivity from "../components/dashboard/RecentActivity";
import QuickAction from "../components/dashboard/QuickAction";

const Dashboard = () => {
  const [summary, setSummary] = useState(null);
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const [summaryRes, activityRes] = await Promise.all([
          axios.get("http://localhost:4000/api/dashboard/summary"),
          axios.get("http://localhost:4000/api/dashboard/recent-activity"),
        ]);

        setSummary(summaryRes.data);
        setActivity(activityRes.data);
      } catch (error) {
        console.error("Dashboard API error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <Layout>
        <p className="text-gray-500">Loading dashboard...</p>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <p className="text-gray-500">
          Overview of library statistics
        </p>
      </div>    

      {/* Stats */}
      <div className="grid grid-cols-4 gap-6 mb-8">
  <StatCard
    title="Total Books"
    value={summary.totalBooks}
    icon={Book}
    variant="blue"
  />
  <StatCard
    title="Active Students"
    value={summary.activeStudents}
    icon={Users}
    variant="purple"
  />
  <StatCard
    title="Books Issued"
    value={summary.booksIssued}
    icon={BookOpen}
    variant="green"
  />
  <StatCard
    title="Overdue"
    value={summary.overdueBooks}
    icon={AlertTriangle}
    variant="orange"
  />
</div>

      {/* Bottom Section */}
      <div className="grid grid-cols-2 gap-6">
        <RecentActivity activity={activity} />
        <QuickAction />
      </div>
    </Layout>
  );
};

export default Dashboard;