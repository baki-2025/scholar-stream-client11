import { useEffect, useState } from "react";
import AddReviewModal from "./AddReviewModal";

const Reviews = ({ scholarshipId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchReviews = () => {
    fetch(`http://localhost:3000/reviews/${scholarshipId}`)
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchReviews();
  }, [scholarshipId]);

  if (loading) return <p className="text-center my-10">Loading reviews...</p>;

  return (
    <section className="mt-12">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-bold">Reviews</h3>
        <button className="btn btn-sm btn-outline" onClick={() => setModalOpen(true)}>
          Add Review
        </button>
      </div>

      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((rev) => (
            <div key={rev._id} className="border p-4 rounded-lg shadow-sm">
              <p className="font-semibold">{rev.userName}</p>
              <p className="text-sm text-gray-500">{new Date(rev.reviewDate).toLocaleDateString()}</p>
              <p>Rating: {rev.ratingPoint}/5</p>
              <p>{rev.reviewComment}</p>
            </div>
          ))}
        </div>
      )}

      {modalOpen && <AddReviewModal scholarshipId={scholarshipId} onClose={() => setModalOpen(false)} refresh={fetchReviews} />}
    </section>
  );
};

export default Reviews;
