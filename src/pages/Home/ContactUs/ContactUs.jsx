const ContactUs = () => {
  const faqs = [
    {
      question: "Is ScholarStream free to use?",
      answer: "Yes, browsing scholarships is completely free.",
    },
    {
      question: "How do I apply for a scholarship?",
      answer:
        "Create an account, choose a scholarship, and apply securely through your dashboard.",
    },
    {
      question: "Which country is the best for me?",
      answer:
        "It depends on your subject, academic background, budget, and preferred universities.",
    },
  ];

  return (
    <section className="py-14 px-4">
      <h2 className="text-3xl font-bold text-center mb-10">
        Frequently Asked Questions
      </h2>

      <div className="max-w-4xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="collapse collapse-arrow bg-base-200">
            <input type="checkbox" />
            <div className="collapse-title font-medium text-lg">
              {faq.question}
            </div>
            <div className="collapse-content text-gray-600">
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ContactUs;
