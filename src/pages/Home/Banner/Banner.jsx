import { motion } from "framer-motion";

const Banner = () => {
  return (
    <motion.section
      className="text-center py-20 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl"
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <h1 className="text-4xl md:text-6xl font-bold mb-4">
        Find Your Perfect Scholarship
      </h1>
      <p className="max-w-xl mx-auto mb-6 text-lg">
        Discover and apply for scholarships that match your academic goals.
      </p>

      <a href="/scholarships">
        <button className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-200">
          Search Scholarship
        </button>
      </a>
    </motion.section>
  );
};

export default Banner;
