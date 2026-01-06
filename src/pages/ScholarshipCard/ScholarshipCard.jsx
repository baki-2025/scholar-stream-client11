// import { useNavigate } from "react-router";

// const ScholarshipCard = ({ scholarship }) => {
//   const navigate = useNavigate();
//   return (
//     <div className="card bg-base-100 shadow-md border hover:shadow-xl transition duration-200">
//       <figure>
//         <img
//           src={scholarship.universityImage}
//           alt={scholarship.universityName}
//           className="h-44 w-full object-cover"
//         />
//       </figure>
//       <div className="card-body">
//         <h2 className="font-bold text-lg">{scholarship.universityName}</h2>
//         <p><strong>Category:</strong> {scholarship.scholarshipCategory}</p>
//         <p><strong>Location:</strong> {scholarship.universityCountry}</p>
//         <p><strong>Application Fee:</strong> {scholarship.applicationFee || "Free"}</p>
//         <div className="card-actions justify-end mt-3">
//           <button
//             className="btn btn-primary btn-sm"
//             onClick={() => navigate(`/scholarshipDetails/${scholarship._id}`)}
//           >
//             View Details
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ScholarshipCard;



import { useNavigate } from "react-router";

const ScholarshipCard = ({ scholarship }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-xl transition">
      <img
        src={scholarship.universityImage}
        alt={scholarship.universityName}
        className="h-44 w-full object-cover rounded-t-lg"
      />

      <div className="p-4 space-y-1">
        <h2 className="font-bold text-lg">
          {scholarship.universityName}
        </h2>

        <p className="text-sm">
          <strong>Category:</strong> {scholarship.scholarshipCategory}
        </p>

        <p className="text-sm">
          <strong>Location:</strong> {scholarship.universityCountry}
        </p>

        <p className="text-sm">
          <strong>Application Fee:</strong>{" "}
          {scholarship.applicationFee || "Free"}
        </p>

        <button
          onClick={() =>
            navigate(`/scholarshipDetails/${scholarship._id}`)
          }
          className="w-full mt-3 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default ScholarshipCard;
