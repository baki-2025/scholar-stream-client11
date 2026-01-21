// import { useContext, useState } from "react";
// import {
//   useQuery,
//   useQueryClient
// } from "@tanstack/react-query";
// import { Link } from "react-router";
// import Swal from "sweetalert2";
// import { AuthContext } from "../../../contexts/AuthContext";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";

// const MyApplications = () => {
//   const { user } = useContext(AuthContext);
//   const axiosSecure = useAxiosSecure();
//   const queryClient = useQueryClient();

//   const [detailsApp, setDetailsApp] = useState(null);
//   const [editApp, setEditApp] = useState(null);

//   const { data: applications = [], isLoading } = useQuery({
//     queryKey: ["myApplications", user?.email],
//     enabled: !!user?.email,
//     queryFn: async () => {
//       const res = await axiosSecure.get(
//         `/applications?email=${user.email}`
//       );
//       return res.data;
//     },
//   });

//   /* ================= DELETE ================= */
//   const handleDelete = async (id) => {
//     const confirm = await Swal.fire({
//       title: "Are you sure?",
//       text: "This application will be deleted",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       confirmButtonText: "Yes, delete",
//     });

//     if (confirm.isConfirmed) {
//       await axiosSecure.delete(`/applications/${id}`);
//       queryClient.invalidateQueries(["myApplications"]);

//       Swal.fire("Deleted!", "Application removed", "success");
//     }
//   };

//   /* ================= EDIT ================= */
//   const handleEdit = async (e) => {
//     e.preventDefault();

//     const form = e.target;
//     const updatedData = {
//       degree: form.degree.value,
//       subjectCategory: form.subjectCategory.value,
//     };

//     await axiosSecure.patch(
//       `/applications/${editApp._id}`,
//       updatedData
//     );

//     setEditApp(null);
//     queryClient.invalidateQueries(["myApplications"]);

//     Swal.fire("Updated!", "Application updated", "success");
//   };

//   if (isLoading) {
//     return <span className="loading loading-infinity loading-lg"></span>;
//   }

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl text-center font-bold mb-6">
//         My Applications
//       </h2>

//       <div className="overflow-x-auto">
//         <table className="table table-zebra">
//           <thead>
//             <tr>
//               <th>University</th>
//               <th>Category</th>
//               <th>Status</th>
//               <th>Payment</th>
//               <th>Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {applications.map((app) => (
//               <tr key={app._id}>
//                 <td>{app.universityName}</td>
//                 <td>{app.scholarshipCategory}</td>
//                 <td>
//                   <span className="badge badge-info">
//                     {app.applicationStatus}
//                   </span>
//                 </td>
//                 <td>
//                   <span
//                     className={`badge ${
//                       app.paymentStatus === "paid"
//                         ? "badge-success"
//                         : "badge-warning"
//                     }`}
//                   >
//                     {app.paymentStatus}
//                   </span>
//                 </td>

//                 <td className="flex flex-wrap gap-2">
//                   {/* DETAILS */}
//                   <button
//                     className="btn btn-xs btn-outline"
//                     onClick={() => setDetailsApp(app)}
//                   >
//                     Details
//                   </button>

//                   {/* PENDING ONLY */}
//                   {app.applicationStatus === "pending" && (
//                     <>
//                       <button
//                         className="btn btn-xs btn-warning"
//                         onClick={() => setEditApp(app)}
//                       >
//                         Edit
//                       </button>

//                       {app.paymentStatus === "unpaid" && (
//                         <Link
//                           to={`/payment/${app.scholarshipId}/${app._id}`}
//                           className="btn btn-xs btn-success"
//                         >
//                           Pay
//                         </Link>
//                       )}

//                       <button
//                         className="btn btn-xs btn-error"
//                         onClick={() => handleDelete(app._id)}
//                       >
//                         Delete
//                       </button>
//                     </>
//                   )}

//                   {/* COMPLETED */}
//                   {app.applicationStatus === "completed" && (
//                     <button className="btn btn-xs btn-primary">
//                       Add Review
//                     </button>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* DETAILS MODAL */}
//       {detailsApp && (
//         <dialog open className="modal">
//           <div className="modal-box">
//             <h3 className="font-bold text-lg">
//               Application Details
//             </h3>
//             <p><strong>University:</strong> {detailsApp.universityName}</p>
//             <p><strong>Degree:</strong> {detailsApp.degree}</p>
//             <p><strong>Status:</strong> {detailsApp.applicationStatus}</p>

//             <div className="modal-action">
//               <button className="btn" onClick={() => setDetailsApp(null)}>
//                 Close
//               </button>
//             </div>
//           </div>
//         </dialog>
//       )}

//       {/* EDIT MODAL */}
//       {editApp && (
//         <dialog open className="modal">
//           <div className="modal-box">
//             <h3 className="font-bold text-lg mb-3">
//               Edit Application
//             </h3>

//             <form onSubmit={handleEdit}>
//               <label className="label">Degree</label>
//               <select
//                 name="degree"
//                 defaultValue={editApp.degree}
//                 className="select select-bordered w-full mb-3"
//               >
//                 <option>Bachelor</option>
//                 <option>Masters</option>
//                 <option>Diploma</option>
//               </select>

//               <label className="label">Subject Category</label>
//               <input
//                 name="subjectCategory"
//                 defaultValue={editApp.subjectCategory}
//                 className="input input-bordered w-full mb-4"
//                 required
//               />

//               <div className="modal-action">
//                 <button className="btn btn-success">Update</button>
//                 <button
//                   type="button"
//                   className="btn"
//                   onClick={() => setEditApp(null)}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </dialog>
//       )}
//     </div>
//   );
// };

// export default MyApplications;



import { useContext, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../../contexts/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyApplications = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [detailsApp, setDetailsApp] = useState(null);
  const [editApp, setEditApp] = useState(null);
  const [reviewApp, setReviewApp] = useState(null);

  /* ================= FETCH ================= */
  const { data: applications = [], isLoading } = useQuery({
    queryKey: ["myApplications", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/applications?email=${user.email}`);
      return res.data;
    },
  });

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This application will be deleted",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete",
    });

    if (confirm.isConfirmed) {
      await axiosSecure.delete(`/applications/${id}`);
      queryClient.invalidateQueries(["myApplications"]);
      Swal.fire("Deleted!", "Application removed", "success");
    }
  };

  /* ================= EDIT ================= */
  const handleEdit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const updatedData = {
      degree: form.degree.value,
      subjectCategory: form.subjectCategory.value,
    };

    await axiosSecure.patch(`/applications/${editApp._id}`, updatedData);

    setEditApp(null);
    queryClient.invalidateQueries(["myApplications"]);
    Swal.fire("Updated!", "Application updated", "success");
  };

  /* ================= ADD REVIEW ================= */
  const handleAddReview = async (e) => {
    e.preventDefault();
    const form = e.target;

    const reviewData = {
      scholarshipId: reviewApp.scholarshipId,
      universityName: reviewApp.universityName,
      userName: user.displayName,
      userEmail: user.email,
      userImage: user.photoURL,
      ratingPoint: Number(form.rating.value),
      reviewComment: form.comment.value,
    };

    await axiosSecure.post("/reviews", reviewData);

    setReviewApp(null);
    Swal.fire("Success!", "Review added successfully", "success");
  };

  if (isLoading) {
    return <span className="loading loading-infinity loading-lg"></span>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl text-center font-bold mb-6">
        My Applications
      </h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>University</th>
              <th>Subject</th>
              <th>Fees</th>
              <th>Feedback</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {applications.map((app) => (
              <tr key={app._id}>
                <td>{app.universityName}</td>
                <td>{app.subjectCategory || "N/A"}</td>
                <td>${app.applicationFees}</td>
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
                        : "badge-warning"
                    }`}
                  >
                    {app.paymentStatus}
                  </span>
                </td>

                <td className="flex flex-wrap gap-2">
                  {/* DETAILS */}
                  <button
                    className="btn btn-xs btn-outline"
                    onClick={() => setDetailsApp(app)}
                  >
                    Details
                  </button>

                  {/* PENDING */}
                  {app.applicationStatus === "pending" && (
                    <>
                      <button
                        className="btn btn-xs btn-warning"
                        onClick={() => setEditApp(app)}
                      >
                        Edit
                      </button>

                      {app.paymentStatus === "unpaid" && (
                        <Link
                          to={`/payment/${app.scholarshipId}/${app._id}`}
                          className="btn btn-xs btn-success"
                        >
                          Pay
                        </Link>
                      )}

                      <button
                        className="btn btn-xs btn-error"
                        onClick={() => handleDelete(app._id)}
                      >
                        Delete
                      </button>
                    </>
                  )}

                  {/* COMPLETED */}
                  {app.applicationStatus === "completed" && (
                    <button
                      className="btn btn-xs btn-primary"
                      onClick={() => setReviewApp(app)}
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

      {/* DETAILS MODAL */}
      {detailsApp && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Application Details</h3>
            <p><strong>University:</strong> {detailsApp.universityName}</p>
            <p><strong>Degree:</strong> {detailsApp.degree}</p>
            <p><strong>Category:</strong> {detailsApp.scholarshipCategory}</p>
            <p><strong>Fees:</strong> ${detailsApp.applicationFees}</p>
            <p><strong>Status:</strong> {detailsApp.applicationStatus}</p>
            <p><strong>Feedback:</strong> {detailsApp.feedback || "N/A"}</p>

            <div className="modal-action">
              <button className="btn" onClick={() => setDetailsApp(null)}>
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}

      {/* EDIT MODAL */}
      {editApp && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-3">Edit Application</h3>

            <form onSubmit={handleEdit}>
              <label className="label">Degree</label>
              <select
                name="degree"
                defaultValue={editApp.degree}
                className="select select-bordered w-full mb-3"
              >
                <option>Bachelor</option>
                <option>Masters</option>
                <option>Diploma</option>
              </select>

              <label className="label">Subject Category</label>
              <input
                name="subjectCategory"
                defaultValue={editApp.subjectCategory}
                className="input input-bordered w-full mb-4"
                required
              />

              <div className="modal-action">
                <button className="btn btn-success">Update</button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => setEditApp(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}

      {/* ADD REVIEW MODAL */}
      {reviewApp && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-3">Add Review</h3>

            <form onSubmit={handleAddReview}>
              <label className="label">Rating (1–5)</label>
              <input
                type="number"
                name="rating"
                min="1"
                max="5"
                className="input input-bordered w-full mb-3"
                required
              />

              <label className="label">Comment</label>
              <textarea
                name="comment"
                className="textarea textarea-bordered w-full mb-4"
                required
              />

              <div className="modal-action">
                <button className="btn btn-success">Submit</button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => setReviewApp(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default MyApplications;
