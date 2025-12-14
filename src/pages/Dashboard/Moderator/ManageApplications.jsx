import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3000/applications")
      .then((res) => {
        setApplications(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to load applications");
        setLoading(false);
      });
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.patch(`http://localhost:3000/applications/${id}`, { status });
      setApplications((prev) =>
        prev.map((app) =>
          app._id === id ? { ...app, status } : app
        )
      );
    } catch (error) {
      console.error(error);
      alert("Failed to update status");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this application?")) return;

    try {
      await axios.delete(`http://localhost:3000/applications/${id}`);
      setApplications((prev) => prev.filter((app) => app._id !== id));
      alert("Application deleted");
    } catch (error) {
      console.error(error);
      alert("Failed to delete application");
    }
  };

  if (loading) return <p className="p-4">Loading applications...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Applications</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Student Email</th>
              <th>Scholarship</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {applications.map((app) => (
              <tr key={app._id}>
                <td>{app.email}</td>
                <td>{app.scholarshipTitle}</td>
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
                <td className="flex gap-2">
                  {app.status === "Pending" && (
                    <>
                      <button
                        onClick={() => updateStatus(app._id, "Approved")}
                        className="btn btn-xs btn-success"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => updateStatus(app._id, "Rejected")}
                        className="btn btn-xs btn-warning"
                      >
                        Reject
                      </button>
                    </>
                  )}

                  <button
                    onClick={() => handleDelete(app._id)}
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
    </div>
  );
};

export default ManageApplications;
