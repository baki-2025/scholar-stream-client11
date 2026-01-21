// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const AllReviews = () => {
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const API = import.meta.env.VITE_API_URL;
//   const token = localStorage.getItem("access-token");

//   // Fetch all reviews
//   const fetchReviews = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(`${API}/reviews`, {
//         headers: {
//           authorization: `Bearer ${token}`,
//         },
//       });
//       setReviews(res.data);
//       setLoading(false);
//     } catch (err) {
//       console.error(err);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchReviews();
//   }, []);

//   // Delete review
//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this review?"
//     );
//     if (!confirmDelete) return;

//     try {
//       await axios.delete(`${API}/reviews/${id}`, {
//         headers: {
//           authorization: `Bearer ${token}`,
//         },
//       });

//       setReviews(reviews.filter((review) => review._id !== id));
//     } catch (err) {
//       console.error(err);
//       alert("Failed to delete review");
//     }
//   };

//   if (loading) {
//     return <p className="text-center mt-6">Loading reviews...</p>;
//   }

//   return (
//     <div className="card bg-base-100 shadow p-6">
//       <h2 className="text-2xl font-bold text-center mb-4">
//         All Reviews
//       </h2>

//       <div className="overflow-x-auto">
//         <table className="table table-zebra w-full">
//           <thead>
//             <tr>
//               <th>User</th>
//               <th>Email</th>
//               <th>University</th>
//               <th>Rating</th>
//               <th>Comment</th>
//               <th>Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {reviews.map((review) => (
//               <tr key={review._id}>
//                 <td className="flex items-center gap-2">
//                   <img
//                     src={review.userImage || "https://i.ibb.co/2FsfXqM/user.png"}
//                     alt="user"
//                     className="w-8 h-8 rounded-full"
//                   />
//                   {review.userName}
//                 </td>
//                 <td>{review.userEmail}</td>
//                 <td>{review.universityName}</td>
//                 <td>
//                   <span className="badge badge-warning">
//                     ⭐ {review.ratingPoint}
//                   </span>
//                 </td>
//                 <td className="max-w-xs truncate">
//                   {review.reviewComment}
//                 </td>
//                 <td>
//                   <button
//                     onClick={() => handleDelete(review._id)}
//                     className="btn btn-xs btn-error"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}

//             {reviews.length === 0 && (
//               <tr>
//                 <td colSpan="6" className="text-center text-gray-500">
//                   No reviews found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AllReviews;



import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const AllReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const API = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("access-token");

  /* ================= FETCH REVIEWS ================= */
  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/reviews`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setReviews(res.data);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to load reviews", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  /* ================= DELETE REVIEW ================= */
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Review?",
      text: "This review will be permanently removed",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(`${API}/reviews/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      setReviews((prev) =>
        prev.filter((review) => review._id !== id)
      );

      Swal.fire("Deleted!", "Review has been removed.", "success");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to delete review", "error");
    }
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="flex justify-center mt-10">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="card bg-base-100 shadow p-6">
      <h2 className="text-2xl font-bold text-center mb-6">
        All Reviews
      </h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>University</th>
              <th>Rating</th>
              <th>Comment</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {reviews.map((review) => (
              <tr key={review._id}>
                <td className="flex items-center gap-2">
                  <img
                    src={
                      review.userImage ||
                      "https://i.ibb.co/2FsfXqM/user.png"
                    }
                    alt="user"
                    className="w-8 h-8 rounded-full"
                  />
                  {review.userName}
                </td>

                <td>{review.userEmail}</td>
                <td>{review.universityName}</td>

                <td>
                  <span className="badge badge-warning">
                    ⭐ {review.ratingPoint}
                  </span>
                </td>

                <td className="max-w-xs truncate">
                  {review.reviewComment}
                </td>

                <td>
                  <button
                    onClick={() => handleDelete(review._id)}
                    className="btn btn-xs btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {reviews.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="text-center text-gray-500 py-6"
                >
                  No reviews found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllReviews;
