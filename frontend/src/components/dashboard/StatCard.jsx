const StatCard = ({ title, value, icon: Icon, variant }) => {
  const styles = {
    blue: {
      card: "bg-blue-500/20 text-blue-900",
      icon: "bg-blue-500/30 text-blue-700",
    },
    purple: {
      card: "bg-indigo-500/20 text-indigo-900",
      icon: "bg-indigo-500/30 text-indigo-700",
    },
    green: {
      card: "bg-emerald-500/20 text-emerald-900",
      icon: "bg-emerald-500/30 text-emerald-700",
    },
    orange: {
      card: "bg-orange-500/20 text-orange-900",
      icon: "bg-orange-500/30 text-orange-700",
    },
  };

  return (
    <div
      className={`glass p-6 flex justify-between items-center ${styles[variant].card}`}
    >
      <div>
        <p className="text-sm font-medium opacity-80">
          {title}
        </p>
        <p className="text-3xl font-semibold mt-2">
          {value}
        </p>
      </div>

      <div
        className={`p-3 rounded-xl ${styles[variant].icon}`}
      >
        <Icon className="w-6 h-6" />
      </div>
    </div>
  );
};

export default StatCard;