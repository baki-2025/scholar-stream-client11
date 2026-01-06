import { useEffect, useState } from "react";
import ScholarshipCard from "../ScholarshipCard/ScholarshipCard";


const AllScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [subject, setSubject] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    const fetchScholarships = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          search,
          category,
          subject,
          location,
        });

        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/scholarships?${params}`
        );
        const data = await res.json();

        setScholarships(data || []);
      } catch (error) {
        console.error("Error loading scholarships", error);
      } finally {
        setLoading(false);
      }
    };

    fetchScholarships();
  }, [search, category, subject, location]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl text-center font-bold mb-6">All Scholarships</h1>

      {/* 🔍 Search & Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <input
          type="text"
          placeholder="Search by scholarship, university or degree"
          className="border p-2 rounded col-span-1 md:col-span-2"
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-2 rounded"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Merit-Based">Merit-Based</option>
          <option value="Need-Based">Need-Based</option>
        </select>

        <select
          className="border p-2 rounded"
          onChange={(e) => setSubject(e.target.value)}
        >
          <option value="">All Subjects</option>
          <option value="Science">Science</option>
          <option value="Arts">Arts</option>
          <option value="Engineering">Engineering</option>
        </select>

        <select
          className="border p-2 rounded"
          onChange={(e) => setLocation(e.target.value)}
        >
          <option value="">All Locations</option>
          <option value="USA">USA</option>
          <option value="UK">UK</option>
          <option value="Canada">Canada</option>
        </select>
      </div>

      {/* 🧾 Scholarship Grid */}
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : scholarships.length === 0 ? (
        <p className="text-center">No scholarships found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {scholarships.map((scholarship) => (
            <ScholarshipCard
              key={scholarship._id}
              scholarship={scholarship}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllScholarships;
