import React from "react";
import useAuth from "../../hooks/useAuth";

const MyProfile = () => {
  const { user } = useAuth();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      <div>
        <p><strong>Name:</strong> {user?.displayName}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Photo:</strong> 
          <img src={user?.photoURL} alt="profile" className="w-20 h-20 rounded-full" />
        </p>
      </div>
    </div>
  );
};

export default MyProfile;
