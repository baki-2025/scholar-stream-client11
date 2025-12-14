import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { motion } from "framer-motion";
import useAuth from "../../../hooks/useAuth";
import SocialLogin from "../SocialLogin/SocialLogin";

const Login = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      await signIn(data.email, data.password);
      navigate("/");
    } catch {
      alert("Invalid email or password");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="card bg-base-100 shadow-xl p-8 max-w-md mx-auto"
    >
      <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

        <button className="btn btn-primary w-full">Login</button>
      </form>

      <div className="divider">OR</div>

      <SocialLogin />

      <p className="text-center mt-4 text-sm">
        New here?{" "}
        <Link to="/register" className="link link-primary">
          Register
        </Link>
      </p>
    </motion.div>
  );
};

export default Login;
