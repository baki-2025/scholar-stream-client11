import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import Reviews from "./Reviews";
import { motion } from "framer-motion";

const ScholarshipDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [scholarship, setScholarship] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/scholarships/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setScholarship(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center my-10">Loading...</p>;
  if (!scholarship) return <p className="text-center my-10">Scholarship not found</p>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-5xl mx-auto px-4 py-10"
    >
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Image */}
        <div className="flex-1">
          <img
            src={scholarship.universityImage}
            alt={scholarship.universityName}
            className="w-full h-80 object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Details */}
        <div className="flex-1 space-y-4">
          <h2 className="text-4xl font-bold">{scholarship.scholarshipName}</h2>
          <p className="text-lg font-medium">{scholarship.universityName}</p>
          <p>
            <strong>Location:</strong> {scholarship.universityCity}, {scholarship.universityCountry}
          </p>
          <p>
            <strong>World Rank:</strong> {scholarship.universityWorldRank || "N/A"}
          </p>
          <p>
            <strong>Degree:</strong> {scholarship.degree}
          </p>
          <p>
            <strong>Scholarship Category:</strong> {scholarship.scholarshipCategory}
          </p>
          <p>
            <strong>Application Fees:</strong> ${scholarship.applicationFees || 0}
          </p>
          <p>
            <strong>Service Charge:</strong> ${scholarship.serviceCharge || 0}
          </p>
          <p>
            <strong>Application Deadline:</strong>{" "}
            {new Date(scholarship.applicationDeadline).toLocaleDateString()}
          </p>
          <p>
            <strong>Post Date:</strong>{" "}
            {new Date(scholarship.scholarshipPostDate).toLocaleDateString()}
          </p>

          <button
            onClick={() => navigate(`/checkout/${scholarship._id}`)}
            className="btn btn-primary mt-4"
          >
            Apply for Scholarship
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      <Reviews scholarshipId={scholarship._id} />
    </motion.div>
  );
};

export default ScholarshipDetails;
