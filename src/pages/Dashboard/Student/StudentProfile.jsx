import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";


const StudentProfile = () => {
  const { user, updateUserProfile } = useAuth();
  const { register, handleSubmit, reset } = useForm();

  // Pre-fill form with logged-in user data
  useEffect(() => {
    if (user) {
      reset({
        displayName: user.displayName || "",
        email: user.email || "",
        photoURL: user.photoURL || "",
      });
    }
  }, [user, reset]);

  // Update profile
  const onSubmit = async (data) => {
    try {
      await updateUserProfile({
        displayName: data.displayName,
        photoURL: data.photoURL,
      });
      alert("Profile updated successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to update profile");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Student Profile</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block mb-1 font-medium">Full Name</label>
          <input
            {...register("displayName")}
            className="input input-bordered w-full"
            placeholder="Your name"
          />
        </div>

        {/* Email (read only) */}
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            {...register("email")}
            disabled
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        {/* Photo URL */}
        <div>
          <label className="block mb-1 font-medium">Photo URL</label>
          <input
            {...register("photoURL")}
            className="input input-bordered w-full"
            placeholder="Profile photo URL"
          />
        </div>

        {/* Profile Preview */}
        {user?.photoURL && (
          <div className="flex justify-center">
            <img
              src={user.photoURL}
              alt="Profile"
              className="w-24 h-24 rounded-full border"
            />
          </div>
        )}

        <button type="submit" className="btn btn-primary w-full">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default StudentProfile;
