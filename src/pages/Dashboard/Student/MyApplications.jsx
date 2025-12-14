import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";


const MyApplications = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchApplications = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/applications?email=${user.email}`
        );
        setApplications(res.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        alert("Failed to load applications");
        setLoading(false);
      }
    };

    fetchApplications();
  }, [user]);

  const handleCancel = async (id) => {
    if (!window.confirm("Cancel this application?")) return;

    try {
      await axios.delete(`http://localhost:3000/applications/${id}`);
      setApplications(applications.filter(app => app._id !== id));
      alert("Application cancelled");
    } catch (error) {
      console.error(error);
      alert("Failed to cancel application");
    }
  };

  if (loading) return <p className="p-4">Loading applications...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Applications</h2>

      {applications.length === 0 ? (
        <p className="text-gray-500">You have not applied for any scholarships yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Scholarship</th>
                <th>Applied Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {applications.map(app => (
                <tr key={app._id}>
                  <td>{app.scholarshipTitle}</td>
                  <td>{new Date(app.appliedAt).toLocaleDateString()}</td>
                  <td>
                    <span
                      className={`badge ${
                        app.status === "Approved"
                          ? "badge-success"
                          : app.status === "Rejected"
                          ? "badge-error"
                          : "badge-warning"
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td>
                    {app.status === "Pending" && (
                      <button
                        onClick={() => handleCancel(app._id)}
                        className="btn btn-sm btn-error"
                      >
                        Cancel
                      </button>
                    )}
                    {app.status !== "Pending" && (
                      <span className="text-gray-400">N/A</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyApplications;
