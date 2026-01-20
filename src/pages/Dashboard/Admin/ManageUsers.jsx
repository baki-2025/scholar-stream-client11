import React, { useEffect, useState } from "react";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [roleFilter, setRoleFilter] = useState("");

  const token = localStorage.getItem("access-token");
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${API}/admin/users`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => setUsers(data));
  }, [API, token]);

  const updateRole = async (id, role) => {
    const confirm = window.confirm(`Change role to ${role}?`);
    if (!confirm) return;

    await fetch(`${API}/admin/users/role/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ role }),
    });

    setUsers(users.map(u => u._id === id ? { ...u, role } : u));
  };

  const deleteUser = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this user?");
    if (!confirm) return;

    await fetch(`${API}/admin/users/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    setUsers(users.filter(u => u._id !== id));
  };

  const filteredUsers = roleFilter
    ? users.filter(u => u.role === roleFilter)
    : users;

  return (
    <div className="card bg-base-100 shadow p-6">
      <h2 className="text-2xl text-center font-bold mb-4">Manage Users</h2>

     <select
  className="select select-bordered mb-4"
  onChange={(e) => setRoleFilter(e.target.value)}
>
  <option value="">All Roles</option>
  <option value="student">Student</option>
  <option value="moderator">Moderator</option>
  <option value="admin">Admin</option>
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
  <option value="student">Student</option>
  <option value="moderator">Moderator</option>
  <option value="admin">Admin</option>
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
