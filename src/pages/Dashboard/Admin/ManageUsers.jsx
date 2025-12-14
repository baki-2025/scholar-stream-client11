// ManageUser.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:3000/users');
      setUsers(res.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      alert('Failed to fetch users');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Delete a user
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await axios.delete(`http://localhost:3000/users/${id}`);
      setUsers(users.filter(u => u._id !== id));
      alert('User deleted successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to delete user');
    }
  };

  // Edit a user (simple prompt example)
  const handleEdit = async (user) => {
    const newName = prompt('Enter new name', user.name);
    if (!newName) return;

    try {
      await axios.put(`http://localhost:3000/users/${user._id}`, {
        ...user,
        name: newName
      });
      fetchUsers(); // refresh list
      alert('User updated successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to update user');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id}>
              <td className="border p-2">{u.name}</td>
              <td className="border p-2">{u.email}</td>
              <td className="border p-2">{u.role}</td>
              <td className="border p-2 space-x-2">
                <button
                  onClick={() => handleEdit(u)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(u._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {users.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center p-4">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
