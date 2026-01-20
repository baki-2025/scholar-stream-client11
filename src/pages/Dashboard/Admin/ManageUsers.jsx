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



// import { useQuery } from '@tanstack/react-query';
// import React, { useState } from 'react';
// import useAxiosSecure from '../../../hooks/useAxiosSecure';
// import { FaUserShield } from 'react-icons/fa';
// import { FiShieldOff } from 'react-icons/fi';
// import Swal from 'sweetalert2';


// const ManageUsers = () => {
//     const axiosSecure = useAxiosSecure();
//     const [searchText, setSearchText] = useState('')

//     const { refetch, data: users = [] } = useQuery({
//         queryKey: ['users', searchText],
//         queryFn: async () => {
//             const res = await axiosSecure.get(`/users?searchText=${searchText}`);
//             return res.data;
//         }
//     })

//     const handleMakeAdmin = user => {
//         const roleInfo = { role: 'admin' }
//         //TODO: must ask for confirmation before proceed
//         axiosSecure.patch(`/users/${user._id}/role`, roleInfo)
//             .then(res => {
//                 console.log(res.data);
//                 if (res.data.modifiedCount) {
//                     refetch();
//                     Swal.fire({
//                         position: "top-end",
//                         icon: "success",
//                         title: `${user.displayName} marked as an Admin`,
//                         showConfirmButton: false,
//                         timer: 2000
//                     });
//                 }
//             })
//     }

//     const handleRemoveAdmin = user => {
//         const roleInfo = { role: 'user' }
//         //TODO: must ask for confirmation before proceed
//         axiosSecure.patch(`/users/${user._id}/role`, roleInfo)
//             .then(res => {
//                 if (res.data.modifiedCount) {
//                     refetch();
//                     Swal.fire({
//                         position: "top-end",
//                         icon: "success",
//                         title: `${user.displayName} removed from Admin`,
//                         showConfirmButton: false,
//                         timer: 2000
//                     });
//                 }
//             })
//     }

//     return (
//         <div>
//             <h2 className='text-4xl'>Manage Users: {users.length}</h2>
//             <p>search text: {searchText}</p>
//             <label className="input">
//                 <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
//                     <g
//                         strokeLinejoin="round"
//                         strokeLinecap="round"
//                         strokeWidth="2.5"
//                         fill="none"
//                         stroke="currentColor"
//                     >
//                         <circle cx="11" cy="11" r="8"></circle>
//                         <path d="m21 21-4.3-4.3"></path>
//                     </g>
//                 </svg>
//                 <input
//                     onChange={(e) => setSearchText(e.target.value)}
//                     type="search"
//                     className="grow"
//                     placeholder="Search users" />

//             </label>
//             <div className="overflow-x-auto">
//                 <table className="table">
//                     {/* head */}
//                     <thead>
//                         <tr>
//                             <th>
//                                 #
//                             </th>
//                             <th>User</th>
//                             <th>Email</th>
//                             <th>Role</th>
//                             <th>Admin Action</th>
//                             <th>Others Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {users.map((user, index) => <tr>
//                             <td>
//                                 {index + 1}
//                             </td>
//                             <td>
//                                 <div className="flex items-center gap-3">
//                                     <div className="avatar">
//                                         <div className="mask mask-squircle h-12 w-12">
//                                             <img
//                                                 src={user.photoURL}
//                                                 alt="Avatar Tailwind CSS Component" />
//                                         </div>
//                                     </div>
//                                     <div>
//                                         <div className="font-bold">{user.displayName}</div>
//                                         <div className="text-sm opacity-50">United States</div>
//                                     </div>
//                                 </div>
//                             </td>
//                             <td>
//                                 {user.email}
//                             </td>
//                             <td>
//                                 {user.role}
//                             </td>
//                             <td>
//                                 {user.role === 'admin' ?
//                                     <button
//                                         onClick={() => handleRemoveAdmin(user)}
//                                         className='btn bg-red-300'>
//                                         <FiShieldOff />
//                                     </button> :
//                                     <button
//                                         onClick={() => handleMakeAdmin(user)}
//                                         className='btn bg-green-400'>
//                                         <FaUserShield></FaUserShield>
//                                     </button>
//                                 }
//                             </td>
//                             <th>
//                                 Actions
//                             </th>
//                         </tr>)}



//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default ManageUsers;

