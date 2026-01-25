import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [roleFilter, setRoleFilter] = useState("");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("access-token");
  const API = import.meta.env.VITE_API_URL;

  /* ================= FETCH USERS ================= */
  useEffect(() => {
    fetch(`${API}/admin/users`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [API, token]);

  /* ================= UPDATE ROLE ================= */
  const updateRole = async (id, newRole, currentRole) => {
    if (newRole === currentRole) return;

    const result = await Swal.fire({
      title: "Change user role?",
      text: `Role will be changed from "${currentRole}" to "${newRole}"`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, change it",
      confirmButtonColor: "#3085d6",
    });

    if (!result.isConfirmed) return;

    try {
      await fetch(`${API}/admin/users/role/${id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ role: newRole }),
      });

      setUsers(
        users.map((u) =>
          u._id === id ? { ...u, role: newRole } : u
        )
      );

      Swal.fire("Updated!", "User role updated successfully.", "success");
    } catch (error) {
      console.log(error)
      Swal.fire("Error!", "Failed to update role.", "error");
    }
  };

  /* ================= DELETE USER ================= */
  const deleteUser = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This user will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete",
    });

    if (!result.isConfirmed) return;

    try {
      await fetch(`${API}/admin/users/${id}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      setUsers(users.filter((u) => u._id !== id));

      Swal.fire("Deleted!", "User has been removed.", "success");
    } catch (error) {
      console.log(error)
      Swal.fire("Error!", "Failed to delete user.", "error");
    }
  };

  const filteredUsers = roleFilter
    ? users.filter((u) => u.role === roleFilter)
    : users;

  if (loading) {
    return (
      <div className="flex justify-center mt-10">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="card bg-base-100 shadow p-6">
      <h2 className="text-2xl text-center font-bold mb-4">
        Manage Users:{users.length}
      </h2>

      {/* Role Filter */}
      <select
        className="select select-bordered mb-4"
        value={roleFilter}
        onChange={(e) => setRoleFilter(e.target.value)}
      >
        <option value="">All Roles</option>
        <option value="student">Student</option>
        <option value="moderator">Moderator</option>
        <option value="admin">Admin</option>
      </select>

      <div className="overflow-x-auto">
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
            {filteredUsers.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>

                <td>
                  <select
                    value={user.role}
                    onChange={(e) =>
                      updateRole(
                        user._id,
                        e.target.value,
                        user.role
                      )
                    }
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

            {filteredUsers.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  className="text-center text-gray-500"
                >
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;

