import { motion } from "framer-motion";
import { Link } from "react-router";

// Example data (replace with API data)
const scholarships = [
  { id: 1, title: "Global Excellence Scholarship", fee: 5 },
  { id: 2, title: "STEM Innovators Grant", fee: 8 },
  { id: 3, title: "International Student Fund", fee: 10 },
  { id: 4, title: "Women in Tech Scholarship", fee: 6 },
  { id: 5, title: "Leadership Award Program", fee: 3 },
  { id: 6, title: "Research Excellence Award", fee: 7 },
];

const TopScholarships = () => {
  return (
    <section>
      <h2 className="text-3xl font-bold text-center mb-10">Top Scholarships</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {scholarships.slice(0, 6).map((item, index) => (
          <motion.div
            key={item.id}
            className="p-6 border rounded-xl shadow hover:shadow-lg transition bg-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
          >
            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
            <p className="text-gray-600">Application Fee: ${item.fee}</p>

            <Link to={`/scholarships/${item.id}`}>
              <button className="mt-4 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-800">
                View Details
              </button>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TopScholarships;
