import { motion } from "framer-motion";

const ContactUs = () => {
  return (
    <motion.section
      className="py-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <h2 className="text-3xl font-bold text-center mb-10">Contact Us</h2>

      <div className="max-w-xl mx-auto bg-white shadow p-8 rounded-xl space-y-5">

        <div>
          <label className="block font-semibold">Your Name</label>
          <input
            type="text"
            className="w-full mt-1 p-3 border rounded-lg"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label className="block font-semibold">Email</label>
          <input
            type="email"
            className="w-full mt-1 p-3 border rounded-lg"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label className="block font-semibold">Message</label>
          <textarea
            className="w-full mt-1 p-3 border rounded-lg"
            rows="4"
            placeholder="Write your message..."
          ></textarea>
        </div>

        <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-800">
          Send Message
        </button>

      </div>
    </motion.section>
  );
};

export default ContactUs;
