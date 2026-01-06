import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const Analytics = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch("VITE_API_URL/admin/analytics")
      .then(res => res.json())
      .then(data => setStats(data));
  }, []);

  if (!stats) return <p>Loading...</p>;

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Admin Analytics</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="stat bg-base-100 shadow">
          <div className="stat-title">Total Users</div>
          <div className="stat-value text-primary">
            {stats.totalUsers}
          </div>
        </div>

        <div className="stat bg-base-100 shadow">
          <div className="stat-title">Total Scholarships</div>
          <div className="stat-value text-secondary">
            {stats.totalScholarships}
          </div>
        </div>

        <div className="stat bg-base-100 shadow">
          <div className="stat-title">Total Fees Collected</div>
          <div className="stat-value text-success">
            ${stats.totalFees}
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="card bg-base-100 shadow p-4">
          <h3 className="font-bold mb-2">Applications by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats.chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="card bg-base-100 shadow p-4">
          <h3 className="font-bold mb-2">Application Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={stats.chartData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {stats.chartData.map((_, index) => (
                  <Cell key={index} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
