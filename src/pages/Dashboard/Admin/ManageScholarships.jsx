import { useEffect, useState } from "react";

const ManageScholarships = () => {
  const [scholarships, setScholarships] = useState([]);

  const fetchScholarships = () => {
    fetch("http://localhost:3000/scholarships")
      .then((res) => res.json())
      .then((data) => setScholarships(data));
  };

  useEffect(() => {
    fetchScholarships();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this scholarship?")) return;

    const res = await fetch(`http://localhost:3000/scholarships/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      alert("Deleted successfully");
      fetchScholarships();
    } else {
      alert("Failed to delete");
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Manage Scholarships</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>University</th>
              <th>Category</th>
              <th>Degree</th>
              <th>Fees</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {scholarships.map((sch) => (
              <tr key={sch._id}>
                <td>{sch.scholarshipName}</td>
                <td>{sch.universityName}</td>
                <td>{sch.scholarshipCategory}</td>
                <td>{sch.degree}</td>
                <td>${sch.applicationFees || 0}</td>
                <td className="flex gap-2">
                  {/* Update button can navigate to Edit page */}
                  <button className="btn btn-sm btn-outline btn-primary">
                    Update
                  </button>
                  <button
                    className="btn btn-sm btn-outline btn-error"
                    onClick={() => handleDelete(sch._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageScholarships;
