import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Payment = () => {
  const { scholarshipId } = useParams();
  const axiosSecure = useAxiosSecure();

  /* ================= FETCH SCHOLARSHIP ================= */
  const {
    isLoading,
    isError,
    data: scholarship,
  } = useQuery({
    queryKey: ["scholarship", scholarshipId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/scholarships/${scholarshipId}`);
      return res.data;
    },
    enabled: !!scholarshipId,
  });

  /* ================= HANDLE PAYMENT ================= */
  /* ================= HANDLE PAYMENT ================= */
const handlePayment = async () => {
  if (!scholarship?._id) return;

  try {
    const res = await axiosSecure.post("/create-checkout-session", {
      scholarshipId: scholarship._id,
    });

    // Redirect to Stripe Checkout
    window.location.href = res.data.url;
  } catch (error) {
    console.error("Payment error:", error);
   
  }
};


  /* ================= LOADING ================= */
  if (isLoading) {
    return (
      <div className="flex justify-center my-16">
        <span className="loading loading-infinity loading-xl"></span>
      </div>
    );
  }

  /* ================= ERROR ================= */
  if (isError || !scholarship) {
    return (
      <div className="text-center text-red-500 my-16">
        Failed to load scholarship data.
      </div>
    );
  }

  const totalAmount =
    Number(scholarship.applicationFees || 0) +
    Number(scholarship.serviceCharge || 0);

  /* ================= UI ================= */
  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Scholarship Payment</h2>

      <p className="mb-2">
        <strong>Scholarship:</strong> {scholarship.scholarshipName}
      </p>

      <p className="mb-2">
        <strong>University:</strong> {scholarship.universityName}
      </p>

      <p className="mb-2">
        <strong>Application Fee:</strong> ${scholarship.applicationFees}
      </p>

      <p className="mb-4">
        <strong>Service Charge:</strong> ${scholarship.serviceCharge}
      </p>

      <button
        onClick={handlePayment}
        className="btn btn-primary w-full text-black"
      >
        Pay ${totalAmount}
      </button>
    </div>
  );
};

export default Payment;
