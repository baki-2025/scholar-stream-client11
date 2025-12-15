import ScholarshipCard from "../ScholarshipCard/ScholarshipCard";


const AllScholarships = () => {
  const scholarships = [
    {
      _id: "1",
      universityName: "Harvard University",
      universityImage: "/images/harvard.jpg",
      scholarshipCategory: "Full Fund",
      location: "USA",
      applicationFee: "Free",
    },
    // Add more mock data or fetch from backend
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6 p-6">
      {scholarships.map((sch) => (
        <ScholarshipCard key={sch._id} scholarship={sch} />
      ))}
    </div>
  );
};

export default AllScholarships;
