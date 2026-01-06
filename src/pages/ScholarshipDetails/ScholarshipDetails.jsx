// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router";

// const ScholarshipDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [scholarship, setScholarship] = useState(null);
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchDetails = async () => {
//       try {
//         const resScholarship = await fetch(`VITE_API_URL/scholarships/${id}`);
//         const s = await resScholarship.json();
//         setScholarship(s);

//         const resReviews = await fetch(`VITE_API_URL/reviews?scholarshipId=${id}`);
//         const r = await resReviews.json();
//         setReviews(r);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchDetails();
//   }, [id]);

//   if (loading) return <p>Loading...</p>;
//   if (!scholarship) return <p>Scholarship not found</p>;

//   return (
//     <div className="max-w-5xl mx-auto px-4 py-8">
//       {/* Hero */}
//       <div className="flex flex-col md:flex-row gap-6">
//         <img src={scholarship.universityImage} alt={scholarship.universityName} className="w-full md:w-1/3 h-60 object-cover rounded-lg"/>
//         <div className="flex-1">
//           <h1 className="text-3xl font-bold">{scholarship.scholarshipName}</h1>
//           <p>{scholarship.universityName} | Rank: {scholarship.worldRank}</p>
//           <p>Deadline: {scholarship.deadline}</p>
//           <p>Location: {scholarship.location}</p>
//           <p>Fees: {scholarship.applicationFees}</p>
//           <button onClick={() => navigate(`/checkout/${id}`)} className="mt-4 bg-blue-600 text-white py-3 px-6 rounded hover:bg-blue-700">Apply for Scholarship</button>
//         </div>
//       </div>

//       {/* Description & Stipend */}
//       <div className="bg-white shadow rounded-lg p-6 mt-6">
//         <h2 className="text-2xl font-semibold mb-2">Description</h2>
//         <p>{scholarship.description}</p>
//         {scholarship.stipend && (
//           <>
//             <h2 className="text-2xl font-semibold mt-4 mb-2">Stipend / Coverage</h2>
//             <p>{scholarship.stipend}</p>
//           </>
//         )}
//       </div>

//       {/* Reviews */}
//       <div className="mt-6">
//         <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
//         {reviews.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             {reviews.map(review => (
//               <div key={review._id} className="bg-gray-50 p-4 rounded shadow-sm">
//                 <div className="flex items-center mb-2">
//                   <img src={review.reviewerImage} alt={review.reviewerName} className="w-10 h-10 rounded-full mr-3 object-cover"/>
//                   <div>
//                     <p className="font-semibold">{review.reviewerName}</p>
//                     <p className="text-gray-500 text-sm">{new Date(review.date).toLocaleDateString()}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center mb-2">
//                   {Array.from({ length: 5 }, (_, i) => (
//                     <span key={i} className={`text-yellow-500 ${i >= review.rating ? "text-gray-300" : ""}`}>★</span>
//                   ))}
//                 </div>
//                 <p>{review.comment}</p>
//               </div>
//             ))}
//           </div>
//         ) : <p>No reviews yet.</p>}
//       </div>
//     </div>
//   );
// };

// export default ScholarshipDetails;


import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { FaStar } from "react-icons/fa";

const ScholarshipDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [scholarship, setScholarship] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchDetails = async () => {
  //     try {
  //       const scholarshipRes = await fetch(
  //         `${import.meta.env.VITE_API_URL}/scholarships/${id}`
  //       );
  //       const scholarshipData = await scholarshipRes.json();
  //       setScholarship(scholarshipData);

  //       const reviewRes = await fetch(
  //         `${import.meta.env.VITE_API_URL}/reviews?scholarshipId=${id}`
  //       );
  //       const reviewData = await reviewRes.json();
  //       setReviews(reviewData);
  //     } catch (error) {
  //       console.error("Failed to load scholarship details", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchDetails();
  // }, [id]);

  useEffect(() => {
  const fetchDetails = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/scholarships/${id}`
      );

      if (!res.ok) {
        throw new Error("Scholarship not found");
      }

      const data = await res.json();
      setScholarship(data);

      const reviewRes = await fetch(
        `${import.meta.env.VITE_API_URL}/reviews?scholarshipId=${id}`
      );

      const reviewData = await reviewRes.json();
      setReviews(reviewData);
    } catch (error) {
      console.error("Failed to load scholarship details", error);
    } finally {
      setLoading(false);
    }
  };

  fetchDetails();
}, [id]);


  if (loading) {
    return (
      <div className="flex justify-center my-16">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!scholarship) {
    return (
      <p className="text-center my-10 text-red-500">
        Scholarship not found
      </p>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="grid md:grid-cols-2 gap-8">
        <img
          src={scholarship.universityImage}
          alt={scholarship.universityName}
          className="rounded-lg shadow"
        />

        <div>
          <h1 className="text-3xl font-bold mb-2">
            {scholarship.scholarshipName}
          </h1>

          <p className="text-lg font-medium">
            {scholarship.universityName}
          </p>

          <p className="text-sm text-gray-500 mb-3">
            Location: {scholarship.universityCountry}
          </p>

          <p>
            <strong>World Rank:</strong>{" "}
            {scholarship.universityWorldRank}
          </p>

          <p>
            <strong>Deadline:</strong>{" "}
            {scholarship.deadline}
          </p>

          <p>
            <strong>Application Fee:</strong>{" "}
            {scholarship.applicationFee || "Free"}
          </p>

          <p className="mt-2">
            <strong>Stipend / Coverage:</strong>{" "}
            {scholarship.stipend || "Not specified"}
          </p>

          <button
            onClick={() => navigate(`/checkout/${scholarship._id}`)}
            className="btn btn-primary mt-6 w-full"
          >
            Apply for Scholarship
          </button>
        </div>
      </div>

      {/* Description */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-3">
          Scholarship Description
        </h2>
        <p className="text-gray-700 leading-relaxed">
          {scholarship.description}
        </p>
      </div>

      {/* Reviews */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6">
          Reviews
        </h2>

        {reviews.length === 0 ? (
          <p>No reviews available</p>
        ) : (
          <div className="space-y-6">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="border rounded-lg p-4 shadow-sm"
              >
                <div className="flex items-center gap-4 mb-2">
                  <img
                    src={review.userImage}
                    alt={review.userName}
                    className="w-12 h-12 rounded-full object-cover"
                  />

                  <div>
                    <h4 className="font-semibold">
                      {review.userName}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {new Date(review.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(review.rating)].map((_, i) => (
                    <FaStar
                      key={i}
                      className="text-yellow-400"
                    />
                  ))}
                </div>

                <p className="text-gray-700">
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ScholarshipDetails;
