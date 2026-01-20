import React, { useEffect, useState } from "react";

const ManageScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const [editData, setEditData] = useState(null);

  const API_BASE = import.meta.env.VITE_API_URL; // Set in .env file

  // Fetch all scholarships
  useEffect(() => {
    fetch(`${API_BASE}/admin/scholarships`)
      .then((res) => res.json())
      .then((data) => setScholarships(data));
  }, []);

  // Delete a scholarship
  const deleteScholarship = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete?");
    if (!confirm) return;

    await fetch(`${API_BASE}/admin/scholarships/${id}`, {
      method: "DELETE",
    });

    setScholarships(scholarships.filter((s) => s._id !== id));
  };

  // Update scholarship
  const updateScholarship = async () => {
    await fetch(`${API_BASE}/admin/scholarships/${editData._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editData),
    });

    setScholarships(
      scholarships.map((s) => (s._id === editData._id ? editData : s))
    );
    setEditData(null);
  };

  return (
    <div className="card bg-base-100 shadow p-6">
      <h2 className="text-2xl text-center font-bold mb-4">
        Manage Scholarships
      </h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Name</th>
              <th>University</th>
              <th>Category</th>
              <th>Degree</th>
              <th>Application Fees</th>
              <th>Service Charge</th>
              <th>Deadline</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {scholarships.map((s) => (
              <tr key={s._id}>
                <td>{s.scholarshipName}</td>
                <td>{s.universityName}</td>
                <td>{s.scholarshipCategory}</td>
                <td>{s.degree}</td>
                <td>${s.applicationFees}</td>
                <td>${s.serviceCharge || 0}</td>
                <td>{s.applicationDeadline}</td>
                <td className="flex gap-2">
                  <button
                    onClick={() => setEditData(s)}
                    className="btn btn-xs btn-info"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => deleteScholarship(s._id)}
                    className="btn btn-xs btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editData && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Update Scholarship</h3>

            <input
              className="input input-bordered w-full mb-2"
              value={editData.scholarshipName}
              onChange={(e) =>
                setEditData({ ...editData, scholarshipName: e.target.value })
              }
              placeholder="Scholarship Name"
            />

            <input
              className="input input-bordered w-full mb-2"
              value={editData.universityName}
              onChange={(e) =>
                setEditData({ ...editData, universityName: e.target.value })
              }
              placeholder="University Name"
            />

            <input
              className="input input-bordered w-full mb-2"
              value={editData.scholarshipCategory}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  scholarshipCategory: e.target.value,
                })
              }
              placeholder="Scholarship Category"
            />

            <input
              className="input input-bordered w-full mb-2"
              value={editData.degree}
              onChange={(e) =>
                setEditData({ ...editData, degree: e.target.value })
              }
              placeholder="Degree"
            />

            <input
              type="number"
              className="input input-bordered w-full mb-2"
              value={editData.applicationFees}
              onChange={(e) =>
                setEditData({ ...editData, applicationFees: e.target.value })
              }
              placeholder="Application Fees"
            />

            <input
              type="number"
              className="input input-bordered w-full mb-2"
              value={editData.serviceCharge || 0}
              onChange={(e) =>
                setEditData({ ...editData, serviceCharge: e.target.value })
              }
              placeholder="Service Charge"
            />

            <input
              type="date"
              className="input input-bordered w-full mb-4"
              value={editData.applicationDeadline?.slice(0, 10)}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  applicationDeadline: e.target.value,
                })
              }
            />

            <div className="modal-action">
              <button onClick={updateScholarship} className="btn btn-success">
                Save
              </button>
              <button onClick={() => setEditData(null)} className="btn">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageScholarships;
