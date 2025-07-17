import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function EditStudent() {
  const { studentId } = useParams();

  useEffect(() => {
    fetch(`http://localhost:8000/students/${studentId}`)
      .then((response) => response.json())
      .then((data) => {
        setId(data.id);
        setName(data.name);
        setPlace(data.place);
        setPhone(data.phone);
      })
      .catch((error) => {
        console.error("Error fetching student details:", error);
      });
  }, [studentId]);

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const [phone, setPhone] = useState("");
  const [validationError, setValidationError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const studentData = {
      id: id,
      name: name,
      place: place,
      phone: phone,
    };
    fetch("http://localhost:8000/students/" + studentId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(studentData),
    })
      .then((response) => {
        if (response.ok) {
          navigate("/");
        } else {
          console.error("Error updating student");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Edit Student Details
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="id" className="block mb-1 font-medium text-gray-700">
            ID
          </label>
          <input
            type="number"
            id="id"
            name="id"
            required
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="name"
            className="block mb-1 font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            onMouseDown={() => setValidationError(true)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
          {name && validationError && name.length < 3 && (
            <span className="block text-red-600 text-sm mt-1">
              Name must be at least 3 characters long
            </span>
          )}
        </div>
        <div>
          <label
            htmlFor="place"
            className="block mb-1 font-medium text-gray-700"
          >
            Place
          </label>
          <input
            type="text"
            id="place"
            name="place"
            required
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            onMouseDown={() => setValidationError(true)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
          {place && validationError && place.length < 2 && (
            <span className="block text-red-600 text-sm mt-1">
              Place must be at least 2 characters long
            </span>
          )}
        </div>
        <div>
          <label
            htmlFor="phone"
            className="block mb-1 font-medium text-gray-700"
          >
            Phone
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            onMouseDown={() => setValidationError(true)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
          {phone && validationError && phone.length < 10 && (
            <span className="block text-red-600 text-sm mt-1">
              Phone must be at least 10 characters long
            </span>
          )}
        </div>
        <div className="flex gap-3 mt-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Save
          </button>
          <Link
            to="/"
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition text-center"
          >
            Back
          </Link>
        </div>
      </form>
    </div>
  );
}

export default EditStudent;
