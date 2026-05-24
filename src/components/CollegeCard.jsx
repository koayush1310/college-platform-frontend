import { Link } from "react-router-dom";

function CollegeCard({ college, handleCompare }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow hover:shadow-xl transition">
      <h2 className="text-xl font-bold">
        {college.name}
      </h2>

      <p>Location: {college.location}</p>

      <p>Fees: ₹{college.fees}</p>

      <p>Rating: {college.rating}</p>

      <p>Placements: {college.placements}%</p>

      <p>Min Rank: {college.minRank}</p>

      <p>Max Rank: {college.maxRank}</p>

      <div className="flex gap-3 mt-4">
        <Link
          to={`/college/${college._id}`}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          View Details
        </Link>

        <button
          onClick={() => handleCompare(college)}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Compare
        </button>
      </div>
    </div>
  );
}

export default CollegeCard;