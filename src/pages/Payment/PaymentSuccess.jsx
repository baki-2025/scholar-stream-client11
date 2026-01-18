import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router";
import axios from "axios";

const PaymentSuccess = () => {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");
  const [application, setApplication] = useState(null);

  useEffect(() => {
    axios
      .patch(`http://localhost:3000/applications/confirm/${sessionId}`)
      .then(res => setApplication(res.data.application));
  }, [sessionId]);

  if (!application) return <p className="text-center">Finalizing payment...</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-base-100 shadow text-center">
      <h2 className="text-3xl font-bold text-green-600 mb-4">
        Payment Successful 🎉
      </h2>

      <p><strong>Scholarship:</strong> {application.scholarshipName}</p>
      <p><strong>University:</strong> {application.universityName}</p>
      <p><strong>Amount Paid:</strong> ${application.amount}</p>

      <Link to="/dashboard/student/my-applications" className="btn btn-success mt-6">
        Go to My Applications
      </Link>
    </div>
  );
};

export default PaymentSuccess;
