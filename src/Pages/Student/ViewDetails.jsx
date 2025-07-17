import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function ViewDetails() {
  const { studentId } = useParams();
  const [student, setStudent] = useState({});

  useEffect(() => {
    fetch(`http://localhost:8000/students/${studentId}`)
      .then((response) => response.json())
      .then((data) => setStudent(data))
      .catch((error) =>
        console.error("Error fetching student details:", error)
      );
  }, [studentId]);

  return (
    <div className="max-w-lg mx-auto mt-10 p-8 bg-white rounded-xl shadow-lg">
      <h1 className="text-center mb-4 text-2xl font-bold text-gray-800">
        Student Details
      </h1>
      <div className="text-lg leading-relaxed text-gray-700">
        <p>
          <span className="font-semibold">ID:</span> {student.id}
        </p>
        <p>
          <span className="font-semibold">Name:</span> {student.name}
        </p>
        <p>
          <span className="font-semibold">Place:</span> {student.place}
        </p>
        <p>
          <span className="font-semibold">Phone:</span> {student.phone}
        </p>
      </div>
      <Link
        to="/"
        className="inline-block mt-6 px-6 py-2 bg-blue-600 text-white rounded-md font-bold hover:bg-blue-700 transition-colors"
      >
        Back
      </Link>
    </div>
  );
}

export default ViewDetails;
