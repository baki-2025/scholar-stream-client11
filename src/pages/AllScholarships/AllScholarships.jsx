import { useEffect, useState } from "react";
import ScholarshipCard from "../ScholarshipCard/ScholarshipCard";

const AllScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [subject, setSubject] = useState("");
  const [location, setLocation] = useState("");
  const [sort, setSort] = useState("");

  const [page, setPage] = useState(1);
  const limit = 6;
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchScholarships = async () => {
      setLoading(true);

      const params = new URLSearchParams({
        search,
        category,
        subject,
        location,
        sort,
        page,
        limit,
      });

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/scholarships?${params}`
      );
      const data = await res.json();

      setScholarships(data.scholarships || []);
      setTotalPages(data.totalPages || 1);
      setLoading(false);
    };

    fetchScholarships();
  }, [search, category, subject, location, sort, page]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl text-center font-bold mb-6">
        All Scholarships
      </h1>

      {/* 🔍 SEARCH & FILTER */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <input
          type="text"
          placeholder="Search scholarship / university / degree"
          className="input input-bordered md:col-span-2"
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        <select className="select select-bordered" onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="Full Fund">Full Fund</option>
          <option value="Partial">Partial</option>
          <option value="Self-fund">Self-fund</option>
        </select>

        <select className="select select-bordered" onChange={(e) => setSubject(e.target.value)}>
          <option value="">All Subjects</option>
          <option value="Science">Science</option>
          <option value="Engineering">Engineering</option>
          <option value="Arts">Arts</option>
        </select>

        <select className="select select-bordered" onChange={(e) => setLocation(e.target.value)}>
          <option value="">All Countries</option>
          <option value="USA">USA</option>
          <option value="UK">UK</option>
          <option value="Canada">Canada</option>
        </select>
      </div>

      {/* 🔃 SORT */}
      <div className="mb-6">
        <select className="select select-bordered" onChange={(e) => setSort(e.target.value)}>
          <option value="">Sort By</option>
          <option value="fee_asc">Application Fee (Low → High)</option>
          <option value="fee_desc">Application Fee (High → Low)</option>
          <option value="date_desc">Newest First</option>
        </select>
      </div>

      {/* 📄 GRID */}
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : scholarships.length === 0 ? (
        <p className="text-center">No scholarships found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {scholarships.map((s) => (
            <ScholarshipCard key={s._id} scholarship={s} />
          ))}
        </div>
      )}

      {/* 📑 PAGINATION */}
      <div className="flex justify-center mt-10 gap-2">
        <button
          className="btn btn-sm"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        {[...Array(totalPages).keys()].map((num) => (
          <button
            key={num}
            className={`btn btn-sm ${page === num + 1 ? "btn-primary" : ""}`}
            onClick={() => setPage(num + 1)}
          >
            {num + 1}
          </button>
        ))}

        <button
          className="btn btn-sm"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllScholarships;
