import { useState } from "react";

const AddReviewModal = ({ scholarshipId, onClose, refresh }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const review = {
      scholarshipId,
      userName: name,
      userEmail: email,
      ratingPoint: rating,
      reviewComment: comment,
      reviewDate: new Date(),
      universityName: "N/A", // optional
    };

    const res = await fetch("http://localhost:3000/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(review),
    });

    if (res.ok) {
      alert("Review added successfully!");
      onClose();
      refresh();
    } else {
      alert("Failed to add review.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 relative">
        <button className="btn btn-sm btn-circle absolute top-2 right-2" onClick={onClose}>
          ✕
        </button>

        <h3 className="text-xl font-bold mb-4">Add Review</h3>

        <form className="space-y-3" onSubmit={handleSubmit}>
          <input type="text" placeholder="Your Name" className="input input-bordered w-full" value={name} onChange={e => setName(e.target.value)} required />
          <input type="email" placeholder="Your Email" className="input input-bordered w-full" value={email} onChange={e => setEmail(e.target.value)} required />
          <input type="number" placeholder="Rating (1-5)" className="input input-bordered w-full" value={rating} min={1} max={5} onChange={e => setRating(Number(e.target.value))} required />
          <textarea placeholder="Comment" className="textarea textarea-bordered w-full" value={comment} onChange={e => setComment(e.target.value)} required />
          <button type="submit" className="btn btn-primary w-full">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddReviewModal;
