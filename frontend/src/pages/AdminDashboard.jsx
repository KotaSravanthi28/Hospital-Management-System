import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AdminSidebar from "../components/AdminSidebar";
import StatCard from "../components/StatCard";
import { Link } from "react-router-dom";
import "../styles/AdminDashboard.css";

export default function AdminDashboard() {

  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {

    try {

      const res = await API.get("/admin/dashboard", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setDashboard(res.data.dashboard);

    } catch (err) {

      console.log(err);

      alert("Unable to load dashboard");

    }

  };

  if (!dashboard) {

    return (
      <>
        <Navbar />
        <div className="container mt-5">
          <h2>Loading...</h2>
        </div>
        <Footer />
      </>
    );

  }

  return (

    <>
      <Navbar />

      <div className="d-lg-flex">

        <AdminSidebar />

        <div className="container-fluid p-3 p-md-4">

          <h2 className="mb-4 fw-bold text-primary">
            Admin Dashboard
          </h2>

          <div className="row g-3">

            <StatCard
              title="Doctors"
              value={dashboard.totalDoctors}
              color="primary"
            />

            <StatCard
              title="Patients"
              value={dashboard.totalPatients}
              color="success"
            />

            <StatCard
              title="Appointments"
              value={dashboard.totalAppointments}
              color="warning"
            />

            <StatCard
              title="Pending"
              value={dashboard.pendingAppointments}
              color="secondary"
            />

            <StatCard
              title="Confirmed"
              value={dashboard.confirmedAppointments}
              color="info"
            />

            <StatCard
              title="Completed"
              value={dashboard.completedAppointments}
              color="success"
            />

            <StatCard
              title="Cancelled"
              value={dashboard.cancelledAppointments}
              color="danger"
            />

          </div>

          <hr className="my-4" />

          <h3 className="mb-4">Quick Access</h3>
          
          <div className="row g-3 mb-5">
            
            <div className="col-md-3 mb-3">
              <Link to="/admin/doctors" className="btn btn-primary w-100 py-3 rounded-3 shadow-sm">
              👨‍⚕️ Manage Doctors
              </Link>
            </div>
            
            <div className="col-md-3 mb-3"> 
              <Link to="/admin/patients" className="btn btn-success w-100 py-3">
              👨‍👩‍👧 Manage Patients
              </Link>
            </div>
            
            <div className="col-md-3 mb-3">
              <Link to="/admin/appointments" className="btn btn-warning w-100 py-3">
              📅 Manage Appointments
              </Link>
              
            </div>

            <div className="col-md-3 mb-3">
              <Link to="/admin/profile" className="btn btn-dark w-100 py-3">
                👤 Admin Profile
              </Link>
            </div>

          </div>

          <h3>Recent Appointments</h3>

          <table className="table table-bordered table-hover">

            <thead>

              <tr>

                <th>Patient</th>

                <th>Doctor</th>

                <th>Date</th>

                <th>Status</th>

              </tr>

            </thead>

            <tbody>

              {dashboard.recentAppointments.map((appointment) => (

                <tr key={appointment._id}>

                  <td>{appointment.patient?.name}</td>

                  <td>{appointment.doctor?.user?.name}</td>

                  <td>
                    {new Date(
                      appointment.appointmentDate
                    ).toLocaleDateString()}
                  </td>

                  <td>

                    <span
                      className={`badge ${
                        appointment.status === "Completed"
                          ? "bg-success"
                          : appointment.status === "Cancelled"
                          ? "bg-danger"
                          : appointment.status === "Confirmed"
                          ? "bg-primary"
                          : "bg-warning text-dark"
                      }`}
                    >
                      {appointment.status}
                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

      <Footer />

    </>

  );

}