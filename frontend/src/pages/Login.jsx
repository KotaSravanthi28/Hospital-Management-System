import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/Auth.css";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", form);

      login(res.data.user, res.data.token);

      if (res.data.user.role === "admin") {
        navigate("/admin");
      } else if (res.data.user.role === "doctor") {
        if (res.data.hasDoctorProfile) {
          navigate("/doctor-dashboard");
        } else {
          navigate("/doctor/profile");
        }
      } else {
        navigate("/patient");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="auth-page">
        {/* Left Section */}
        <div className="auth-left">
          <div className="auth-content">
            <h1>🏥 CarePlus Hospital</h1>

            <p>
              Your trusted healthcare partner for easy doctor appointments,
              secure medical records, and quality patient care.
            </p>

            <div className="feature-box">
              <div className="feature-item">
                ✔ Book appointments with specialists
              </div>

              <div className="feature-item">
                ✔ Secure patient records
              </div>

              <div className="feature-item">
                ✔ Experienced doctors
              </div>

              <div className="feature-item">
                ✔ 24×7 Emergency Support
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="auth-right">
          <div className="auth-card">
            <div className="text-center mb-4">
              <h2 className="auth-title">Welcome Back</h2>

              <p className="text-muted">
                Login to your Hospital Account
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label">
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn auth-btn w-100"
              >
                Login
              </button>
            </form>

            <hr />

            <div className="text-center">
              Don't have an account?

              <Link
                to="/register"
                className="ms-2 text-decoration-none fw-bold"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}