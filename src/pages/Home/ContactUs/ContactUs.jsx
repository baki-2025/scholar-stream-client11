const ContactUs = () => {
  return (
    <section className="py-14 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">
        Frequently Asked Questions
      </h2>

      <div className="max-w-4xl mx-auto space-y-4">
        <div className="collapse collapse-arrow bg-base-200">
          <input type="checkbox" />
          <div className="collapse-title font-medium">
            Is ScholarStream free to use?
          </div>
          <div className="collapse-content">
            <p>Yes, browsing scholarships is completely free.</p>
          </div>
        </div>

        <div className="collapse collapse-arrow bg-base-200">
          <input type="checkbox" />
          <div className="collapse-title font-medium">
            How do I apply for a scholarship?
          </div>
          <div className="collapse-content">
            <p>Create an account, choose a scholarship, and apply securely.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
