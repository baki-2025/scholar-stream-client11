import { useParams } from "react-router";

const ScholarshipDetails = () => {
  const { id } = useParams();
  // Fetch scholarship details using id from backend or mock data
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Scholarship Details {id}</h1>
      <p>Here you will show full details about the scholarship.</p>
      {/* Include Apply Button, Reviews Section */}
    </div>
  );
};

export default ScholarshipDetails;
