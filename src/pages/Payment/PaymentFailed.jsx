// import { Link } from "react-router";

// const PaymentFailed = () => {
//   return (
//     <div className="max-w-xl mx-auto p-6 bg-base-100 shadow text-center">
//       <h2 className="text-3xl font-bold text-red-600 mb-4">
//         Payment Failed ❌
//       </h2>

//       <p>Please try again from your dashboard.</p>

//       <Link to="/dashboard/student/my-applications" className="btn btn-warning mt-6">
//         Return to Dashboard
//       </Link>
//     </div>
//   );
// };

// export default PaymentFailed;


import { useLocation, useNavigate } from "react-router";

const PaymentFailed = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { scholarshipName, errorMessage } = state || {};

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="card bg-base-200 p-8 text-center w-full max-w-md">
        <h2 className="text-2xl font-bold text-error mb-4">
          Payment Failed ❌
        </h2>

        <p className="mb-2">
          <strong>Scholarship:</strong> {scholarshipName}
        </p>

        <p className="text-sm text-gray-500 mb-4">
          {errorMessage || "Something went wrong during payment."}
        </p>

        <button
          onClick={() => navigate("/dashboard/student/my-applications")}
          className="btn btn-warning w-full"
        >
          Return to Dashboard
        </button>
      </div>
    </div>
  );
};

export default PaymentFailed;
