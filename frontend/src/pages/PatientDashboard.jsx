/*import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function PatientDashboard() {
  return (
    <>
      <Navbar />

      <div className="container mt-5">
        <h1>🧑 Patient Dashboard</h1>
        <p>Welcome to the Patient Dashboard.</p>
      </div>

      <Footer />
    </>
  );
}*/

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function PatientDashboard() {

  const [appointments, setAppointments] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {

    try {

      const res = await API.get("/appointments/my", {

        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },

      });

      setAppointments(res.data.appointments || []);

    } catch (err) {
      console.log(err);
    }

  };

  const upcoming = appointments.filter(
    (a) => a.status === "Pending" || a.status === "Accepted"
  );

  const completed = appointments.filter(
    (a) => a.status === "Completed"
  );

  const cancelled = appointments.filter(
    (a) => a.status === "Cancelled"
  );

  return (
    <>
      <Navbar />

      <div className="container py-5">

        {/* Welcome */}

        <div className="card shadow border-0 mb-4">

          <div className="card-body">

            <h2>
              Welcome,
              <span className="text-primary">
                {" "}
                {user?.name}
              </span>
              👋
            </h2>

            <p className="text-muted">
              Manage your appointments and consult doctors online.
            </p>

          </div>

        </div>

        {/* Statistics */}

        <div className="row">

          <div className="col-md-3 mb-3">

            <div className="card text-center shadow">

              <div className="card-body">

                <h2>{appointments.length}</h2>

                <p>Total Appointments</p>

              </div>

            </div>

          </div>

          <div className="col-md-3 mb-3">

            <div className="card text-center shadow">

              <div className="card-body">

                <h2>{upcoming.length}</h2>

                <p>Upcoming</p>

              </div>

            </div>

          </div>

          <div className="col-md-3 mb-3">

            <div className="card text-center shadow">

              <div className="card-body">

                <h2>{completed.length}</h2>

                <p>Completed</p>

              </div>

            </div>

          </div>

          <div className="col-md-3 mb-3">

            <div className="card text-center shadow">

              <div className="card-body">

                <h2>{cancelled.length}</h2>

                <p>Cancelled</p>

              </div>

            </div>

          </div>

        </div>

        {/* Quick Actions */}

        <div className="card shadow mt-4">

          <div className="card-body">

            <h4>Quick Actions</h4>

            <div className="d-flex flex-wrap gap-3 mt-3">

              <Link
                to="/doctors"
                className="btn btn-primary"
              >
                🔍 Find Doctors
              </Link>

              <Link
                to="/my-appointments"
                className="btn btn-success"
              >
                📅 My Appointments
              </Link>

              <Link
                to="/profile"
                className="btn btn-warning"
              >
                👤 My Profile
              </Link>

            </div>

          </div>

        </div>

        {/* Upcoming Appointments */}

        <div className="card shadow mt-4">

          <div className="card-body">

            <h4>Upcoming Appointments</h4>

            <hr />

            {upcoming.length === 0 ? (

              <p>No upcoming appointments.</p>

            ) : (

              upcoming.map((appointment) => (

                <div
                  key={appointment._id}
                  className="border rounded p-3 mb-3"
                >

                  <h5>

                    Dr. {appointment.doctor?.user?.name}

                  </h5>

                  <p>

                    {appointment.appointmentDate}

                  </p>

                  <p>

                    {appointment.appointmentTime}

                  </p>

                  <span className="badge bg-primary">

                    {appointment.status}

                  </span>

                </div>

              ))

            )}

          </div>

        </div>

        {/* Recent History */}

        <div className="card shadow mt-4 mb-5">

          <div className="card-body">

            <h4>Appointment History</h4>

            <hr />

            {appointments.length === 0 ? (

              <p>No appointment history.</p>

            ) : (

              appointments.map((appointment) => (

                <div
                  key={appointment._id}
                  className="border rounded p-3 mb-3"
                >

                  <h5>

                    Dr. {appointment.doctor?.user?.name}

                  </h5>

                  <p>

                    {appointment.appointmentDate}

                  </p>

                  <span className="badge bg-secondary">

                    {appointment.status}

                  </span>

                </div>

              ))

            )}

          </div>

        </div>

      </div>

      <Footer />

    </>
  );

}