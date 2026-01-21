// import { useEffect, useState } from "react";

// const AllReviews = () => {
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchReviews = () => {
//     fetch("VITE_API_URL/reviews")
//       .then((res) => res.json())
//       .then((data) => {
//         setReviews(data);
//         setLoading(false);
//       });
//   };

//   useEffect(() => {
//     fetchReviews();
//   }, []);

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this review?")) return;
//     const res = await fetch(`VITE_API_URL/reviews/${id}`, { method: "DELETE" });
//     if (res.ok) fetchReviews();
//     else alert("Failed to delete");
//   };

//   if (loading) return <p className="text-center my-10">Loading reviews...</p>;

//   return (
//     <div>
//       <h2 className="text-3xl text-center font-bold mb-6">Manage Reviews</h2>
//       <div className="overflow-x-auto">
//         <table className="table w-full">
//           <thead>
//             <tr>
//               <th>User</th>
//               <th>University</th>
//               <th>Rating</th>
//               <th>Comment</th>
//               <th>Date</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {reviews.map((rev) => (
//               <tr key={rev._id}>
//                 <td>{rev.userName}</td>
//                 <td>{rev.universityName}</td>
//                 <td>{rev.ratingPoint}</td>
//                 <td>{rev.reviewComment}</td>
//                 <td>{new Date(rev.reviewDate).toLocaleDateString()}</td>
//                 <td>
//                   <button className="btn btn-sm btn-error" onClick={() => handleDelete(rev._id)}>
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AllReviews;


import React, { useEffect, useState } from "react";
import axios from "axios";

const AllReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const API = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("access-token");

  // Fetch all reviews
  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/reviews`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setReviews(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Delete review
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this review?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API}/reviews/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      setReviews(reviews.filter((review) => review._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete review");
    }
  };

  if (loading) {
    return <p className="text-center mt-6">Loading reviews...</p>;
  }

  return (
    <div className="card bg-base-100 shadow p-6">
      <h2 className="text-2xl font-bold text-center mb-4">
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
                    src={review.userImage || "https://i.ibb.co/2FsfXqM/user.png"}
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
                <td colSpan="6" className="text-center text-gray-500">
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
