
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <div className="bg-primary text-white text-center py-5">
        <div className="container">
          <h1 className="display-4 fw-bold">
            Welcome to CarePlus Hospital
          </h1>

          <p className="lead mt-3">
            Your Health, Our Priority. Book appointments with experienced doctors.
          </p>

          <Link to="/doctors" className="btn btn-light btn-lg mt-3">
            Find Doctors
          </Link>
        </div>
      </div>

      {/* About */}
      <div className="container py-5">
        <div className="row text-center">

          <div className="col-md-4">
            <div className="card shadow p-3">
              <h3>👨‍⚕️ Expert Doctors</h3>
              <p>
                Highly qualified specialists providing quality healthcare.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow p-3">
              <h3>🏥 Modern Facilities</h3>
              <p>
                Advanced medical equipment and world-class infrastructure.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow p-3">
              <h3>🕒 24/7 Emergency</h3>
              <p>
                Emergency services available day and night for patients.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Services */}
      <div className="bg-light py-5">
        <div className="container">

          <h2 className="text-center mb-4">
            Our Services
          </h2>

          <div className="row text-center">

            <div className="col-md-3 mb-3">
              <div className="card p-3">
                ❤️ Cardiology
              </div>
            </div>

            <div className="col-md-3 mb-3">
              <div className="card p-3">
                🧠 Neurology
              </div>
            </div>

            <div className="col-md-3 mb-3">
              <div className="card p-3">
                🦴 Orthopedics
              </div>
            </div>

            <div className="col-md-3 mb-3">
              <div className="card p-3">
                👶 Pediatrics
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Statistics */}
      <div className="container py-5">

        <h2 className="text-center mb-4">
          Hospital Statistics
        </h2>

        <div className="row text-center">

          <div className="col-md-3">
            <h2 className="text-primary">50+</h2>
            <p>Doctors</p>
          </div>

          <div className="col-md-3">
            <h2 className="text-success">1000+</h2>
            <p>Patients</p>
          </div>

          <div className="col-md-3">
            <h2 className="text-danger">15+</h2>
            <p>Departments</p>
          </div>

          <div className="col-md-3">
            <h2 className="text-warning">24/7</h2>
            <p>Emergency</p>
          </div>

        </div>

      </div>

      {/* Contact */}
      <div className="bg-dark text-white py-5">

        <div className="container text-center">

          <h2>Contact Us</h2>

          <p>📍 Visakhapatnam, Andhra Pradesh</p>

          <p>📞 +91 9876543210</p>

          <p>📧 careplushospital@gmail.com</p>

        </div>

      </div>

      <Footer />
    </>
  );
}