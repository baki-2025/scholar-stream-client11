import { Link } from "react-router";

const PaymentFailed = () => {
  return (
    <div className="max-w-xl mx-auto p-6 bg-base-100 shadow text-center">
      <h2 className="text-3xl font-bold text-red-600 mb-4">
        Payment Failed ❌
      </h2>

      <p>Please try again from your dashboard.</p>

      <Link to="/dashboard/student/my-applications" className="btn btn-warning mt-6">
        Return to Dashboard
      </Link>
    </div>
  );
};

export default PaymentFailed;
