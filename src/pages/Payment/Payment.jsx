// import { useParams, useNavigate } from "react-router";
// import { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { AuthContext } from "../../contexts/AuthContext";

// const Payment = () => {
//   const { scholarshipId } = useParams();
//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const [scholarship, setScholarship] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios
//       .get(`http://localhost:3000/scholarships/${scholarshipId}`)
//       .then((res) => {
//         setScholarship(res.data);
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, [scholarshipId]);

//   if (loading) {
//     return <div className="text-center mt-10">Loading...</div>;
//   }

//   if (!scholarship) {
//     return <div className="text-center mt-10">Scholarship not found</div>;
//   }

//   const totalAmount =
//     Number(scholarship.applicationFees) +
//     Number(scholarship.serviceCharge || 0);

//   const handlePayment = async () => {
//     const applicationRes = await axios.post(
//       "http://localhost:3000/applications",
//       {
//         scholarshipId,
//         userId: user.uid,
//         userName: user.displayName,
//         userEmail: user.email,
//         universityName: scholarship.universityName,
//         scholarshipCategory: scholarship.scholarshipCategory,
//         degree: scholarship.degree,
//         applicationFees: scholarship.applicationFees,
//         serviceCharge: scholarship.serviceCharge,
//         paymentStatus: "unpaid",
//         applicationStatus: "pending",
//         applicationDate: new Date(),
//       }
//     );

//     const applicationId = applicationRes.data.insertedId;

//     const res = await axios.post(
//       "http://localhost:3000/payment-checkout-session",
//       {
//         applicationId,
//         scholarshipName: scholarship.scholarshipName,
//         amount: totalAmount,
//         userEmail: user.email,
//       }
//     );

//     window.location.replace(res.data.url);
//   };

//   return (
//     <div className="max-w-md mx-auto mt-12 text-center">
//       <h2 className="text-2xl font-bold mb-4">
//         {scholarship.scholarshipName}
//       </h2>

//       <div className="bg-base-200 p-4 rounded mb-4">
//         <p>University: {scholarship.universityName}</p>
//         <p>Application Fee: ${scholarship.applicationFees}</p>
//         <p>Service Charge: ${scholarship.serviceCharge || 0}</p>
//         <p className="font-bold mt-2">Total: ${totalAmount}</p>
//       </div>

//       <button onClick={handlePayment} className="btn btn-primary w-full">
//         Pay & Apply
//       </button>
//     </div>
//   );
// };

// export default Payment;

import { useParams, useNavigate } from "react-router";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";

const Payment = () => {
  const { scholarshipId } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [scholarship, setScholarship] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/scholarships/${scholarshipId}`)
      .then((res) => {
        setScholarship(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [scholarshipId]);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!scholarship) {
    return <div className="text-center mt-10">Scholarship not found</div>;
  }

  const totalAmount =
    Number(scholarship.applicationFees) +
    Number(scholarship.serviceCharge || 0);

  const handlePayment = async () => {
  try {
    // 1️⃣ Create application in backend
    const applicationRes = await axios.post(
      "http://localhost:3000/applications",
      {
        applicantEmail: user.email,        // 👈 must match backend
        scholarshipId,                      // 👈 id of scholarship
        universityName: scholarship.universityName,
        scholarshipCategory: scholarship.scholarshipCategory,
        degree: scholarship.degree,
        applicationFees: scholarship.applicationFees,
        serviceCharge: scholarship.serviceCharge || 0,
      }
    );

    const applicationId = applicationRes.data.insertedId;

    // 2️⃣ Create Stripe session
    const totalAmount =
      Number(scholarship.applicationFees) +
      Number(scholarship.serviceCharge || 0);

    const res = await axios.post(
      "http://localhost:3000/payment-checkout-session",
      {
        applicationId,
        scholarshipName: scholarship.scholarshipName,
        amount: totalAmount,
        userEmail: user.email,
      }
    );

    // 3️⃣ Redirect to Stripe checkout
    window.location.replace(res.data.url);
  } catch (err) {
    console.error(err);
    alert("Payment failed, please try again.");
  }
};


  return (
    <div className="max-w-md mx-auto mt-12 text-center">
      <h2 className="text-2xl font-bold mb-4">
        {scholarship.scholarshipName}
      </h2>

      <div className="bg-base-200 p-4 rounded mb-4">
        <p>University: {scholarship.universityName}</p>
        <p>Application Fee: ${scholarship.applicationFees}</p>
        <p>Service Charge: ${scholarship.serviceCharge || 0}</p>
        <p className="font-bold mt-2">Total: ${totalAmount}</p>
      </div>

      <button onClick={handlePayment} className="btn btn-primary w-full">
        Pay & Apply
      </button>
    </div>
  );
};

export default Payment;
