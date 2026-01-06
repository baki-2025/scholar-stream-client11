import React, { useEffect, useState } from "react";

const ManageApplications = () => {
  const [applications, setApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    fetch("VITE_API_URL/moderator/applications")
      .then(res => res.json())
      .then(data => setApplications(data));
  }, []);

  const updateStatus = async (id, status) => {
    await fetch(`VITE_API_URL/applications/status/${id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ status }),
    });

    setApplications(applications.map(app =>
      app._id === id ? { ...app, applicationStatus: status } : app
    ));
  };

  const rejectApplication = async (id) => {
    await fetch(`VITE_API_URL/applications/reject/${id}`, {
      method: "PATCH",
    });

    setApplications(applications.map(app =>
      app._id === id ? { ...app, applicationStatus: "rejected" } : app
    ));
  };

  const submitFeedback = async () => {
    await fetch(
      `VITE_API_URL/applications/feedback/${selectedApp._id}`,
      {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ feedback }),
      }
    );

    setApplications(applications.map(app =>
      app._id === selectedApp._id ? { ...app, feedback } : app
    ));

    setSelectedApp(null);
    setFeedback("");
  };

  return (
    <div className="card bg-base-100 shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Applications</h2>

      <table className="table table-zebra">
        <thead>
          <tr>
            <th>Applicant</th>
            <th>University</th>
            <th>Status</th>
            <th>Payment</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {applications.map(app => (
            <tr key={app._id}>
              <td>{app.applicantName}</td>
              <td>{app.universityName}</td>
              <td>
                <span className="badge badge-info">
                  {app.applicationStatus}
                </span>
              </td>
              <td>
                <span className={`badge ${
                  app.paymentStatus === "paid"
                    ? "badge-success"
                    : "badge-error"
                }`}>
                  {app.paymentStatus}
                </span>
              </td>
              <td className="space-x-1">
                <button
                  onClick={() => updateStatus(app._id, "processing")}
                  className="btn btn-xs btn-warning"
                >
                  Processing
                </button>

                <button
                  onClick={() => updateStatus(app._id, "completed")}
                  className="btn btn-xs btn-success"
                >
                  Completed
                </button>

                <button
                  onClick={() => {
                    setSelectedApp(app);
                    setFeedback(app.feedback || "");
                  }}
                  className="btn btn-xs btn-info"
                >
                  Feedback
                </button>

                <button
                  onClick={() => rejectApplication(app._id)}
                  className="btn btn-xs btn-error"
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Feedback Modal */}
      {selectedApp && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Give Feedback</h3>

            <textarea
              className="textarea textarea-bordered w-full mt-2"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />

            <div className="modal-action">
              <button onClick={submitFeedback} className="btn btn-success">
                Submit
              </button>
              <button
                onClick={() => setSelectedApp(null)}
                className="btn"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageApplications;
