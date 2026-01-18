import { useParams, useNavigate } from "react-router";
import { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";

const Payment = () => {
  const { scholarshipId } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handlePayment = async () => {
    // 1️⃣ create application first
    const applicationRes = await axios.post("http://localhost:3000/applications", {
      scholarshipId,
      scholarshipName: "Merit Scholarship",
      universityName: "Oxford University",
      scholarshipCategory: "Full Fund",
      applicantEmail: user.email,
      amount: 50,
      applicationStatus: "pending",
    });

    const applicationId = applicationRes.data.insertedId;

    // 2️⃣ create stripe session
    const res = await axios.post(
      "http://localhost:3000/payment-checkout-session",
      {
        applicationId,
        scholarshipName: "Merit Scholarship",
        amount: 50,
        userEmail: user.email,
      }
    );

    window.location.replace(res.data.url);
  };

  return (
    <div className="text-center mt-10">
      <h2 className="text-2xl font-bold mb-4">Application Fee: $50</h2>
      <button onClick={handlePayment} className="btn btn-primary">
        Pay & Apply
      </button>
    </div>
  );
};

export default Payment;
