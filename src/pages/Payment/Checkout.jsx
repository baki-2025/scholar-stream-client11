import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";


const Checkout = ({ scholarship }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const amount =
    Number(scholarship.applicationFees) +
    Number(scholarship.serviceCharge);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    setLoading(true);

    try {
      // 1️⃣ Create payment intent (amount in cents)
      const { data } = await axiosSecure.post("/create-payment-intent", {
        amount: amount * 100,
      });

      // 2️⃣ Confirm card payment
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card,
          billing_details: {
            email: user.email,
            name: user.name,
          },
        },
      });

      // 3️⃣ Handle payment result
      if (result.paymentIntent?.status === "succeeded") {
        // Save application
        await axiosSecure.post("/applications", {
          scholarshipId: scholarship._id,
          userId: user._id,
          userName: user.name,
          userEmail: user.email,
          universityName: scholarship.universityName,
          scholarshipCategory: scholarship.scholarshipCategory,
          degree: scholarship.degree,
          applicationFees: scholarship.applicationFees,
          serviceCharge: scholarship.serviceCharge,
          paymentStatus: "paid",
          applicationStatus: "pending",
          applicationDate: new Date(),
        });

        navigate("/payment-success");
      } else {
        navigate("/payment-failed");
      }
    } catch (error) {
      console.error(error);
      navigate("/payment-failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement className="p-3 border rounded" />

      <button
        className="btn btn-primary w-full"
        disabled={!stripe || loading}
      >
        {loading ? "Processing..." : `Pay $${amount}`}
      </button>
    </form>
  );
};

export default Checkout;
