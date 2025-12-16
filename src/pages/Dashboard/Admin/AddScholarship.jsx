import { useState } from "react";

const AddScholarship = () => {
  const [formData, setFormData] = useState({
    scholarshipName: "",
    universityName: "",
    universityImage: "",
    universityCountry: "",
    universityCity: "",
    universityWorldRank: "",
    subjectCategory: "",
    scholarshipCategory: "",
    degree: "",
    tuitionFees: "",
    applicationFees: "",
    serviceCharge: "",
    applicationDeadline: "",
    scholarshipPostDate: new Date().toISOString().split("T")[0],
    postedUserEmail: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/scholarships", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert("Scholarship added successfully!");
      setFormData({
        scholarshipName: "",
        universityName: "",
        universityImage: "",
        universityCountry: "",
        universityCity: "",
        universityWorldRank: "",
        subjectCategory: "",
        scholarshipCategory: "",
        degree: "",
        tuitionFees: "",
        applicationFees: "",
        serviceCharge: "",
        applicationDeadline: "",
        scholarshipPostDate: new Date().toISOString().split("T")[0],
        postedUserEmail: "",
      });
    } else {
      alert("Failed to add scholarship");
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Add Scholarship</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        {Object.keys(formData).map((field) => (
          <input
            key={field}
            type={field.includes("Date") ? "date" : "text"}
            name={field}
            placeholder={field.replace(/([A-Z])/g, " $1")}
            className="input input-bordered w-full"
            value={formData[field]}
            onChange={handleChange}
            required
          />
        ))}

        <button type="submit" className="btn btn-primary w-full">
          Add Scholarship
        </button>
      </form>
    </div>
  );
};

export default AddScholarship;
