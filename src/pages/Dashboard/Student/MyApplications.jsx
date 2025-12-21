import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const MyApplications = ({ userEmail }) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewModal, setReviewModal] = useState({ open: false, appId: null });

  const navigate = useNavigate();

  const fetchApplications = () => {
    fetch(`http://localhost:3000/applications/${userEmail}`)
      .then((res) => res.json())
      .then((data) => {
        setApplications(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchApplications();
  }, [userEmail]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this application?")) return;
    const res = await fetch(`http://localhost:3000/applications/${id}`, { method: "DELETE" });
    if (res.ok) fetchApplications();
    else alert("Failed to delete");
  };

  if (loading) return <p className="text-center my-10">Loading applications...</p>;

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">My Applications</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>University</th>
              <th>Scholarship</th>
              <th>Feedback</th>
              <th>Category</th>
              <th>Application Fees</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app._id}>
                <td>{app.universityName}</td>
                <td>{app.scholarshipCategory}</td>
                <td>{app.feedback || "-"}</td>
                <td>{app.degree}</td>
                <td>${app.applicationFees || 0}</td>
                <td>{app.applicationStatus}</td>
                <td className="flex gap-2">
                  {app.applicationStatus === "pending" && (
                    <>
                      <button className="btn btn-sm btn-outline btn-primary" onClick={() => navigate(`/applications/edit/${app._id}`)}>Edit</button>
                      {app.paymentStatus === "unpaid" && (
                        <button className="btn btn-sm btn-outline btn-success" onClick={() => navigate(`/checkout/${app._id}`)}>Pay</button>
                      )}
                      <button className="btn btn-sm btn-outline btn-error" onClick={() => handleDelete(app._id)}>Delete</button>
                    </>
                  )}
                  {app.applicationStatus === "completed" && (
                    <button className="btn btn-sm btn-outline btn-warning" onClick={() => setReviewModal({ open: true, appId: app._id })}>Add Review</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {reviewModal.open && (
        <AddReviewModal
          scholarshipId={reviewModal.appId}
          onClose={() => setReviewModal({ open: false, appId: null })}
          refresh={fetchApplications}
        />
      )}
    </div>
  );
};

export default MyApplications;
