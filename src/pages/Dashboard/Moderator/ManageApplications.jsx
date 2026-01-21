import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageApplications = () => {
  const axiosSecure = useAxiosSecure();

  const [applications, setApplications] = useState([]);
  const [detailsApp, setDetailsApp] = useState(null);
  const [feedbackApp, setFeedbackApp] = useState(null);
  const [feedback, setFeedback] = useState("");

  /* ================= FETCH ALL APPLICATIONS ================= */
  useEffect(() => {
    axiosSecure.get("/moderator/applications").then((res) => {
      setApplications(res.data);
    });
  }, [axiosSecure]);

  /* ================= STATUS UPDATE ================= */
  const updateStatus = async (id, status) => {
    await axiosSecure.patch(`/applications/status/${id}`, { status });

    setApplications((prev) =>
      prev.map((app) =>
        app._id === id ? { ...app, applicationStatus: status } : app
      )
    );

    Swal.fire("Updated!", `Status changed to ${status}`, "success");
  };

  /* ================= REJECT ================= */
  const rejectApplication = async (id) => {
    const confirm = await Swal.fire({
      title: "Reject Application?",
      text: "This application will be rejected",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Reject",
    });

    if (!confirm.isConfirmed) return;

    await axiosSecure.patch(`/applications/status/${id}`, {
      status: "rejected",
    });

    setApplications((prev) =>
      prev.map((app) =>
        app._id === id ? { ...app, applicationStatus: "rejected" } : app
      )
    );

    Swal.fire("Rejected!", "Application has been rejected", "success");
  };

  /* ================= FEEDBACK ================= */
  const submitFeedback = async () => {
    await axiosSecure.patch(`/applications/feedback/${feedbackApp._id}`, {
      feedback,
    });

    setApplications((prev) =>
      prev.map((app) =>
        app._id === feedbackApp._id ? { ...app, feedback } : app
      )
    );

    setFeedbackApp(null);
    setFeedback("");
    Swal.fire("Success!", "Feedback submitted", "success");
  };

  return (
    <div className="card bg-base-100 shadow p-6">
      <h2 className="text-2xl text-center font-bold mb-6">
        Manage Applied Applications
      </h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Applicant Email</th>
              <th>University</th>
              <th>Feedback</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {applications.map((app) => (
              <tr key={app._id}>
                <td>{app.applicantEmail}</td>
                <td>{app.universityName}</td>
                <td className="max-w-xs truncate">
                  {app.feedback || "No feedback"}
                </td>
                <td>
                  <span className="badge badge-info">
                    {app.applicationStatus}
                  </span>
                </td>
                <td>
                  <span
                    className={`badge ${
                      app.paymentStatus === "paid"
                        ? "badge-success"
                        : "badge-error"
                    }`}
                  >
                    {app.paymentStatus}
                  </span>
                </td>

                <td className="flex flex-wrap gap-1">
                  {/* DETAILS */}
                  <button
                    className="btn btn-xs btn-outline"
                    onClick={() => setDetailsApp(app)}
                  >
                    Details
                  </button>

                  {/* STATUS */}
                  <button
                    className="btn btn-xs btn-warning"
                    onClick={() => updateStatus(app._id, "processing")}
                  >
                    Processing
                  </button>

                  <button
                    className="btn btn-xs btn-success"
                    onClick={() => updateStatus(app._id, "completed")}
                  >
                    Completed
                  </button>

                  {/* FEEDBACK */}
                  <button
                    className="btn btn-xs btn-info"
                    onClick={() => {
                      setFeedbackApp(app);
                      setFeedback(app.feedback || "");
                    }}
                  >
                    Feedback
                  </button>

                  {/* REJECT */}
                  <button
                    className="btn btn-xs btn-error"
                    onClick={() => rejectApplication(app._id)}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* DETAILS MODAL */}
      {detailsApp && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-2">Application Details</h3>

            <p><strong>Applicant:</strong> {detailsApp.applicantEmail}</p>
            <p><strong>University:</strong> {detailsApp.universityName}</p>
            <p><strong>Degree:</strong> {detailsApp.degree}</p>
            <p><strong>Category:</strong> {detailsApp.scholarshipCategory}</p>
            <p><strong>Fees:</strong> ${detailsApp.applicationFees}</p>
            <p><strong>Status:</strong> {detailsApp.applicationStatus}</p>
            <p><strong>Payment:</strong> {detailsApp.paymentStatus}</p>

            <div className="modal-action">
              <button className="btn" onClick={() => setDetailsApp(null)}>
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}

      {/* FEEDBACK MODAL */}
      {feedbackApp && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-3">Write Feedback</h3>

            <textarea
              className="textarea textarea-bordered w-full"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Write constructive feedback..."
            />

            <div className="modal-action">
              <button onClick={submitFeedback} className="btn btn-success">
                Submit
              </button>
              <button
                onClick={() => setFeedbackApp(null)}
                className="btn"
              >
                Cancel
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ManageApplications;
