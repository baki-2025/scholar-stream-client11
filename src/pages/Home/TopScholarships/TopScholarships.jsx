import { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";

const TopScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTopScholarships = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/scholarships?limit=4`
        );

        if (!res.ok) {
          throw new Error("Failed to load scholarships");
        }

        const data = await res.json();
setScholarships(data.scholarships || []);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTopScholarships();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center my-14">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-500 my-10">
        {error}
      </p>
    );
  }

  if (scholarships.length === 0) {
    return (
      <p className="text-center my-10">
        No scholarships available
      </p>
    );
  }

  return (
    <section className="my-14 px-4">
      <h2 className="text-3xl font-bold text-blue-600 text-center mb-10">
        Top Scholarships
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {scholarships.map((item, index) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition"
          >
            <figure>
              <img
                src={item.image}
                alt=""
                className="h-48 w-full object-cover"
              />
            </figure>

            <div className="card-body">
              <h3 className="card-title line-clamp-2">
                {item.scholarshipName}
              </h3>

              <p className="font-medium">
                {item.universityName}
              </p>

              <p className="text-sm text-gray-500">
                {item.universityCountry}
              </p>

              <p className="text-sm">
                <strong>Category:</strong>{" "}
                {item.scholarshipCategory}
              </p>

              <p className="text-sm">
                <strong>Application Fee:</strong>{" "}
                {item.scholarshipFee}
              </p>

              <Link
                to={`/scholarshipDetails/${item._id}`}
                className="btn btn-primary text-green-900 btn-sm mt-3 w-full"
              >
                View Details
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {/* View All */}
      <div className="text-center mt-10">
        <Link
          to="/scholarships"
          className="btn btn-outline"
        >
          View All Scholarships
        </Link>
      </div>
    </section>
  );
};

export default TopScholarships;
