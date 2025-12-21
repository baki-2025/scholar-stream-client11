import { useNavigate } from "react-router";

const ScholarshipCard = ({ scholarship }) => {
  const navigate = useNavigate();
  return (
    <div className="card bg-base-100 shadow-md border hover:shadow-xl transition duration-200">
      <figure>
        <img
          src={scholarship.universityImage || "/placeholder.jpg"}
          alt={scholarship.universityName}
          className="h-44 w-full object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="font-bold text-lg">{scholarship.universityName}</h2>
        <p><strong>Category:</strong> {scholarship.scholarshipCategory}</p>
        <p><strong>Location:</strong> {scholarship.universityCountry}</p>
        <p><strong>Application Fee:</strong> {scholarship.applicationFee || "Free"}</p>
        <div className="card-actions justify-end mt-3">
          <button
            className="btn btn-primary btn-sm"
            onClick={() => navigate(`/scholarships/${scholarship._id}`)}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipCard;
