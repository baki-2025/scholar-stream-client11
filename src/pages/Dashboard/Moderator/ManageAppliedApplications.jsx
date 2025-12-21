import { useEffect, useState } from "react";

const ManageAppliedApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = () => {
    fetch("http://localhost:3000/applications/all") // You may need to create this route in backend
      .then((res) => res.json())
      .then((data) => {
        setApplications(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    const res = await fetch(`http://localhost:3000/applications/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ applicationStatus: status }),
    });

    if (res.ok) fetchApplications();
    else alert("Failed to update status");
  };

  const handleFeedback = async (id) => {
    const feedback = prompt("Enter your feedback:");
    if (!feedback) return;

    const res = await fetch(`http://localhost:3000/applications/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ feedback }),
    });

    if (res.ok) fetchApplications();
    else alert("Failed to add feedback");
  };

  if (loading) return <p className="text-center my-10">Loading applications...</p>;

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Manage Applications</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Applicant Name</th>
              <th>Email</th>
              <th>University</th>
              <th>Scholarship</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app._id}>
                <td>{app.userName}</td>
                <td>{app.userEmail}</td>
                <td>{app.universityName}</td>
                <td>{app.scholarshipCategory}</td>
                <td>{app.applicationStatus}</td>
                <td>{app.paymentStatus}</td>
                <td className="flex gap-2">
                  <button
                    className="btn btn-sm btn-outline btn-primary"
                    onClick={() => handleStatusUpdate(app._id, "Processing")}
                  >
                    Processing
                  </button>
                  <button
                    className="btn btn-sm btn-outline btn-success"
                    onClick={() => handleStatusUpdate(app._id, "Completed")}
                  >
                    Complete
                  </button>
                  <button
                    className="btn btn-sm btn-outline btn-error"
                    onClick={() => handleStatusUpdate(app._id, "Rejected")}
                  >
                    Reject
                  </button>
                  <button
                    className="btn btn-sm btn-outline btn-warning"
                    onClick={() => handleFeedback(app._id)}
                  >
                    Feedback
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

export default ManageAppliedApplications;
