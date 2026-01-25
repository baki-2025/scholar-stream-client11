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
      .patch(`${import.meta.env.VITE_API_URL}/applications/confirm/${sessionId}`)
      .then(res => {
        // ✅ Ensure we get the application object
        if (res.data.application) {
          setApplication(res.data.application);
        } else {
          setError("Payment confirmed, but application details not found");
        }
      })
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

  const totalPaid =
    Number(application.applicationFees) +
    Number(application.serviceCharge || 0);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="card bg-base-200 p-8 text-center max-w-md">
        <h2 className="text-2xl font-bold text-success mb-4">
          Payment Successful 🎉
        </h2>

        <p><strong>Scholarship:</strong> {application.scholarshipName}</p>
        <p><strong>University:</strong> {application.universityName}</p>
        <p className="mt-2"><strong>Amount Paid:</strong> ${totalPaid}</p>

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
