import { motion } from "framer-motion";

const Stories = () => {
  return (
    <motion.section
      className="py-16 bg-gray-100 rounded-xl"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      <h2 className="text-3xl font-bold text-center mb-10">Success Stories</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-5">

        <div className="p-5 bg-white rounded-xl shadow">
          <p className="text-gray-600 mb-4">
            “Got a fully funded scholarship in Europe with the help of this platform!”
          </p>
          <h4 className="font-bold">— Sarah</h4>
        </div>

        <div className="p-5 bg-white rounded-xl shadow">
          <p className="text-gray-600 mb-4">
            “Found multiple scholarships and applied within minutes.”
          </p>
          <h4 className="font-bold">— Ayaan</h4>
        </div>

        <div className="p-5 bg-white rounded-xl shadow">
          <p className="text-gray-600 mb-4">
            “A very reliable website for international scholarship seekers.”
          </p>
          <h4 className="font-bold">— Fatima</h4>
        </div>

      </div>
    </motion.section>
  );
};

export default Stories;
