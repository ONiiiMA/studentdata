import React, { useEffect, useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";

function StudentTable() {
  const { BgColor } = useOutletContext();
  const navigate = useNavigate();

  const DisplayStudent = (id) => {
    navigate(`/student/${id}`);
  };
  const DeleteStudent = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      fetch("http://localhost:8000/students/" + id, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            alert("Student deleted successfully");
            window.location.reload();
          } else {
            console.error("Error deleting student");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };
  const EditStudent = (id) => {
    navigate(`/student/edit/${id}`);
  };
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/students")
      .then((response) => response.json())
      .then((data) => {
        setStudents(data);
      })
      .catch((error) => {
        console.error("Error fetching student data:", error);
      });
  }, []);

  return (
    <div className={`${BgColor} min-h-screen flex items-center justify-center`}>
      <div className="bg-white w-full max-w-4xl mx-auto p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Student Records
        </h2>
        <div className="mb-6 flex justify-end">
          <Link
            to="/student/create"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition"
          >
            Add New Student
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-4 text-left font-semibold text-gray-700 border-b">
                  Id
                </th>
                <th className="py-3 px-4 text-left font-semibold text-gray-700 border-b">
                  Name
                </th>
                <th className="py-3 px-4 text-left font-semibold text-gray-700 border-b">
                  Place
                </th>
                <th className="py-3 px-4 text-left font-semibold text-gray-700 border-b">
                  Phone
                </th>
                <th className="py-3 px-4 text-left font-semibold text-gray-700 border-b">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {students &&
                students.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b">{item.id}</td>
                    <td className="py-2 px-4 border-b">{item.name}</td>
                    <td className="py-2 px-4 border-b">{item.place}</td>
                    <td className="py-2 px-4 border-b">{item.phone}</td>
                    <td className="py-2 px-4 border-b space-x-2">
                      <button
                        onClick={() => DisplayStudent(item.id)}
                        className="bg-sky-500 hover:bg-sky-700 text-white font-semibold py-1 px-3 rounded transition"
                      >
                        View
                      </button>
                      <button
                        onClick={() => EditStudent(item.id)}
                        className="bg-green-500 hover:bg-green-700 text-white font-semibold py-1 px-3 rounded transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => DeleteStudent(item.id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-semibold py-1 px-3 rounded transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default StudentTable;
