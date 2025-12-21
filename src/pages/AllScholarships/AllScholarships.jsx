import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const AllScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ category: "", subject: "", location: "" });
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/scholarships")
      .then(res => res.json())
      .then(data => setScholarships(data));
  }, []);

  const filteredScholarships = scholarships.filter((sch) => {
    const matchesSearch =
      sch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sch.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sch.degree.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      (!filters.category || sch.category === filters.category) &&
      (!filters.subject || sch.subject === filters.subject) &&
      (!filters.location || sch.location === filters.location);

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="container mx-auto p-4">
      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by Scholarship, University, or Degree"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded flex-1"
        />

        {/* Filters */}
        <select
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          className="border p-2 rounded"
        >
          <option value="">All Categories</option>
          <option value="Merit">Merit</option>
          <option value="Need-Based">Need-Based</option>
        </select>

        <select
          value={filters.subject}
          onChange={(e) => setFilters({ ...filters, subject: e.target.value })}
          className="border p-2 rounded"
        >
          <option value="">All Subjects</option>
          <option value="Engineering">Engineering</option>
          <option value="Medical">Medical</option>
        </select>

        <select
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
          className="border p-2 rounded"
        >
          <option value="">All Locations</option>
          <option value="USA">USA</option>
          <option value="UK">UK</option>
        </select>
      </div>

      {/* Scholarships Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredScholarships.map((sch) => (
          <div key={sch.id} className="border rounded p-4 hover:shadow-lg transition">
            <img src={sch.universityImage} alt={sch.university} className="w-full h-32 object-cover rounded mb-2" />
            <h3 className="font-semibold">{sch.university}</h3>
            <p>Category: {sch.category}</p>
            <p>Location: {sch.location}</p>
            <p>Application Fees: {sch.applicationFees || "Free"}</p>
            <button
              className="mt-2 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
              onClick={() => navigate(`/scholarships/${sch.id}`)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllScholarships;
