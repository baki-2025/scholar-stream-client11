import { useEffect, useState, useMemo, useCallback } from "react";
import ScholarshipCard from "../ScholarshipCard/ScholarshipCard";
import SkeletonCard from "../../Components/SkeletonCard/SkeletonCard";

// 🟢 React.memo for cards is assumed in ScholarshipCard/SkeletonCard

const AllScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    search: "",
    category: "",
    subject: "",
    location: "",
    sort: "",
  });

  const [page, setPage] = useState(1);
  const limit = 8;
  const [totalPages, setTotalPages] = useState(1);

  // 🔹 Fetch scholarships
  useEffect(() => {
    const controller = new AbortController(); // cancel previous fetch if fast typing
    const fetchScholarships = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({ ...filters, page, limit });
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/scholarships?${params}`,
          { signal: controller.signal }
        );
        const data = await res.json();

        setScholarships(data.scholarships || []);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        if (err.name !== "AbortError") console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchScholarships();

    return () => controller.abort(); // cleanup
  }, [filters, page]);

  // 🔹 Handlers with useCallback to prevent new references
  const handleFilterChange = useCallback((key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1); // reset page
  }, []);

  const handlePageChange = useCallback((num) => setPage(num), []);

  // 🔹 Memoized page numbers
  const pageNumbers = useMemo(() => [...Array(totalPages).keys()].map(n => n + 1), [totalPages]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl text-center font-bold mb-6">All Scholarships</h1>

      {/* 🔍 SEARCH & FILTER */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <input
          type="text"
          placeholder="Search scholarship / university / degree"
          className="input input-bordered md:col-span-2"
          value={filters.search}
          onChange={(e) => handleFilterChange("search", e.target.value)}
        />
        <select
          className="select select-bordered"
          value={filters.category}
          onChange={(e) => handleFilterChange("category", e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Full Fund">Full Fund</option>
          <option value="Partial">Partial</option>
          <option value="Self-fund">Self-fund</option>
        </select>
        <select
          className="select select-bordered"
          value={filters.subject}
          onChange={(e) => handleFilterChange("subject", e.target.value)}
        >
          <option value="">All Subjects</option>
          <option value="Science">Science</option>
          <option value="Engineering">Engineering</option>
          <option value="Arts">Arts</option>
        </select>
        <select
          className="select select-bordered"
          value={filters.location}
          onChange={(e) => handleFilterChange("location", e.target.value)}
        >
          <option value="">All Countries</option>
          <option value="USA">USA</option>
          <option value="UK">UK</option>
          <option value="Canada">Canada</option>
        </select>
      </div>

      {/* 🔃 SORT */}
      <div className="mb-6">
        <select
          className="select select-bordered"
          value={filters.sort}
          onChange={(e) => handleFilterChange("sort", e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="fee_asc">Application Fee (Low → High)</option>
          <option value="fee_desc">Application Fee (High → Low)</option>
          <option value="date_desc">Newest First</option>
        </select>
      </div>

      {/* 📄 GRID */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(limit)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : scholarships.length === 0 ? (
        <p className="text-center">No scholarships found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {scholarships.map((s) => <ScholarshipCard key={s._id} scholarship={s} />)}
        </div>
      )}

      {/* 📑 PAGINATION */}
      <div className="flex justify-center mt-10 gap-2">
        <button
          className="btn btn-sm"
          disabled={page === 1}
          onClick={() => handlePageChange(page - 1)}
        >
          Prev
        </button>

        {pageNumbers.map((num) => (
          <button
            key={num}
            className={`btn btn-sm ${page === num ? "btn-primary" : ""}`}
            onClick={() => handlePageChange(num)}
          >
            {num}
          </button>
        ))}

        <button
          className="btn btn-sm"
          disabled={page === totalPages}
          onClick={() => handlePageChange(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllScholarships;   