// Analytics.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const Analytics = () => {
  const [scholarships, setScholarships] = useState([]);
  const [users, setUsers] = useState([]);

  // Fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const schRes = await axios.get('http://localhost:3000/scholarships');
        const userRes = await axios.get('http://localhost:3000/users');
        setScholarships(schRes.data);
        setUsers(userRes.data);
      } catch (error) {
        console.error(error);
        alert('Failed to fetch analytics data');
      }
    };

    fetchData();
  }, []);

  // Example: Scholarships per amount range
  const amountData = [
    { range: '< $1000', count: scholarships.filter(s => s.amount < 1000).length },
    { range: '$1000-$5000', count: scholarships.filter(s => s.amount >= 1000 && s.amount <= 5000).length },
    { range: '> $5000', count: scholarships.filter(s => s.amount > 5000).length },
  ];

  // Example: Users by role
  const roleData = [
    { name: 'Admin', value: users.filter(u => u.role === 'admin').length },
    { name: 'Student', value: users.filter(u => u.role === 'student').length },
    { name: 'Other', value: users.filter(u => u.role !== 'admin' && u.role !== 'student').length },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Dashboard Analytics</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Scholarships Amount Bar Chart */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-xl font-semibold mb-2">Scholarships by Amount</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={amountData}>
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Users Role Pie Chart */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-xl font-semibold mb-2">Users by Role</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={roleData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#82ca9d"
                label
              >
                {roleData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
