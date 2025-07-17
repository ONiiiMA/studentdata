import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

function CreateStudent() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const [phone, setPhone] = useState("");

  type FormData = {
    id: number;
    name: string;
    place: string;
    phone: string;
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [validationError, setValidationError] = useState("");

  const navigate = useNavigate();

  const onSubmit = () => {
    const studentData = {
      id: id,
      name: name,
      place: place,
      phone: phone,
    };
    fetch("http://localhost:8000/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(studentData),
    })
      .then((response) => {
        if (response.ok) {
          navigate("/");
        } else {
          console.error("Error creating student");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="container mx-auto max-w-md p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Create New Student
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label
            htmlFor="id"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            ID
          </label>
          <input
            type="number"
            id="id"
            name="id"
            required
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters",
              },
              maxLength: {
                value: 20,
                message: "Name must be at most 20 characters",
              },
              pattern: {
                value: /^[A-Za-z]+$/,
                message: "Name must be alphabetic",
              },
            })}
            value={name}
            onChange={(e) => setName(e.target.value)}
            onMouseDown={() => setValidationError(true)}
            className={`block w-full px-3 py-2 border ${
              errors.name ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
          />
          {errors.name && (
            <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="place"
            className="block text-sm font-medium text-gray-700 mb-1"
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
            className={`block w-full px-3 py-2 border ${
              place && validationError && place.length < 2
                ? "border-red-500"
                : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
          />
          {place && validationError && place.length < 2 && (
            <span className="text-red-600 text-sm mt-1">
              Place must be at least 2 characters long
            </span>
          )}
        </div>
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-1"
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
            className={`block w-full px-3 py-2 border ${
              phone && validationError && phone.length < 10
                ? "border-red-500"
                : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
          />
          {phone && validationError && phone.length < 10 && (
            <span className="text-red-600 text-sm mt-1">
              Phone must be at least 10 characters long
            </span>
          )}
        </div>
        <div className="flex justify-between items-center mt-6">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md shadow hover:bg-blue-700 transition"
          >
            Save
          </button>
          <Link
            to="/"
            className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md shadow hover:bg-gray-400 transition"
          >
            Back
          </Link>
        </div>
      </form>
    </div>
  );
}

export default CreateStudent;
