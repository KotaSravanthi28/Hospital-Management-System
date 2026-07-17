import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/AdminSidebar.css";

export default function AdminSidebar() {
  const [open, setOpen] = useState(false);

  const closeSidebar = () => setOpen(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="btn btn-primary d-lg-none m-2"
        onClick={() => setOpen(true)}
      >
        ☰
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="sidebar-overlay"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`sidebar ${open ? "show" : ""}`}>

        <div className="sidebar-header">

          <h4>🏥 Admin</h4>

          <button
            className="btn-close d-lg-none"
            onClick={closeSidebar}
          ></button>

        </div>

        <Link to="/admin" onClick={closeSidebar}>
          Dashboard
        </Link>

        <Link to="/admin/doctors" onClick={closeSidebar}>
          Doctors
        </Link>

        <Link to="/admin/patients" onClick={closeSidebar}>
          Patients
        </Link>

        <Link to="/admin/appointments" onClick={closeSidebar}>
          Appointments
        </Link>

        <Link to="/admin/profile" onClick={closeSidebar}>
          Profile
        </Link>

      </div>
    </>
  );
}