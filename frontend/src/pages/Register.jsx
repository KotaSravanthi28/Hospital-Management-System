import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/Auth.css";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "patient",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await API.post("/auth/register", formData);

      alert(response.data.message);

      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        role: "patient",
      });

      navigate("/login");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Registration Failed"
      );
    }

    setLoading(false);
  };

  return (
    <>
      <Navbar />

      <div className="auth-page">

        {/* Left Side */}

        <div className="auth-left">

          <div className="auth-content">

            <h1>🏥 CarePlus Hospital</h1>

            <p>
              Create your account to access our healthcare
              services and book appointments with expert doctors.
            </p>

            <div className="feature-box">

              <div className="feature-item">
                ✔ Book appointments online
              </div>

              <div className="feature-item">
                ✔ View appointment history
              </div>

              <div className="feature-item">
                ✔ Access experienced specialists
              </div>

              <div className="feature-item">
                ✔ Secure patient information
              </div>

            </div>

          </div>

        </div>

        {/* Right Side */}

        <div className="auth-right">

          <div className="auth-card">

            <div className="text-center mb-4">

              <h2 className="auth-title">
                Create Account
              </h2>

              <p className="text-muted">
                Register to continue
              </p>

            </div>

            <form onSubmit={handleRegister}>

              <div className="mb-3">

                <label className="form-label">
                  Full Name
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="mb-3">

                <label className="form-label">
                  Email Address
                </label>

                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="mb-3">

                <label className="form-label">
                  Phone Number
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="mb-3">

                <label className="form-label">
                  Password
                </label>

                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="mb-4">

                <label className="form-label">
                  Register As
                </label>

                <select
                  className="form-select"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="patient">
                    Patient
                  </option>

                  <option value="doctor">
                    Doctor
                  </option>

                </select>

              </div>

              <button
                type="submit"
                className="btn auth-btn w-100"
                disabled={loading}
              >
                {loading
                  ? "Creating Account..."
                  : "Register"}
              </button>

            </form>

            <hr />

            <div className="text-center">

              Already have an account?

              <Link
                to="/login"
                className="ms-2 text-decoration-none fw-bold"
              >
                Login
              </Link>

            </div>

          </div>

        </div>

      </div>

      <Footer />

    </>
  );
}