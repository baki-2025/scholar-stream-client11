import { motion } from "framer-motion";
import { useNavigate } from "react-router";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="hero min-h-[70vh] bg-base-200"
    >
      <div className="hero-content text-center">
        <div className="max-w-2xl">
          <h1 className="text-5xl font-bold mb-4">
            Find Your Dream Scholarship
          </h1>
          <p className="mb-6 text-gray-600">
            ScholarStream connects students with global scholarship opportunities
            and simplifies the application process.
          </p>
          <button
            onClick={() => navigate("/scholarships")}
            className="btn btn-primary text-orange-600"
          >
            Search Scholarships
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Banner;
