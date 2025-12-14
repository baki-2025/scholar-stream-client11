// MyReviews.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const MyReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch logged-in student's reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get("http://localhost:3000/reviews/my");
        setReviews(res.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        alert("Failed to load reviews");
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  // Delete review
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this review?")) return;

    try {
      await axios.delete(`http://localhost:3000/reviews/${id}`);
      setReviews(reviews.filter(r => r._id !== id));
      alert("Review deleted");
    } catch (error) {
      console.error(error);
      alert("Failed to delete review");
    }
  };

  if (loading) return <p className="p-4">Loading reviews...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Reviews</h2>

      {reviews.length === 0 ? (
        <p className="text-gray-500">You haven’t posted any reviews yet.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {reviews.map(review => (
            <div
              key={review._id}
              className="bg-white p-4 rounded shadow"
            >
              <h3 className="font-semibold text-lg">
                {review.scholarshipTitle}
              </h3>

              <p className="text-sm text-gray-500 mb-1">
                Rating: ⭐ {review.rating}/5
              </p>

              <p className="mb-3">{review.comment}</p>

              <div className="flex justify-end gap-2">
                {/* Optional Edit Button */}
                {/* <button className="bg-yellow-500 text-white px-3 py-1 rounded">
                  Edit
                </button> */}

                <button
                  onClick={() => handleDelete(review._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyReviews;
