import { useEffect, useState } from "react";

const MyProfile = ({ userEmail }) => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/users?email=${userEmail}`)
      .then((res) => res.json())
      .then((data) => setProfile(data[0]));
  }, [userEmail]);

  if (!profile) return <p>Loading profile...</p>;

  return (
    <div className="max-w-md mx-auto p-6 border rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>
      <img src={profile.photoURL} alt="Profile" className="w-32 h-32 rounded-full mb-4" />
      <p><strong>Name:</strong> {profile.name}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Role:</strong> {profile.role}</p>
    </div>
  );
};

export default MyProfile;
