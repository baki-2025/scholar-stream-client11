import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";

const MyProfile = () => {
  const { user } = useAuth(); // Get logged-in admin info
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch admin details from server (replace with your API)
    fetch(`http://localhost:3000/users/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setAdminData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [user]);

  if (loading) {
    return (
      <div className="text-center py-10">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!adminData) {
    return <p className="text-red-500 text-center mt-5">Admin data not found.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-4">Admin Profile</h2>

      <div className="flex items-center mb-4">
        <img
          src={adminData.photoURL || "https://via.placeholder.com/100"}
          alt={adminData.name}
          className="w-24 h-24 rounded-full mr-4"
        />
        <div>
          <h3 className="text-xl font-semibold">{adminData.name}</h3>
          <p className="text-gray-600">{adminData.email}</p>
          <p className="text-gray-600 capitalize">Role: {adminData.role}</p>
        </div>
      </div>

      <div className="mt-4">
        <h4 className="font-semibold mb-2">Additional Info</h4>
        <p>Joined: {new Date(adminData.createdAt).toLocaleDateString()}</p>
        {/* Add any other admin details you want to show */}
      </div>
    </div>
  );
};

export default MyProfile;







