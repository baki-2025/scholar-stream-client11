import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const ManageScholarships = () => {
  const axiosSecure = useAxiosSecure()

  const [scholarships, setScholarships] = useState([]);
  const [editData, setEditData] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH SCHOLARSHIPS ================= */
  useEffect(() => {
    axiosSecure
      .get("/admin/scholarships")
      .then((res) => {
        setScholarships(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [axiosSecure]);

  /* ================= DELETE ================= */
  const deleteScholarship = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This scholarship will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it",
    });

    if (!result.isConfirmed) return;

    try {
      await axiosSecure.delete(`/admin/scholarships/${id}`);

      setScholarships((prev) => prev.filter((s) => s._id !== id));

      Swal.fire("Deleted!", "Scholarship has been removed.", "success");
    } catch (error) {
      console.error(error);
      Swal.fire("Error!", "Failed to delete scholarship.", "error");
    }
  };

  /* ================= UPDATE ================= */
  const updateScholarship = async () => {
    const { _id, ...updatedData } = editData; // remove _id

    try {
      await axiosSecure.patch(
        `/admin/scholarships/${_id}`,
        updatedData
      );

      setScholarships((prev) =>
        prev.map((s) => (s._id === _id ? editData : s))
      );

      setEditData(null);

      Swal.fire("Updated!", "Scholarship updated successfully.", "success");
    } catch (error) {
      console.error(error);
      Swal.fire("Error!", "Failed to update scholarship.", "error");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center mt-10">
        <span className="loading loading-infinity loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="card bg-base-100 shadow p-6">
      <h2 className="text-2xl text-center font-bold mb-4">
        Manage Scholarships:{scholarships.length}
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
                <td>{s.applicationDeadline?.slice(0, 10)}</td>
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

            {scholarships.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center text-gray-500">
                  No scholarships found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ================= EDIT MODAL ================= */}
      {editData && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">
              Update Scholarship
            </h3>

            {[
              "scholarshipName",
              "universityName",
              "scholarshipCategory",
              "degree",
            ].map((field) => (
              <input
                key={field}
                className="input input-bordered w-full mb-2"
                value={editData[field]}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    [field]: e.target.value,
                  })
                }
                placeholder={field}
              />
            ))}

            <input
              type="number"
              className="input input-bordered w-full mb-2"
              value={editData.applicationFees}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  applicationFees: e.target.value,
                })
              }
              placeholder="Application Fees"
            />

            <input
              type="number"
              className="input input-bordered w-full mb-2"
              value={editData.serviceCharge || 0}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  serviceCharge: e.target.value,
                })
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
              <button
                onClick={updateScholarship}
                className="btn btn-success"
              >
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
