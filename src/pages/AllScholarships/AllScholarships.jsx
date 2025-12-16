import { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";

const AllScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState(""); // "feesAsc" | "feesDesc" | "date"
  const [page, setPage] = useState(1);
  const [limit] = useState(6);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/scholarships")
      .then((res) => res.json())
      .then((data) => {
        setScholarships(data);
        setLoading(false);
      });
  }, []);

  // Search + Filter + Sort
  useEffect(() => {
    let temp = [...scholarships];

    if (search) {
      temp = temp.filter(
        (sch) =>
          sch.scholarshipName.toLowerCase().includes(search.toLowerCase()) ||
          sch.universityName.toLowerCase().includes(search.toLowerCase()) ||
          (sch.degree && sch.degree.toLowerCase().includes(search.toLowerCase()))
      );
    }

    if (category) {
      temp = temp.filter((sch) => sch.scholarshipCategory === category);
    }

    if (sort === "feesAsc") {
      temp.sort((a, b) => (a.applicationFees || 0) - (b.applicationFees || 0));
    } else if (sort === "feesDesc") {
      temp.sort((a, b) => (b.applicationFees || 0) - (a.applicationFees || 0));
    } else if (sort === "date") {
      temp.sort(
        (a, b) => new Date(b.scholarshipPostDate) - new Date(a.scholarshipPostDate)
      );
    }

    setFiltered(temp);
  }, [search, category, sort, scholarships]);

  // Pagination
  const pageCount = Math.ceil(filtered.length / limit);
  const paginatedData = filtered.slice((page - 1) * limit, page * limit);

  if (loading) {
    return <p className="text-center my-10">Loading scholarships...</p>;
  }

  return (
    <div className="px-4 py-10 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">All Scholarships</h2>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name, university or degree"
          className="input input-bordered w-full md:w-1/2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="select select-bordered w-full md:w-1/4"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Full Fund">Full Fund</option>
          <option value="Partial Fund">Partial Fund</option>
          <option value="Self Fund">Self Fund</option>
        </select>

        <select
          className="select select-bordered w-full md:w-1/4"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="feesAsc">Application Fees ↑</option>
          <option value="feesDesc">Application Fees ↓</option>
          <option value="date">Post Date</option>
        </select>
      </div>

      {/* Scholarship Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedData.map((sch, index) => (
          <motion.div
            key={sch._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="card bg-base-100 shadow-xl"
          >
            <figure>
              <img
                src={sch.universityImage}
                alt={sch.universityName}
                className="h-48 w-full object-cover"
              />
            </figure>

            <div className="card-body">
              <h3 className="card-title">{sch.scholarshipName}</h3>
              <p>{sch.universityName}</p>
              <p className="text-sm text-gray-500">
                {sch.universityCountry} | {sch.degree}
              </p>
              <p className="text-sm">
                Category: {sch.scholarshipCategory} | Fees: $
                {sch.applicationFees || "0"}
              </p>

              <div className="card-actions justify-end">
                <Link
                  to={`/scholarships/${sch._id}`}
                  className="btn btn-outline btn-primary"
                >
                  View Details
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8 gap-2">
        {Array.from({ length: pageCount }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`btn btn-sm ${
              page === i + 1 ? "btn-primary" : "btn-outline"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllScholarships;
