import { useSearchParams, useNavigate } from "react-router";

  const PaymentFailed = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Get scholarshipName and applicationId from query params
  const scholarshipName = searchParams.get("scholarshipName");
  const applicationId = searchParams.get("applicationId");
  const errorMessage = searchParams.get("errorMessage");

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="card bg-base-200 p-8 text-center w-full max-w-md">
        <h2 className="text-2xl font-bold text-error mb-4">
          Payment Failed ❌
        </h2>

        {scholarshipName && (
          <p className="mb-2">
            <strong>Scholarship:</strong> {scholarshipName}
          </p>
        )}

        <p className="text-sm text-gray-500 mb-4">
          {errorMessage || "Something went wrong during payment."}
        </p>

        <div className="flex flex-col gap-2">
          <button
            onClick={() => navigate("/dashboard/student/my-applications")}
            className="btn btn-warning w-full"
          >
            Return to Dashboard
          </button>

          {/* Retry payment if applicationId exists */}
          {applicationId && (
            <button
              onClick={() =>
                navigate(`/payment/${scholarshipName}/${applicationId}`)
              }
              className="btn btn-success w-full"
            >
              Retry Payment
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;
