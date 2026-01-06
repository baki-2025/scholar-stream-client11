import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AddScholarship = () => {
  const { register, handleSubmit, reset } = useForm();
 const axiosSecure = useAxiosSecure();
  // const onSubmit = async (data) => {
  //   const scholarshipData = {
  //     ...data,
  //     postDate: new Date().toISOString(),
  //   };

  //   try {
  //     const res = axiosSecure.post(`/scholarships`,scholarshipData);

  //     const result = await res.json();

  //     if (result.success) {
  //       toast.success("Scholarship Added Successfully!");
  //       reset();
  //     } else {
  //       toast.error("Failed to add scholarship: " + (result.message || "Unknown error"));
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     toast.error("Server error. Please try again.");
  //   }
  // };

  const onSubmit = async (data) => {
  try {
    const res = await axiosSecure.post("/scholarships", data);

    console.log("Response 👉", res.data);

    if (res.data?.insertedId || res.data?._id) {
      toast.success("Scholarship Added Successfully");
      reset();
    }
  } catch (err) {
    console.error("ERROR 👉", err);
    toast.error("Failed to add scholarship");
  }
};


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card p-6 bg-base-100 shadow-md max-w-xl mx-auto">
      <h2 className="text-xl text-center font-bold mb-4">Add Scholarship</h2>

      <input {...register("scholarshipName")} className="input input-bordered w-full mb-2" placeholder="Scholarship Name" required />
      <input {...register("universityName")} className="input input-bordered w-full mb-2" placeholder="University Name" required />
      <input {...register("image")} className="input input-bordered w-full mb-2" placeholder="Image URL" />
      <input {...register("country")} className="input input-bordered w-full mb-2" placeholder="Country" required />
      <input {...register("city")} className="input input-bordered w-full mb-2" placeholder="City" required />
      <input {...register("worldRank")} type="number" className="input input-bordered w-full mb-2" placeholder="World Rank" />
      <input {...register("subjectCategory")} className="input input-bordered w-full mb-2" placeholder="Subject Category" />
      <input {...register("scholarshipCategory")} className="input input-bordered w-full mb-2" placeholder="Scholarship Category" />
      <input {...register("degree")} className="input input-bordered w-full mb-2" placeholder="Degree" />
      <input {...register("tuitionFees")} type="number" className="input input-bordered w-full mb-2" placeholder="Tuition Fees (optional)" />
      <input {...register("applicationFees")} type="number" className="input input-bordered w-full mb-2" placeholder="Application Fees" />
      <input {...register("serviceCharge")} type="number" className="input input-bordered w-full mb-2" placeholder="Service Charge" />
      <input type="date" {...register("deadline")} className="input input-bordered w-full mb-2" required />
      <input {...register("userEmail")} type="email" className="input input-bordered w-full mb-4" placeholder="Admin Email" required />

      <button type="submit" className="btn btn-primary w-full">Add Scholarship</button>
    </form>
  );
};

export default AddScholarship;




