import {
  RotateCcw,
  ArrowUpRight,
} from "lucide-react";

const RecentActivity = ({ activity = [] }) => {
  // Remove invalid records
  const validActivity = activity.filter(
    (item) => item.book && item.student
  );

  // Get latest only
  const latest = validActivity
    .sort(
      (a, b) =>
        new Date(b.updatedAt || b.createdAt) -
        new Date(a.updatedAt || a.createdAt)
    )[0];

  return (
    <div className="glass p-6">
      <h2 className="text-lg font-semibold mb-4">
        Recent Activity
      </h2>

      {!latest ? (
        <p className="text-sm text-gray-500">
          No recent activity
        </p>
      ) : (
        <div className="flex items-center justify-between bg-white/60 rounded-xl p-4">
          {/* LEFT */}
          <div className="flex items-center gap-4">
            <div
              className={`p-3 rounded-xl ${
                latest.status === "Returned"
                  ? "bg-green-100 text-green-700"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              {latest.status === "Returned" ? (
                <RotateCcw size={20} />
              ) : (
                <ArrowUpRight size={20} />
              )}
            </div>

            <div>
              <p className="font-medium">
                {latest.book?.title || "Unknown Book"}
              </p>
              <p className="text-sm text-gray-500">
                {latest.status === "Returned"
                  ? "Returned by"
                  : "Issued to"}{" "}
                {latest.student?.fullName || "Unknown Student"}
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="text-right">
            <p className="text-xs text-gray-400">
              {new Date(
                latest.updatedAt || latest.createdAt
              ).toLocaleDateString()}
            </p>
            <p
              className={`text-sm font-medium ${
                latest.status === "Returned"
                  ? "text-green-600"
                  : "text-blue-600"
              }`}
            >
              {latest.status}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentActivity;