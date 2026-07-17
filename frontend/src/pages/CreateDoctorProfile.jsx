import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function CreateDoctorProfile() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    specialization: "",
    qualification: "",
    experience: "",
    hospital: "",
    consultationFee: "",
    timings: "",
    about: "",
    image: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.post("/doctors", form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      alert("Doctor Profile Created Successfully");

      navigate("/doctor-dashboard");

    } catch (err) {
      alert(err.response?.data?.message || "Unable to create profile");
    }

  };

  return (

    <>
      <Navbar />

      <div className="container mt-5">

        <div className="card shadow p-4">

          <h2 className="mb-4">
            Complete Doctor Profile
          </h2>

          <form onSubmit={handleSubmit}>

            <input
              className="form-control mb-3"
              name="specialization"
              placeholder="Specialization"
              onChange={handleChange}
            />

            <input
              className="form-control mb-3"
              name="qualification"
              placeholder="Qualification"
              onChange={handleChange}
            />

            <input
              className="form-control mb-3"
              name="experience"
              placeholder="Experience"
              onChange={handleChange}
            />

            <input
              className="form-control mb-3"
              name="hospital"
              placeholder="Hospital"
              onChange={handleChange}
            />

            <input
              className="form-control mb-3"
              name="consultationFee"
              placeholder="Consultation Fee"
              onChange={handleChange}
            />

            <input
              className="form-control mb-3"
              name="timings"
              placeholder="Available Timings"
              onChange={handleChange}
            />

            <textarea
              className="form-control mb-3"
              name="about"
              rows="4"
              placeholder="About Yourself"
              onChange={handleChange}
            />

            <input
              className="form-control mb-4"
              name="image"
              placeholder="Image URL"
              onChange={handleChange}
            />

            <button className="btn btn-primary w-100">
              Save Profile
            </button>

          </form>

        </div>

      </div>

      <Footer />

    </>

  );

}