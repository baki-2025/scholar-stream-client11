// PaymentFailed.jsx
const PaymentFailed = () => {
  return (
    <div className="text-center p-10">
      <h2 className="text-3xl font-bold text-red-600">
        Payment Failed ❌
      </h2>
      <p>Please try again.</p>
      <a href="/dashboard/my-applications" className="btn btn-warning mt-4">
        Return to Dashboard
      </a>
    </div>
  );
};

export default PaymentFailed;
