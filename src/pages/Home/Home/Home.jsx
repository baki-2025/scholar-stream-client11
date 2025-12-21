import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";

const Home = () => {
  const [topScholarships, setTopScholarships] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/scholarships?limit=6&sort=fees")
      .then(res => res.json())
      .then(data => setTopScholarships(data));
  }, []);

  return (
    <div className="container mx-auto p-4">
      {/* Banner Section */}
      <motion.div
        className="bg-blue-600 text-white rounded-lg p-12 text-center mb-12"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl font-bold mb-4">Find Your Perfect Scholarship</h1>
        <p className="mb-6">Explore hundreds of scholarships around the world and apply easily.</p>
        <button
          className="bg-white text-blue-600 px-6 py-3 rounded font-semibold hover:bg-gray-200"
          onClick={() => navigate("/scholarships")}
        >
          Search Scholarship
        </button>
      </motion.div>

      {/* Top Scholarships Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Top Scholarships</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {topScholarships.map((sch, index) => (
            <motion.div
              key={sch.id}
              className="border rounded p-4 hover:shadow-lg transition cursor-pointer"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => navigate(`/scholarships/${sch.id}`)}
            >
              <img src={sch.universityImage} alt={sch.university} className="w-full h-32 object-cover rounded mb-2" />
              <h3 className="font-semibold">{sch.name}</h3>
              <p>Category: {sch.category}</p>
              <p>Location: {sch.location}</p>
              <button className="mt-2 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">
                View Details
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Success Stories / Testimonials Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Success Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            className="border p-4 rounded"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p>"I got a full scholarship thanks to this platform!"</p>
            <p className="font-semibold mt-2">- Alice Johnson</p>
          </motion.div>
          <motion.div
            className="border p-4 rounded"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p>"Applying for scholarships has never been easier."</p>
            <p className="font-semibold mt-2">- Michael Lee</p>
          </motion.div>
          <motion.div
            className="border p-4 rounded"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p>"Highly recommend this platform to all students."</p>
            <p className="font-semibold mt-2">- Sarah Kim</p>
          </motion.div>
        </div>
      </section>

      {/* Contact / FAQ Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
        <motion.div
          className="border p-6 rounded"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p>Have any questions? Reach out to us at <span className="font-semibold">support@scholarstream.com</span></p>
          <p className="mt-2">Or check our FAQ section for common queries.</p>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
