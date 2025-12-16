const SuccessStories = () => {
  return (
    <section className="bg-base-200 py-14 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">
        Student Success Stories
      </h2>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <p>
              “ScholarStream helped me secure a full-funded scholarship in Canada.”
            </p>
            <h4 className="font-semibold mt-3">— Ayesha Rahman</h4>
          </div>
        </div>

        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <p>
              “The platform made scholarship applications stress-free.”
            </p>
            <h4 className="font-semibold mt-3">— Tanvir Ahmed</h4>
          </div>
        </div>

        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <p>
              “I found scholarships I never knew existed.”
            </p>
            <h4 className="font-semibold mt-3">— Nusrat Jahan</h4>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
