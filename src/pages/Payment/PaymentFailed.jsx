import { useSearchParams, useNavigate } from "react-router";

const PaymentFailed = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const scholarshipName = searchParams.get("scholarshipName");
  const errorMessage = searchParams.get("errorMessage");

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="card bg-base-200 p-8 text-center w-full max-w-md shadow-lg">
        <h2 className="text-2xl font-bold text-error mb-4">
          Payment Failed ❌
        </h2>

        {scholarshipName && (
          <p className="mb-2">
            <strong>Scholarship:</strong> {scholarshipName}
          </p>
        )}

        <p className="text-sm text-gray-500 mb-6">
          {errorMessage || "Something went wrong during payment."}
        </p>

        <button
          onClick={() =>
            navigate("/dashboard/student/my-applications")
          }
          className="btn btn-warning w-full"
        >
          Return to Dashboard
        </button>
      </div>
    </div>
  );
};

export default PaymentFailed;
