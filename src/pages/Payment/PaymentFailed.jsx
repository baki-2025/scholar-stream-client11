import { useParams, useNavigate } from "react-router";

const PaymentFailed = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="text-center mt-20">
      <h2 className="text-3xl font-bold text-red-600">
        Payment Failed ❌
      </h2>

      <p className="mt-4">
        Your payment could not be completed.
      </p>

      <button
        onClick={() => navigate("/dashboard")}
        className="mt-6 bg-gray-700 text-white px-6 py-3 rounded"
      >
        Return to Dashboard
      </button>
    </div>
  );
};

export default PaymentFailed;
