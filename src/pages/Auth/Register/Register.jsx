import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { motion } from "framer-motion";
import useAuth from "../../../hooks/useAuth";
import SocialLogin from "../SocialLogin/SocialLogin";

const Register = () => {
  const { createUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();

  const { register, handleSubmit, //watch, 
    formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      await createUser(data.email, data.password);
      await updateUserProfile(data.name, data.photo);

      // Default role = Student (save in DB later)
      navigate("/");
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="card bg-base-100 shadow-xl p-8 max-w-md mx-auto"
    >
      <h2 className="text-3xl font-bold text-center mb-6">Register</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        <input
          type="text"
          placeholder="Full Name"
          className="input input-bordered w-full"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

        <input
          type="text"
          placeholder="Photo URL"
          className="input input-bordered w-full"
          {...register("photo")}
        />

        <input
          type="email"
          placeholder="Email"
          className="input input-bordered w-full"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

        <input
          type="password"
          placeholder="Password"
          className="input input-bordered w-full"
          {...register("password", {
            required: "Password is required",
            minLength: { value: 6, message: "Password must be at least 6 characters" },
            pattern: {
              value: /(?=.*[A-Z])(?=.*[!@#$%^&*])/,
              message: "Password must contain 1 uppercase and 1 special character"
            }
          })}
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

        <button className="btn btn-primary w-full">Register</button>
      </form>

      <div className="divider">OR</div>

      <SocialLogin />

      <p className="text-center mt-4 text-sm">
        Already have an account?{" "}
        <Link to="/login" className="link link-primary">
          Login
        </Link>
      </p>
    </motion.div>
  );
};

export default Register;
