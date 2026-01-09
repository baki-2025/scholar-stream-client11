import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const { applicationId } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const updatePaymentStatus = async () => {
      try {
        const res = await axiosSecure.patch(
          `/my-applications/pay/${applicationId}`
        );
        setData(res.data);
      } catch (err) {
        console.error("Payment update failed:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (applicationId) {
      updatePaymentStatus();
    }
  }, [applicationId, axiosSecure]);

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="flex justify-center my-16">
        <span className="loading loading-infinity loading-xl"></span>
      </div>
    );
  }

  /* ================= ERROR ================= */
  if (error || !data) {
    return (
      <div className="text-center text-red-500 mt-20">
        Failed to confirm payment.
      </div>
    );
  }

  /* ================= SUCCESS UI ================= */
  return (
    <div className="text-center mt-20">
      <h2 className="text-3xl font-bold text-green-600">
        Payment Successful 🎉
      </h2>

      <p className="mt-4">
        <strong>Scholarship:</strong> {data.scholarshipName}
      </p>

      <p>
        <strong>University:</strong> {data.universityName}
      </p>

      <p className="mt-2">
        <strong>Amount Paid:</strong> ${data.amount}
      </p>

      <button
        onClick={() => navigate("/dashboard/student/my-applications")}
        className="mt-6 bg-blue-600 text-white px-6 py-3 rounded"
      >
        Go to My Applications
      </button>
    </div>
  );
};

export default PaymentSuccess;
