import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";

const ScholarshipDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [scholarship, setScholarship] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Fetch scholarship details
    fetch(`${import.meta.env.VITE_API_URL}/scholarships/${id}`)
      .then(res => res.json())
      .then(data => setScholarship(data));

    // Fetch reviews
    fetch(`${import.meta.env.VITE_API_URL}/reviews?scholarshipId=${id}`)
      .then(res => res.json())
      .then(data => setReviews(data));
  }, [id]);

  if (!scholarship) return <p className="text-center">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Scholarship Info */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <img
          src={scholarship.universityImage}
          alt="University"
          className="w-full h-64 object-cover rounded"
        />

        <div>
          <h1 className="text-3xl font-bold mb-2">{scholarship.scholarshipName}</h1>
          <p><b>University Rank:</b> {scholarship.worldRank}</p>
          <p><b>Deadline:</b> {scholarship.deadline}</p>
          <p><b>Location:</b> {scholarship.country}, {scholarship.city}</p>
          <p><b>Application Fees:</b> {scholarship.applicationFees || "Free"}</p>
          <p className="mt-3"><b>Stipend/Coverage:</b> {scholarship.stipend}</p>

          <button
            onClick={() => navigate(`/checkout/${id}`)}
            className="mt-5 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Apply for Scholarship
          </button>
        </div>
      </div>

      {/* Description */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-2">Scholarship Description</h2>
        <p>{scholarship.description}</p>
      </div>

      {/* Reviews Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Student Reviews</h2>

        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          reviews.map(review => (
            <div key={review._id} className="border p-4 rounded mb-4">
              <div className="flex items-center gap-3 mb-2">
                <img
                  src={review.userImage}
                  alt="Reviewer"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-semibold">{review.userName}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(review.date).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <p className="text-yellow-500">
                {"★".repeat(review.rating)}
                {"☆".repeat(5 - review.rating)}
              </p>

              <p className="mt-2">{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ScholarshipDetails;
