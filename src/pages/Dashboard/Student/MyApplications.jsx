import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";

const MyApplications = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [review, setReview] = useState({ rating: 5, comment: "" });

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/applications?email=${user.email}`)
      .then(res => res.json())
      .then(data => setApplications(data));
  }, [user.email]);

  /* ================= PAY ================= */
  const handlePay = async (id) => {
    await fetch(`${import.meta.env.VITE_API_URL}/applications/pay/${id}`, {
      method: "PATCH",
    });

    setApplications(applications.map(app =>
      app._id === id ? { ...app, paymentStatus: "paid" } : app
    ));
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!confirm("Are you sure?")) return;

    await fetch(`${import.meta.env.VITE_API_URL}/applications/${id}`, {
      method: "DELETE",
    });

    setApplications(applications.filter(app => app._id !== id));
  };

  /* ================= ADD REVIEW ================= */
  const handleAddReview = async () => {
    await fetch(`${import.meta.env.VITE_API_URL}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        applicationId: selectedApp._id,
        rating: review.rating,
        comment: review.comment,
        reviewerEmail: user.email,
      }),
    });

    setSelectedApp(null);
    setReview({ rating: 5, comment: "" });
  };

  return (
    <div className="card bg-base-100 shadow p-6">
      <h2 className="text-2xl text-center font-bold mb-4">My Applications</h2>

      <table className="table table-zebra">
        <thead>
          <tr>
            <th>University Name</th>
            <th>University Address</th>
            <th>Feedback</th>
            <th>Subject Category</th>
            <th>Application Fees</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {applications.map(app => (
            <tr key={app._id}>
              <td>{app.universityName}</td>
              <td>{app.universityAddress}</td>
              <td>{app.feedback || "—"}</td>
              <td>{app.subjectCategory}</td>
              <td>${app.applicationFees}</td>
              <td>
                <span className="badge badge-info">
                  {app.applicationStatus}
                </span>
              </td>

              <td className="space-x-2">
                {/* DETAILS */}
                <button
                  className="btn btn-xs"
                  onClick={() => setSelectedApp(app)}
                >
                  Details
                </button>

                {/* EDIT */}
                {app.applicationStatus === "pending" && (
                  <button className="btn btn-xs btn-warning">
                    Edit
                  </button>
                )}

                {/* PAY */}
                {app.applicationStatus === "pending" &&
                  app.paymentStatus === "unpaid" && (
                    <button
                      onClick={() => handlePay(app._id)}
                      className="btn btn-xs btn-success"
                    >
                      Pay
                    </button>
                  )}

                {/* DELETE */}
                {app.applicationStatus === "pending" && (
                  <button
                    onClick={() => handleDelete(app._id)}
                    className="btn btn-xs btn-error"
                  >
                    Delete
                  </button>
                )}

                {/* ADD REVIEW */}
                {app.applicationStatus === "completed" && (
                  <button
                    onClick={() => setSelectedApp(app)}
                    className="btn btn-xs btn-primary"
                  >
                    Add Review
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ================= DETAILS / REVIEW MODAL ================= */}
      {selectedApp && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-2">
              Application Details
            </h3>

            <p><b>University:</b> {selectedApp.universityName}</p>
            <p><b>Subject:</b> {selectedApp.subjectCategory}</p>
            <p><b>Status:</b> {selectedApp.applicationStatus}</p>

            {selectedApp.applicationStatus === "completed" && (
              <>
                <hr className="my-3" />
                <h4 className="font-semibold">Add Review</h4>

                <select
                  className="select select-bordered w-full mt-2"
                  value={review.rating}
                  onChange={(e) =>
                    setReview({ ...review, rating: e.target.value })
                  }
                >
                  {[1, 2, 3, 4, 5].map(r => (
                    <option key={r} value={r}>{r} Star</option>
                  ))}
                </select>

                <textarea
                  className="textarea textarea-bordered w-full mt-2"
                  placeholder="Write your comment"
                  value={review.comment}
                  onChange={(e) =>
                    setReview({ ...review, comment: e.target.value })
                  }
                />

                <button
                  onClick={handleAddReview}
                  className="btn btn-primary mt-3"
                >
                  Submit Review
                </button>
              </>
            )}

            <div className="modal-action">
              <button className="btn" onClick={() => setSelectedApp(null)}>
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default MyApplications;
