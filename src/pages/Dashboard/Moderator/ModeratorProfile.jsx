// ModerateProfile.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';

const ModeratorProfile = () => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({});
  const { register, handleSubmit, reset } = useForm();

  // Fetch moderator profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('http://localhost:3000/users/me'); // adjust endpoint
        setProfile(res.data);
        reset(res.data); // pre-fill the form
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
        alert('Failed to fetch profile');
      }
    };

    fetchProfile();
  }, [reset]);

  // Update profile
  const onSubmit = async (data) => {
    try {
      await axios.put(`http://localhost:3000/users/${profile._id}`, data);
      alert('Profile updated successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to update profile');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Moderate Profile</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
        <div>
          <label className="block mb-1">Name</label>
          <input
            type="text"
            {...register('name', { required: true })}
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            {...register('email', { required: true })}
            className="border p-2 w-full"
            disabled
          />
        </div>

        <div>
          <label className="block mb-1">Role</label>
          <input
            type="text"
            {...register('role')}
            className="border p-2 w-full"
            disabled
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default ModeratorProfile;
