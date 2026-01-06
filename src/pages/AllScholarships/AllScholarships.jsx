import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const AllScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();
  const limit = 9;

  const fetchScholarships = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        search: searchTerm,
        category: categoryFilter,
        subject: subjectFilter,
        location: locationFilter,
        page,
        limit
      });
      const res = await fetch(`VITE_API_URL/scholarships?${params}`);
      const data = await res.json();
      console.log(data)
      setScholarships(data.scholarships);
      setTotalPages(Math.ceil(data.totalCount / limit));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScholarships();
  }, [searchTerm, categoryFilter, subjectFilter, locationFilter, page]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">All Scholarships</h1>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name, university or degree..."
          className="border p-2 rounded flex-1"
          onChange={(e) => { setPage(1); setSearchTerm(e.target.value); }}
        />
        <select onChange={(e) => { setPage(1); setCategoryFilter(e.target.value); }} className="border p-2 rounded">
          <option value="">All Categories</option>
          <option value="Merit-Based">Merit-Based</option>
          <option value="Need-Based">Need-Based</option>
        </select>
        <select onChange={(e) => { setPage(1); setSubjectFilter(e.target.value); }} className="border p-2 rounded">
          <option value="">All Subjects</option>
          <option value="Science">Science</option>
          <option value="Arts">Arts</option>
        </select>
        <select onChange={(e) => { setPage(1); setLocationFilter(e.target.value); }} className="border p-2 rounded">
          <option value="">All Locations</option>
          <option value="USA">USA</option>
          <option value="UK">UK</option>
        </select>
      </div>

      {/* Scholarships Grid */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {scholarships.map((s) => (
              <div key={s._id} className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition">
                <img src={s.universityImage} alt={s.universityName} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{s.universityName}</h3>
                  <p className="text-sm text-gray-500">{s.scholarshipCategory}</p>
                  <p className="text-sm text-gray-500">{s.location}</p>
                  {s.applicationFees && <p className="text-sm text-gray-500">Fees: {s.applicationFees}</p>}
                  <button
                    onClick={() => navigate(`/scholarship/${s._id}`)}
                    className="w-full bg-blue-600 text-white py-2 rounded mt-2 hover:bg-blue-700"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-6 gap-2">
            <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="px-3 py-1 border rounded disabled:opacity-50">Prev</button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button key={i+1} onClick={() => setPage(i+1)} className={`px-3 py-1 border rounded ${page === i+1 ? "bg-blue-600 text-white" : ""}`}>{i+1}</button>
            ))}
            <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)} className="px-3 py-1 border rounded disabled:opacity-50">Next</button>
          </div>
        </>
      )}
    </div>
  );
};

export default AllScholarships;
