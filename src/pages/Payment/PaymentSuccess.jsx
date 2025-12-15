// PaymentSuccess.jsx
const PaymentSuccess = () => {
  return (
    <div className="text-center p-10">
      <h2 className="text-3xl font-bold text-green-600">
        Payment Successful 🎉
      </h2>
      <p>Your application has been submitted.</p>
      <a href="/dashboard/my-applications" className="btn btn-primary mt-4">
        Go to My Applications
      </a>
    </div>
  );
};

export default PaymentSuccess;
