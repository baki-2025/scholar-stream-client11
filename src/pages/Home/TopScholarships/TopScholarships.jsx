import { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";

const TopScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/scholarships")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to load scholarships");
        }
        return res.json();
      })
      .then((data) => {
        setScholarships(data.slice(0, 6));
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
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

  return (
    <section className="my-14 px-4">
      <h2 className="text-3xl font-bold text-center mb-10">
        Top Scholarships
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {scholarships.map((item, index) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="card bg-base-100 shadow-xl"
          >
            <figure>
              <img
                src={item.universityImage}
                alt={item.universityName}
                className="h-48 w-full object-cover"
              />
            </figure>

            <div className="card-body">
              <h3 className="card-title line-clamp-2">
                {item.scholarshipName}
              </h3>
              <p>{item.universityName}</p>
              <p className="text-sm text-gray-500">
                {item.universityCountry}
              </p>

              <div className="card-actions justify-end">
                <Link
                  to={`/scholarships/${item._id}`}
                  className="btn btn-outline btn-primary"
                >
                  View Details
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TopScholarships;
