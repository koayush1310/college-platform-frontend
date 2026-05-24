import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { API_URL } from "../config";

function CollegeDetails() {
  const { id } = useParams();

  const [college, setCollege] = useState(null);

  useEffect(() => {
    fetchCollege();
  }, []);

  const fetchCollege = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/colleges/${id}`
      );

      setCollege(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!college) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-4">
        {college.name}
      </h1>

      <div className="space-y-3 text-lg">
        <p>
          <strong>Location:</strong>{" "}
          {college.location}
        </p>

        <p>
          <strong>Fees:</strong> ₹
          {college.fees}
        </p>

        <p>
          <strong>Rating:</strong>{" "}
          {college.rating}
        </p>

        <p>
          <strong>Placements:</strong>{" "}
          {college.placements}%
        </p>

        <div>
          <strong>Courses:</strong>

          <ul className="list-disc ml-6">
            {college.courses.map((course) => (
              <li key={course}>{course}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CollegeDetails;