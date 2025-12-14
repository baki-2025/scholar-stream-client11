// ManageScholarship.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all scholarships
  const fetchScholarships = async () => {
    try {
      const res = await axios.get('http://localhost:3000/scholarships');
      setScholarships(res.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      alert('Failed to fetch scholarships');
    }
  };

  useEffect(() => {
    fetchScholarships();
  }, []);

  // Delete a scholarship
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this scholarship?')) return;
    try {
      await axios.delete(`http://localhost:3000/scholarships/${id}`);
      setScholarships(scholarships.filter(s => s._id !== id));
      alert('Deleted successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to delete scholarship');
    }
  };

  // Edit a scholarship (simple example using prompt)
  const handleEdit = async (scholarship) => {
    const newTitle = prompt('Enter new title', scholarship.title);
    if (!newTitle) return;

    try {
      await axios.put(`http://localhost:3000/scholarships/${scholarship._id}`, {
        ...scholarship,
        title: newTitle
      });
      fetchScholarships(); // refresh the list
      alert('Updated successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to update scholarship');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Scholarships</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border p-2">Title</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Deadline</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {scholarships.map(sch => (
            <tr key={sch._id}>
              <td className="border p-2">{sch.title}</td>
              <td className="border p-2">{sch.description}</td>
              <td className="border p-2">{new Date(sch.deadline).toLocaleDateString()}</td>
              <td className="border p-2">{sch.amount}</td>
              <td className="border p-2 space-x-2">
                <button
                  onClick={() => handleEdit(sch)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(sch._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {scholarships.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center p-4">No scholarships found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageScholarships;
