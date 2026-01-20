// import React, { useEffect, useState } from "react";
// import useAuth from "../../../hooks/useAuth";

// const MyReviews = () => {
//   const { user } = useAuth();
//   const [reviews, setReviews] = useState([]);
//   const [editReview, setEditReview] = useState(null);

//   useEffect(() => {
//     fetch(`VITE_API_URL/reviews/student/${user.email}`)
//       .then(res => res.json())
//       .then(data => setReviews(data));
//   }, [user.email]);

//   const deleteReview = async (id) => {
//     await fetch(`VITE_API_URL/reviews/${id}`, {
//       method: "DELETE",
//     });
//     setReviews(reviews.filter(r => r._id !== id));
//   };

//   const updateReview = async () => {
//     await fetch(`VITE_API_URL/reviews/${editReview._id}`, {
//       method: "PATCH",
//       headers: { "content-type": "application/json" },
//       body: JSON.stringify({
//         rating: editReview.rating,
//         comment: editReview.comment,
//       }),
//     });

//     setReviews(reviews.map(r =>
//       r._id === editReview._id ? editReview : r
//     ));
//     setEditReview(null);
//   };

//   return (
//     <div className="card bg-base-100 shadow p-6">
//       <h2 className="text-2xl text-center font-bold mb-4">My Reviews</h2>

//       <table className="table">
//         <thead>
//           <tr>
//             <th>Scholarship Name</th>
//             <th>University Name</th>
//             <th>Review Comment</th>
//             <th>Review Date</th>
//             <th>Rating</th>
//             <th>Actions</th>
//           </tr>
//         </thead>

//         <tbody>
//           {reviews.map(review => (
//             <tr key={review._id}>
//               <td>{review.scholarshipName}</td>
//               <td>{review.universityName}</td>
//               <td>{review.comment}</td>
//               <td>{review.date}</td>
//               <td>{review.rating} ★</td>
//               <td>{review.actions}</td>
//               <td className="space-x-1">
//                 <button
//                   onClick={() => setEditReview(review)}
//                   className="btn btn-xs btn-info"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => deleteReview(review._id)}
//                   className="btn btn-xs btn-error"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Edit Modal */}
//       {editReview && (
//         <div className="modal modal-open">
//           <div className="modal-box">
//             <h3 className="font-bold">Edit Review</h3>

//             <select
//               value={editReview.rating}
//               onChange={(e) =>
//                 setEditReview({ ...editReview, rating: e.target.value })
//               }
//               className="select select-bordered w-full"
//             >
//               <option value="5">★★★★★</option>
//               <option value="4">★★★★</option>
//               <option value="3">★★★</option>
//               <option value="2">★★</option>
//               <option value="1">★</option>
//             </select>

//             <textarea
//               className="textarea textarea-bordered w-full mt-2"
//               value={editReview.comment}
//               onChange={(e) =>
//                 setEditReview({ ...editReview, comment: e.target.value })
//               }
//             />

//             <div className="modal-action">
//               <button onClick={updateReview} className="btn btn-success">
//                 Update
//               </button>
//               <button
//                 onClick={() => setEditReview(null)}
//                 className="btn"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyReviews;



import { useContext, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { AuthContext } from "../../../contexts/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyReviews = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [editingReview, setEditingReview] = useState(null);

  // Fetch all applications that are completed
  const { data: applications = [], isLoading: appsLoading } = useQuery({
    queryKey: ["myApplications", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/applications?email=${user.email}`);
      return res.data.filter(app => app.applicationStatus === "completed");
    },
  });

  // Fetch reviews by user
  const { data: reviews = [], isLoading: reviewsLoading } = useQuery({
    queryKey: ["myReviews", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews?userEmail=${user.email}`);
      return res.data;
    },
  });

  if (appsLoading || reviewsLoading) {
    return <span className="loading loading-infinity loading-lg"></span>;
  }

  // Merge applications with reviews
  const appsWithReviews = applications.map(app => {
    const review = reviews.find(r => r.scholarshipId === app.scholarshipId);
    return { ...app, review };
  });

  /* ================= DELETE REVIEW ================= */
  const handleDeleteReview = async (reviewId) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This review will be deleted",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete",
    });

    if (confirm.isConfirmed) {
      await axiosSecure.delete(`/reviews/${reviewId}`);
      queryClient.invalidateQueries(["myReviews"]);
      Swal.fire("Deleted!", "Review removed", "success");
    }
  };

  /* ================= ADD/EDIT REVIEW ================= */
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const rating = Number(form.rating.value);
    const comment = form.comment.value;

    if (!comment || rating < 1 || rating > 5) {
      Swal.fire("Error", "Please provide a valid rating (1-5) and comment.", "error");
      return;
    }

    if (editingReview) {
      // Edit existing review
      await axiosSecure.patch(`/reviews/${editingReview._id}`, { ratingPoint: rating, reviewComment: comment });
      setEditingReview(null);
    } else {
      // Add new review
      await axiosSecure.post("/reviews", {
        scholarshipId: editingReview?.scholarshipId || "",
        universityName: editingReview?.universityName || "",
        userName: user.displayName,
        userEmail: user.email,
        userImage: user.photoURL || "",
        ratingPoint: rating,
        reviewComment: comment,
      });
    }

    queryClient.invalidateQueries(["myReviews"]);
    Swal.fire("Success!", "Review submitted", "success");
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl text-center font-bold mb-6">
        My Reviews
      </h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>University</th>
              <th>Scholarship</th>
              <th>Rating</th>
              <th>Comment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appsWithReviews.map(app => (
              <tr key={app._id}>
                <td>{app.universityName}</td>
                <td>{app.scholarshipCategory}</td>
                <td>{app.review?.ratingPoint || "-"}</td>
                <td>{app.review?.reviewComment || "-"}</td>
                <td className="flex gap-2 flex-wrap">
                  {!app.review ? (
                    <button
                      className="btn btn-xs btn-primary"
                      onClick={() => setEditingReview(app)}
                    >
                      Add Review
                    </button>
                  ) : (
                    <>
                      <button
                        className="btn btn-xs btn-warning"
                        onClick={() => setEditingReview(app.review)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-xs btn-error"
                        onClick={() => handleDeleteReview(app.review._id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ADD/EDIT REVIEW MODAL */}
      {editingReview && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-3">
              {editingReview._id ? "Edit Review" : "Add Review"}
            </h3>

            <form onSubmit={handleReviewSubmit}>
              <label className="label">Rating (1-5)</label>
              <input
                name="rating"
                type="number"
                defaultValue={editingReview.ratingPoint || 5}
                min={1}
                max={5}
                className="input input-bordered w-full mb-3"
                required
              />

              <label className="label">Comment</label>
              <textarea
                name="comment"
                defaultValue={editingReview.reviewComment || ""}
                className="textarea textarea-bordered w-full mb-4"
                required
              ></textarea>

              <div className="modal-action">
                <button className="btn btn-success">{editingReview._id ? "Update" : "Submit"}</button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => setEditingReview(null)}
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

export default MyReviews;
