import { useParams } from "react-router";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Payment = () => {
  const { scholarshipId } = useParams();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [scholarship, setScholarship] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure
      .get(`/scholarships/${scholarshipId}`)
      .then(res => {
        setScholarship(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [scholarshipId, axiosSecure]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!scholarship)
    return <div className="text-center mt-10">Scholarship not found</div>;

  const totalAmount =
    Number(scholarship.applicationFees) +
    Number(scholarship.serviceCharge || 0);

  const handlePayment = async () => {
    try {
      // 1️⃣ Create application (JWT protected)
      const applicationRes = await axiosSecure.post("/applications", {
        applicantEmail: user.email,
        scholarshipId,
        universityName: scholarship.universityName,
        subjectCategory: scholarship.scholarshipCategory,
        degree: scholarship.degree,
        applicationFees: scholarship.applicationFees,
        serviceCharge: scholarship.serviceCharge || 0,
      });

      const applicationId = applicationRes.data.insertedId;

      // 2️⃣ Create Stripe checkout session (JWT protected)
      const res = await axiosSecure.post("/payment-checkout-session", {
        applicationId,
        scholarshipName: scholarship.scholarshipName,
        amount: totalAmount,
        userEmail: user.email,
      });

      // 3️⃣ Redirect to Stripe
      window.location.replace(res.data.url);
    } catch (err) {
      console.error(err);
      alert("Payment failed, please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 text-center">
      <h2 className="text-2xl font-bold mb-4">
        {scholarship.scholarshipName}
      </h2>

      <div className="bg-base-200 p-4 rounded mb-4">
        <p>University: {scholarship.universityName}</p>
        <p>Application Fee: ${scholarship.applicationFees}</p>
        <p>Service Charge: ${scholarship.serviceCharge || 0}</p>
        <p className="font-bold mt-2">Total: ${totalAmount}</p>
      </div>

      <button
        onClick={handlePayment}
        className="btn btn-primary text-black w-full"
      >
        Pay & Apply
      </button>
    </div>
  );
};

export default Payment;
