import React, { useEffect, useState } from "react";
import axios from "axios";

const AllReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3000/reviews")
      .then((res) => {
        setReviews(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to load reviews");
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this review?")) return;

    try {
      await axios.delete(`http://localhost:3000/reviews/${id}`);
      setReviews((prev) => prev.filter((review) => review._id !== id));
      alert("Review deleted");
    } catch (error) {
      console.error(error);
      alert("Failed to delete review");
    }
  };

  if (loading) return <p className="p-4">Loading reviews...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Reviews</h2>

      {reviews.length === 0 ? (
        <p className="text-gray-500">No reviews found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Student</th>
                <th>Scholarship</th>
                <th>Rating</th>
                <th>Review</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {reviews.map((review) => (
                <tr key={review._id}>
                  <td>{review.email}</td>
                  <td>{review.scholarshipTitle}</td>
                  <td>
                    <span className="badge badge-primary">
                      ⭐ {review.rating}
                    </span>
                  </td>
                  <td className="max-w-xs truncate">
                    {review.comment}
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
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllReviews;
