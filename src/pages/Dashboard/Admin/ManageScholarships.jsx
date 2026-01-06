import React, { useEffect, useState } from "react";

const ManageScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/admin/scholarships")
      .then(res => res.json())
      .then(data => setScholarships(data));
  }, []);

  const deleteScholarship = async (id) => {
    await fetch(`http://localhost:3000/admin/scholarships/${id}`, {
      method: "DELETE",
    });
    setScholarships(scholarships.filter(s => s._id !== id));
  };

  const updateScholarship = async () => {
    await fetch(`http://localhost:3000/admin/scholarships/${editData._id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(editData),
    });

    setScholarships(scholarships.map(s =>
      s._id === editData._id ? editData : s
    ));
    setEditData(null);
  };

  return (
    <div className="card bg-base-100 shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Scholarships</h2>

      <table className="table table-zebra">
        <thead>
          <tr>
            <th>Name</th>
            <th>University</th>
            <th>Deadline</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {scholarships.map(s => (
            <tr key={s._id}>
              <td>{s.scholarshipName}</td>
              <td>{s.universityName}</td>
              <td>{s.deadline}</td>
              <td>
                <button
                  onClick={() => setEditData(s)}
                  className="btn btn-xs btn-info mr-1"
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

      {/* Edit Modal */}
      {editData && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold">Update Scholarship</h3>

            <input
              value={editData.scholarshipName}
              onChange={(e) =>
                setEditData({ ...editData, scholarshipName: e.target.value })
              }
              className="input input-bordered w-full mb-2"
            />

            <input
              value={editData.universityName}
              onChange={(e) =>
                setEditData({ ...editData, universityName: e.target.value })
              }
              className="input input-bordered w-full mb-2"
            />

            <div className="modal-action">
              <button onClick={updateScholarship} className="btn btn-success">
                Save
              </button>
              <button
                onClick={() => setEditData(null)}
                className="btn"
              >
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
