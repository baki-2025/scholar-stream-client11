import { useSearchParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const navigate = useNavigate();

  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const confirmPayment = async () => {
      if (!sessionId) {
        setError("Invalid payment session");
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem("access-token");

        const res = await axios.patch(
          `${import.meta.env.VITE_API_URL}/applications/confirm/${sessionId}`,
          {},
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data?.application) {
          setApplication(res.data.application);
        } else {
          setError("Payment confirmed, but application not found");
        }
      } catch (err) {
        console.error(err);
        setError("Payment confirmation failed");
      } finally {
        setLoading(false);
      }
    };

    confirmPayment();
  }, [sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="card bg-base-200 p-6 text-center">
          <p className="text-error font-semibold">{error}</p>
          <button
            onClick={() => navigate("/dashboard/student/my-applications")}
            className="btn btn-outline mt-4"
          >
            Go to My Applications
          </button>
        </div>
      </div>
    );
  }

  const totalPaid =
    application.paidAmount ??
    Number(application.applicationFees || 0) +
      Number(application.serviceCharge || 0);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="card bg-base-200 p-8 text-center max-w-md shadow-lg">
        <h2 className="text-2xl font-bold text-success mb-4">
          Payment Successful 🎉
        </h2>

        <div className="space-y-2">
          <p>
            <strong>Scholarship:</strong>{" "}
            {application.scholarshipName || "N/A"}
          </p>
          <p>
            <strong>University:</strong> {application.universityName}
          </p>
          <p className="mt-2">
            <strong>Amount Paid:</strong> ${totalPaid}
          </p>
          <p className="text-sm text-gray-500">
            Status: {application.applicationStatus}
          </p>
        </div>

        <button
          onClick={() => navigate("/dashboard/student/my-applications")}
          className="btn btn-primary mt-6 w-full"
        >
          Go to My Applications
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
