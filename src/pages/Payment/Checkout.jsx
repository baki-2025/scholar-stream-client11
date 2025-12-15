// src/pages/Payment/Checkout.jsx
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";

const Checkout = ({ scholarship }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const amount = scholarship.applicationFees + scholarship.serviceCharge;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await axiosSecure.post("/create-payment-intent", {
      amount,
    });

    const card = elements.getElement(CardElement);

    const result = await stripe.confirmCardPayment(data.clientSecret, {
      payment_method: { card },
    });

    if (result.paymentIntent?.status === "succeeded") {
      // save application
      await axiosSecure.post("/applications", {
        scholarshipId: scholarship._id,
        universityName: scholarship.universityName,
        applicationFees: scholarship.applicationFees,
        serviceCharge: scholarship.serviceCharge,
        paymentStatus: "paid",
        applicationStatus: "pending",
      });

      navigate("/payment-success");
    } else {
      navigate("/payment-failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button className="btn btn-primary mt-4" disabled={!stripe}>
        Pay ${amount}
      </button>
    </form>
  );
};

export default Checkout;
