import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { AuthContext } from "../../../contexts/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyApplications = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: applications = [], isLoading } = useQuery({
    queryKey: ["myApplications", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/applications?email=${user.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) {
    return <span className="loading loading-infinity loading-lg"></span>;
  }

  return (
    <div>
      <h2 className="text-2xl text-center font-bold mb-4">My Applications</h2>

      <table className="table table-zebra">
        <thead>
          <tr>
            <th>University</th>
            <th>Category</th>
            <th>Status</th>
            <th>Payment</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {applications.map(app => (
            <tr key={app._id}>
              <td>{app.universityName}</td>
              <td>{app.scholarshipCategory}</td>
              <td>{app.applicationStatus}</td>
              <td>{app.paymentStatus}</td>
              <td className="space-x-2">

                {app.paymentStatus === "unpaid" && (
                  <Link
                    to={`/payment/${app.scholarshipId}/${app._id}`}
                    className="btn btn-sm btn-warning"
                  >
                    Pay
                  </Link>
                )}

                {app.applicationStatus === "completed" && (
                  <button className="btn btn-sm btn-success">
                    Add Review
                  </button>
                )}

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyApplications;
