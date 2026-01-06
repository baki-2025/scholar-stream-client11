// import React, { useEffect, useState } from "react";
// import useAuth from "../../../hooks/useAuth";

// const MyApplications = () => {
//   const { user } = useAuth();
//   const [applications, setApplications] = useState([]);

//   useEffect(() => {
//     fetch(`VITE_API_URL/applications?email=${user.email}`)
//       .then(res => res.json())
//       .then(data => setApplications(data));
//   }, [user.email]);

//   const handlePay = async (id) => {
//     await fetch(`VITE_API_URL/applications/pay/${id}`, {
//       method: "PATCH",
//     });

//     setApplications(applications.map(app =>
//       app._id === id ? { ...app, paymentStatus: "paid" } : app
//     ));
//   };

//   const handleDelete = async (id) => {
//     if (!confirm("Are you sure?")) return;

//     await fetch(`VITE_API_URL/applications/${id}`, {
//       method: "DELETE",
//     });

//     setApplications(applications.filter(app => app._id !== id));
//   };

//   return (
//     <div className="card bg-base-100 shadow p-6">
//       <h2 className="text-2xl text-center font-bold mb-4">My Applications</h2>

//       <table className="table table-zebra">
//         <thead>
//           <tr>
//             <th>University Name</th>
//             <th>University Address</th>
//             <th>Feedback</th>
//             <th>Subject Category</th>
//             <th>Application Fees</th>
//             <th>Application Status</th>
//             <th>Actions</th>
//           </tr>
//         </thead>

//         <tbody>
//           {applications.map(app => (
//             <tr key={app._id}>
//               <td>{app.universityName}</td>
//               <td>{app.universityAddress}</td>
//               <td>{app.feedback}</td>
//               <td>{app.subjectCategory}</td>
//               <td>{app.applicationFees}</td>
//               <td>
//                 <span className="badge badge-info">
//                   {app.applicationStatus}
//                 </span>
//               </td>
//               <td>
//                 <span className={`badge ${
//                   app.paymentStatus === "paid"
//                     ? "badge-success"
//                     : "badge-error"
//                 }`}>
//                   {app.paymentStatus}
//                 </span>
//               </td>
//               <td className="space-x-2">
//                 {app.applicationStatus === "pending" && (
//                   <>
//                     {app.paymentStatus === "unpaid" && (
//                       <button
//                         onClick={() => handlePay(app._id)}
//                         className="btn btn-xs btn-success"
//                       >
//                         Pay
//                       </button>
//                     )}

//                     <button
//                       onClick={() => handleDelete(app._id)}
//                       className="btn btn-xs btn-error"
//                     >
//                       Delete
//                     </button>
//                   </>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default MyApplications;



import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";

const MyApplications = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [review, setReview] = useState({ rating: 5, comment: "" });

  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
  if (!user?.email) return;

  fetch(`${API}/applications?email=${user.email}`, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("access-token")}`,
    },
  })
    .then(res => {
      if (!res.ok) {
        return [];
      }
      return res.json();
    })
    .then(data => {
      if (Array.isArray(data)) {
        setApplications(data);
      } else {
        setApplications([]);
      }
    });
}, [API, user]);



  // ================= ACTIONS =================

  const handlePay = async (id) => {
    await fetch(`${API}/applications/pay/${id}`, { method: "PATCH" });

    setApplications(prev =>
      prev.map(app =>
        app._id === id ? { ...app, paymentStatus: "paid" } : app
      )
    );
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure?")) return;

    await fetch(`${API}/applications/${id}`, { method: "DELETE" });

    setApplications(prev => prev.filter(app => app._id !== id));
  };

  const handleAddReview = async () => {
    const reviewData = {
      scholarshipId: selectedApp.scholarshipId,
      universityName: selectedApp.universityName,
      userName: user.displayName,
      userEmail: user.email,
      ratingPoint: review.rating,
      reviewComment: review.comment,
    };

    await fetch(`${API}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reviewData),
    });

    document.getElementById("reviewModal").close();
  };

  // ================= UI =================

  return (
    <div className="card bg-base-100 shadow p-6">
      <h2 className="text-2xl font-bold text-center mb-6">
        My Applications
      </h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>University</th>
              <th>Address</th>
              <th>Feedback</th>
              <th>Subject</th>
              <th>Fees</th>
              <th>Status</th>
              <th>Payment</th>
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

                <td className="space-x-1">
                  {/* DETAILS */}
                  <button
                    className="btn btn-xs"
                    onClick={() => {
                      setSelectedApp(app);
                      document.getElementById("detailsModal").showModal();
                    }}
                  >
                    Details
                  </button>

                  {/* PENDING ACTIONS */}
                  {app.applicationStatus === "pending" && (
                    <>
                      {app.paymentStatus === "unpaid" && (
                        <button
                          onClick={() => handlePay(app._id)}
                          className="btn btn-xs btn-success"
                        >
                          Pay
                        </button>
                      )}

                      <button
                        onClick={() => handleDelete(app._id)}
                        className="btn btn-xs btn-error"
                      >
                        Delete
                      </button>
                    </>
                  )}

                  {/* COMPLETED → REVIEW */}
                  {app.applicationStatus === "completed" && (
                    <button
                      className="btn btn-xs btn-warning"
                      onClick={() => {
                        setSelectedApp(app);
                        document.getElementById("reviewModal").showModal();
                      }}
                    >
                      Add Review
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= DETAILS MODAL ================= */}
      <dialog id="detailsModal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Application Details</h3>
          {selectedApp && (
            <div className="space-y-2 mt-4">
              <p><b>University:</b> {selectedApp.universityName}</p>
              <p><b>Degree:</b> {selectedApp.degree}</p>
              <p><b>Status:</b> {selectedApp.applicationStatus}</p>
              <p><b>Feedback:</b> {selectedApp.feedback || "N/A"}</p>
            </div>
          )}
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>

      {/* ================= REVIEW MODAL ================= */}
      <dialog id="reviewModal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add Review</h3>

          <select
            className="select select-bordered w-full mt-4"
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
            className="textarea textarea-bordered w-full mt-3"
            placeholder="Write your review"
            onChange={(e) =>
              setReview({ ...review, comment: e.target.value })
            }
          />

          <div className="modal-action">
            <button
              onClick={handleAddReview}
              className="btn btn-success"
            >
              Submit
            </button>
            <form method="dialog">
              <button className="btn">Cancel</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MyApplications;
