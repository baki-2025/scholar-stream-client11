import { useEffect, useState } from "react";

const MyReviews = ({ userEmail }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = () => {
    fetch("http://localhost:3000/reviews")
      .then((res) => res.json())
      .then((data) => {
        setReviews(data.filter(r => r.userEmail === userEmail));
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchReviews();
  }, [userEmail]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this review?")) return;
    const res = await fetch(`http://localhost:3000/reviews/${id}`, { method: "DELETE" });
    if (res.ok) fetchReviews();
    else alert("Failed to delete");
  };

  if (loading) return <p className="text-center my-10">Loading reviews...</p>;

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">My Reviews</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Scholarship</th>
              <th>University</th>
              <th>Comment</th>
              <th>Rating</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((rev) => (
              <tr key={rev._id}>
                <td>{rev.scholarshipId}</td>
                <td>{rev.universityName}</td>
                <td>{rev.reviewComment}</td>
                <td>{rev.ratingPoint}</td>
                <td>{new Date(rev.reviewDate).toLocaleDateString()}</td>
                <td>
                  <button className="btn btn-sm btn-error" onClick={() => handleDelete(rev._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyReviews;
