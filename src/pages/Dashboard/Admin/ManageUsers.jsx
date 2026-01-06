import React, { useEffect, useState } from "react";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [roleFilter, setRoleFilter] = useState("");

  useEffect(() => {
    fetch("VITE_API_URL/admin/users")
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  const updateRole = async (id, role) => {
    await fetch(`VITE_API_URL/admin/users/role/${id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ role }),
    });

    setUsers(users.map(u => u._id === id ? { ...u, role } : u));
  };

  const deleteUser = async (id) => {
    await fetch(`VITE_API_URL/admin/users/${id}`, {
      method: "DELETE",
    });
    setUsers(users.filter(u => u._id !== id));
  };

  const filteredUsers = roleFilter
    ? users.filter(u => u.role === roleFilter)
    : users;

  return (
    <div className="card bg-base-100 shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>

      <select
        className="select select-bordered mb-4"
        onChange={(e) => setRoleFilter(e.target.value)}
      >
        <option value="">All Roles</option>
        <option value="Student">Student</option>
        <option value="Moderator">Moderator</option>
        <option value="Admin">Admin</option>
      </select>

      <table className="table table-zebra">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredUsers.map(user => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <select
                  value={user.role}
                  onChange={(e) => updateRole(user._id, e.target.value)}
                  className="select select-xs"
                >
                  <option>Student</option>
                  <option>Moderator</option>
                  <option>Admin</option>
                </select>
              </td>
              <td>
                <button
                  onClick={() => deleteUser(user._id)}
                  className="btn btn-xs btn-error"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
