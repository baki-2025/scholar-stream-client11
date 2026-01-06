import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";

const MyReviews = () => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [editReview, setEditReview] = useState(null);

  useEffect(() => {
    fetch(`VITE_API_URL/reviews/student/${user.email}`)
      .then(res => res.json())
      .then(data => setReviews(data));
  }, [user.email]);

  const deleteReview = async (id) => {
    await fetch(`VITE_API_URL/reviews/${id}`, {
      method: "DELETE",
    });
    setReviews(reviews.filter(r => r._id !== id));
  };

  const updateReview = async () => {
    await fetch(`VITE_API_URL/reviews/${editReview._id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        rating: editReview.rating,
        comment: editReview.comment,
      }),
    });

    setReviews(reviews.map(r =>
      r._id === editReview._id ? editReview : r
    ));
    setEditReview(null);
  };

  return (
    <div className="card bg-base-100 shadow p-6">
      <h2 className="text-2xl text-center font-bold mb-4">My Reviews</h2>

      <table className="table">
        <thead>
          <tr>
            <th>Scholarship Name</th>
            <th>University Name</th>
            <th>Review Comment</th>
            <th>Review Date</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {reviews.map(review => (
            <tr key={review._id}>
              <td>{review.scholarshipName}</td>
              <td>{review.universityName}</td>
              <td>{review.comment}</td>
              <td>{review.date}</td>
              <td>{review.rating} ★</td>
              <td>{review.actions}</td>
              <td className="space-x-1">
                <button
                  onClick={() => setEditReview(review)}
                  className="btn btn-xs btn-info"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteReview(review._id)}
                  className="btn btn-xs btn-error"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {editReview && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold">Edit Review</h3>

            <select
              value={editReview.rating}
              onChange={(e) =>
                setEditReview({ ...editReview, rating: e.target.value })
              }
              className="select select-bordered w-full"
            >
              <option value="5">★★★★★</option>
              <option value="4">★★★★</option>
              <option value="3">★★★</option>
              <option value="2">★★</option>
              <option value="1">★</option>
            </select>

            <textarea
              className="textarea textarea-bordered w-full mt-2"
              value={editReview.comment}
              onChange={(e) =>
                setEditReview({ ...editReview, comment: e.target.value })
              }
            />

            <div className="modal-action">
              <button onClick={updateReview} className="btn btn-success">
                Update
              </button>
              <button
                onClick={() => setEditReview(null)}
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

export default MyReviews;
