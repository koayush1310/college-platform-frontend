import { useEffect, useState } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import { API_URL } from "./config";
import Navbar from "./components/Navbar";

import CollegeCard from "./components/CollegeCard";
import CollegeDetails from "./pages/CollegeDetails";

function App() {
  const [colleges, setColleges] = useState([]);
  const [compareColleges, setCompareColleges] = useState([]);

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [maxFees, setMaxFees] = useState("");

  const [rank, setRank] = useState("");
  const [predictedColleges, setPredictedColleges] = useState([]);

  const [loading, setLoading] = useState(false);
  const [predictLoading, setPredictLoading] = useState(false);

  useEffect(() => {
    fetchColleges();
  }, []);

  const fetchColleges = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${API_URL}/api/colleges?search=${search}&location=${location}&maxFees=${maxFees}`
      );

      setColleges(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCompare = (college) => {
    const alreadyExists = compareColleges.find(
      (item) => item._id === college._id
    );

    if (alreadyExists) {
      return;
    }

    if (compareColleges.length >= 3) {
      alert("Only 3 colleges allowed");
      return;
    }

    setCompareColleges([...compareColleges, college]);
  };

  const predictCollege = async () => {
    try {
      setPredictLoading(true);

      const res = await axios.get(
        `${API_URL}/api/colleges/predict/rank?rank=${rank}`
      );

      setPredictedColleges(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setPredictLoading(false);
    }
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="p-6 bg-gray-100 min-h-screen">
            <Navbar/>
            <h1 className="text-3xl font-bold mb-6">
              College Discovery Platform
            </h1>

            {/* Search & Filters */}
            <div className="flex gap-4 mb-6 flex-wrap">
              <input
                type="text"
                placeholder="Search college"
                className="border p-2 rounded"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <select
                className="border p-2 rounded"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option value="">All Locations</option>
                <option value="Delhi">Delhi</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
              </select>

              <input
                type="number"
                placeholder="Max Fees"
                className="border p-2 rounded"
                value={maxFees}
                onChange={(e) => setMaxFees(e.target.value)}
              />

              <button
                onClick={fetchColleges}
                className="bg-black text-white px-4 py-2 rounded"
              >
                {loading ? "Loading..." : "Search"}
              </button>
            </div>

            {/* Predictor */}
            <div id="predictor" className="mb-10 border p-4 rounded-lg bg-white shadow">
              <h2 className="text-2xl font-bold mb-4">
                College Predictor
              </h2>

              <div className="flex gap-4 mb-4">
                <input
                  type="number"
                  placeholder="Enter Rank"
                  className="border p-2 rounded"
                  value={rank}
                  onChange={(e) => setRank(e.target.value)}
                />

                <button
                  onClick={predictCollege}
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  {predictLoading ? "Predicting..." : "Predict"}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {predictedColleges.length === 0 && !predictLoading && (
                  <p className="text-gray-500">No colleges predicted yet.</p>
                )}
                {predictedColleges.map((college) => (
                  <div
                    key={college._id}
                    className="border p-4 rounded"
                  >
                    <h3 className="text-xl font-bold">
                      {college.name}
                    </h3>

                    <p>{college.location}</p>

                    <p>Fees: ₹{college.fees}</p>

                    <p>Rating: {college.rating}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Compare Colleges */}
            {compareColleges.length > 0 && (
              <div id="compare" className="mb-10 overflow-x-auto bg-white p-4 rounded-lg shadow">
                <h2 className="text-2xl font-bold mb-4">
                  Compare Colleges
                </h2>

                <table className="w-full border">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border p-2">Field</th>

                      {compareColleges.map((college) => (
                        <th
                          key={college._id}
                          className="border p-2"
                        >
                          {college.name}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td className="border p-2 font-bold">
                        Location
                      </td>

                      {compareColleges.map((college) => (
                        <td
                          key={college._id}
                          className="border p-2"
                        >
                          {college.location}
                        </td>
                      ))}
                    </tr>

                    <tr>
                      <td className="border p-2 font-bold">
                        Fees
                      </td>

                      {compareColleges.map((college) => (
                        <td
                          key={college._id}
                          className="border p-2"
                        >
                          ₹{college.fees}
                        </td>
                      ))}
                    </tr>

                    <tr>
                      <td className="border p-2 font-bold">
                        Rating
                      </td>

                      {compareColleges.map((college) => (
                        <td
                          key={college._id}
                          className="border p-2"
                        >
                          {college.rating}
                        </td>
                      ))}
                    </tr>

                    <tr>
                      <td className="border p-2 font-bold">
                        Placements
                      </td>

                      {compareColleges.map((college) => (
                        <td
                          key={college._id}
                          className="border p-2"
                        >
                          {college.placements}%
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {/* College Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {colleges.length === 0 && !loading && (
                <p className="text-gray-500">No colleges found.</p>
              )}
              {colleges.map((college) => (
                <CollegeCard
                  key={college._id}
                  college={college}
                  handleCompare={handleCompare}
                />
              ))}
            </div>
          </div>
        }
      />

      <Route
        path="/college/:id"
        element={<CollegeDetails />}
      />
    </Routes>
  );
}

export default App;