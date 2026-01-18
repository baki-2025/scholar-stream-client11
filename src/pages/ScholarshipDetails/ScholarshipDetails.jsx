import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../Components/Loading";

const ScholarshipDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [scholarship, setScholarship] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ----------------------------
  // Fetch Scholarship Details
  // ----------------------------
  useEffect(() => {
    let isMounted = true;

    const fetchDetails = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await axiosSecure.get(`/scholarships/${id}`);

        if (!res.data) {
          throw new Error("Scholarship not found");
        }

        if (isMounted) {
          setScholarship(res.data);
        }
      } catch (err) {
        console.error("Failed to load scholarship details", err);

        if (isMounted) {
          setError(
            err.response?.data?.message ||
              err.message ||
              "Failed to load scholarship details"
          );
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    if (id) fetchDetails();

    return () => {
      isMounted = false;
    };
  }, [id, axiosSecure]);

  // ----------------------------
  // Fetch Reviews
  // ----------------------------
  useEffect(() => {
    if (!id) return;

    axiosSecure
      .get(`/reviews?scholarshipId=${id}`)
      .then((res) => setReviews(res.data))
      .catch((err) =>
        console.error("Failed to load reviews", err)
      );
  }, [id, axiosSecure]);

  // ----------------------------
  // UI STATES
  // ----------------------------
  if (loading) return <Loading />;

  if (error) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-xl font-semibold text-red-500">
          {error}
        </h2>
      </div>
    );
  }

  if (!scholarship) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-xl font-semibold">
          Scholarship not found
        </h2>
      </div>
    );
  }

  // ----------------------------
  // MAIN RENDER
  // ----------------------------
  return (
    <div className="max-w-6xl mx-auto p-4 space-y-10">
      {/* Scholarship Info */}
      <div className="grid md:grid-cols-2 gap-8">
        <img
          src={scholarship.image}
          alt={scholarship.scholarshipName}
          className="rounded-lg w-full h-72 object-cover"
        />

        <div className="space-y-3">
          <h2 className="text-3xl font-bold">
            {scholarship.scholarshipName}
          </h2>

          <p>
            <strong>University:</strong>{" "}
            {scholarship.universityName}
          </p>

          <p>
            <strong>World Rank:</strong>{" "}
            {scholarship.worldRank}
          </p>

          <p>
            <strong>Location:</strong>{" "}
            {scholarship.city}, {scholarship.country}
          </p>

          <p>
            <strong>Deadline:</strong>{" "}
            {scholarship.deadline}
          </p>

          <p>
            <strong>Degree:</strong>{" "}
            {scholarship.degree}
          </p>

          <p>
            <strong>Subject:</strong>{" "}
            {scholarship.subjectCategory}
          </p>

          <p className="text-lg font-semibold">
            Application Fee: $
            {scholarship.applicationFees}
          </p>

          <p className="text-lg font-semibold">
            Service Charge: $
            {scholarship.serviceCharge}
          </p>

         <button
  onClick={() => navigate(`/payment/${scholarship._id}`)}
  className="btn btn-primary w-full text-black"
>
  Apply
</button>

        </div>
      </div>

      {/* Description */}
      <div>
        <h3 className="text-2xl font-bold mb-3">
          Scholarship Description
        </h3>
        <p className="text-gray-700">
          {scholarship.description}
        </p>
      </div>

      {/* Stipend / Coverage */}
      <div>
        <h3 className="text-2xl font-bold mb-3">
          Stipend / Coverage
        </h3>
        <p className="text-gray-700">
          {scholarship.stipendDetails}
        </p>
      </div>

      {/* Reviews Section */}
      <div>
        <h3 className="text-2xl font-bold mb-6">
          Reviews
        </h3>

        {reviews.length === 0 && (
          <p className="text-gray-500">
            No reviews available.
          </p>
        )}

        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="border p-4 rounded-lg shadow-sm"
            >
              <div className="flex items-center gap-4">
                <img
                  src={review.userImage}
                  alt={review.userName}
                  className="w-12 h-12 rounded-full"
                />

                <div>
                  <h4 className="font-semibold">
                    {review.userName}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {new Date(
                      review.date
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <p className="mt-2">
                ⭐ Rating: {review.rating}/5
              </p>

              <p className="mt-2 text-gray-700">
                {review.comment}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScholarshipDetails;
