import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";


const MyProfile = () => {
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(true);
  const [dbUser, setDbUser] = useState(null);

  // Fetch moderator profile by email
  useEffect(() => {
    if (!user?.email) return;

    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/users?email=${user.email}`
        );
        setDbUser(res.data);
        reset(res.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
        alert("Failed to load profile");
      }
    };

    fetchProfile();
  }, [user, reset]);

  // Update profile
  const onSubmit = async (data) => {
    try {
      await axios.patch(
        `http://localhost:3000/users/${dbUser._id}`,
        {
          name: data.name,
          photoURL: data.photoURL,
        }
      );
      alert("Profile updated successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to update profile");
    }
  };

  if (loading) return <p className="p-6">Loading profile...</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Moderator Profile</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            {...register("name", { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            value={user.email}
            disabled
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        {/* Role */}
        <div>
          <label className="block mb-1 font-medium">Role</label>
          <input
            value={dbUser.role}
            disabled
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        {/* Photo */}
        <div>
          <label className="block mb-1 font-medium">Photo URL</label>
          <input
            {...register("photoURL")}
            className="input input-bordered w-full"
          />
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default MyProfile;
