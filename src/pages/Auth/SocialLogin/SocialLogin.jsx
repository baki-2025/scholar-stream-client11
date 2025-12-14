import React from "react";
import { useNavigate } from "react-router"
import useAuth from "../../../hooks/useAuth";

const SocialLogin = () => {
  const { googleLogin } = useAuth();
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="btn btn-outline w-full"
    >
      Continue with Google
    </button>
  );
};

export default SocialLogin;
