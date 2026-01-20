// // import { useEffect, useState } from "react";
// // import { useSearchParams, Link } from "react-router";
// // import axios from "axios";

// // const PaymentSuccess = () => {
// //   const [params] = useSearchParams();
// //   const sessionId = params.get("session_id");
// //   const [application, setApplication] = useState(null);

// //   useEffect(() => {
// //     axios
// //       .patch(`http://localhost:3000/applications/confirm/${sessionId}`)
// //       .then(res => setApplication(res.data.application));
// //   }, [sessionId]);

// //   if (!application) return <p className="text-center">Finalizing payment...</p>;

// //   return (
// //     <div className="max-w-xl mx-auto p-6 bg-base-100 shadow text-center">
// //       <h2 className="text-3xl font-bold text-green-600 mb-4">
// //         Payment Successful 🎉
// //       </h2>

// //       <p><strong>Scholarship:</strong> {application.scholarshipName}</p>
// //       <p><strong>University:</strong> {application.universityName}</p>
// //       <p><strong>Amount Paid:</strong> ${application.amount}</p>

// //       <Link to="/dashboard/student/my-applications" className="btn btn-success mt-6">
// //         Go to My Applications
// //       </Link>
// //     </div>
// //   );
// // };

// // export default PaymentSuccess;


// // // import { useLocation, useNavigate } from "react-router";

// // // const PaymentSuccess = () => {
// // //   const { state } = useLocation();
// // //   const navigate = useNavigate();

// // //   const { scholarshipName, universityName, amount } = state || {};

// // //   return (
// // //     <div className="min-h-screen flex items-center justify-center">
// // //       <div className="card bg-base-200 p-8 text-center w-full max-w-md">
// // //         <h2 className="text-2xl font-bold text-success mb-4">
// // //           Payment Successful 🎉
// // //         </h2>

// // //         <p className="mb-2">
// // //           <strong>Scholarship:</strong> {scholarshipName}
// // //         </p>
// // //         <p className="mb-2">
// // //           <strong>University:</strong> {universityName}
// // //         </p>
// // //         <p className="mb-4">
// // //           <strong>Amount Paid:</strong> ${amount}
// // //         </p>

// // //         <button
// // //           onClick={() => navigate("/dashboard/student/my-applications")}
// // //           className="btn btn-primary w-full"
// // //         >
// // //           Go to My Applications
// // //         </button>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default PaymentSuccess;


// import { useSearchParams, useNavigate } from "react-router";
// import { useEffect, useState } from "react";
// import axios from "axios";

// const PaymentSuccess = () => {
//   const [searchParams] = useSearchParams();
//   const applicationId = searchParams.get("applicationId");
//   const navigate = useNavigate();

//   const [application, setApplication] = useState(null);

//   useEffect(() => {
//     if (applicationId) {
//       axios
//         .get(`http://localhost:3000/applications/${applicationId}`)
//         .then(res => setApplication(res.data));
//     }
//   }, [applicationId]);

//   if (!application) {
//     return <div className="text-center mt-10">Loading...</div>;
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <div className="card bg-base-200 p-8 text-center max-w-md">
//         <h2 className="text-2xl font-bold text-success mb-4">
//           Payment Successful 🎉
//         </h2>

//         <p><strong>Scholarship:</strong> {application.scholarshipName}</p>
//         <p><strong>University:</strong> {application.universityName}</p>
//         <p className="mt-2">
//           <strong>Amount Paid:</strong> $
//           {Number(application.applicationFees) + Number(application.serviceCharge || 0)}
//         </p>

//         <button
//           onClick={() => navigate("/dashboard/student/my-applications")}
//           className="btn btn-primary mt-4 w-full"
//         >
//           Go to My Applications
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PaymentSuccess;


// import { useSearchParams, useNavigate } from "react-router";
// import { useEffect, useState } from "react";
// import axios from "axios";

// const PaymentSuccess = () => {
//   const [searchParams] = useSearchParams();
//   const sessionId = searchParams.get("session_id");
//   const navigate = useNavigate();

//   const [application, setApplication] = useState(null);

//   useEffect(() => {
//     if (sessionId) {
//       axios
//         .get(`http://localhost:3000/stripe-session/${sessionId}`)
//         .then(res => setApplication(res.data));
//     }
//   }, [sessionId]);

//   if (!application) {
//     return <div className="text-center mt-10">Loading...</div>;
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <div className="card bg-base-200 p-8 text-center max-w-md">
//         <h2 className="text-2xl font-bold text-success mb-4">
//           Payment Successful 🎉
//         </h2>

//         <p><strong>Scholarship:</strong> {application.scholarshipName}</p>
//         <p><strong>University:</strong> {application.universityName}</p>
//         <p className="mt-2">
//           <strong>Amount Paid:</strong> $
//           {Number(application.applicationFees) + Number(application.serviceCharge || 0)}
//         </p>

//         <button
//           onClick={() => navigate("/dashboard/student/my-applications")}
//           className="btn btn-primary mt-4 w-full"
//         >
//           Go to My Applications
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PaymentSuccess;



import { useSearchParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const navigate = useNavigate();

  const [application, setApplication] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!sessionId) {
      setError("Invalid payment session");
      return;
    }

    axios
      .patch(`http://localhost:3000/applications/confirm/${sessionId}`)
      .then(res => setApplication(res.data.application))
      .catch(err => {
        console.error(err);
        setError("Payment confirmation failed");
      });
  }, [sessionId]);

  if (error) {
    return <p className="text-center mt-10 text-error">{error}</p>;
  }

  if (!application) {
    return <div className="text-center mt-10">Finalizing payment...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="card bg-base-200 p-8 text-center max-w-md">
        <h2 className="text-2xl font-bold text-success mb-4">
          Payment Successful 🎉
        </h2>

        <p><strong>Scholarship:</strong> {application.scholarshipName}</p>
        <p><strong>University:</strong> {application.universityName}</p>

        <p className="mt-2">
          <strong>Amount Paid:</strong> $
          {Number(application.applicationFees) +
            Number(application.serviceCharge || 0)}
        </p>

        <button
          onClick={() => navigate("/dashboard/student/my-applications")}
          className="btn btn-primary mt-4 w-full"
        >
          Go to My Applications
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
