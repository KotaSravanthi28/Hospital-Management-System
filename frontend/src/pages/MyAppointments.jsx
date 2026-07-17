import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API from "../services/api";

export default function MyAppointments() {

  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {

      const res = await API.get("/appointments/my", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setAppointments(res.data.appointments);

    } catch (err) {
      console.log(err);
      alert("Unable to load appointments");
    }
  };

  return (
    <>
      <Navbar />

      <div className="container py-5">

        <h2 className="mb-4">My Appointments</h2>

        {appointments.length === 0 ? (

          <div className="alert alert-info">
            No appointments booked yet.
          </div>

        ) : (

          appointments.map((appointment) => (

            <div className="card mb-3 shadow" key={appointment._id}>

              <div className="card-body">

                <h4>
                  Dr. {appointment.doctor.user.name}
                </h4>

                <p>
                  <strong>Specialization:</strong>{" "}
                  {appointment.doctor.specialization}
                </p>

                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(
                    appointment.appointmentDate
                  ).toLocaleDateString()}
                </p>

                <p>
                  <strong>Time:</strong>{" "}
                  {appointment.appointmentTime}
                </p>

                <p>
                  <strong>Reason:</strong>{" "}
                  {appointment.reason}
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  <span className="badge bg-primary">
                    {appointment.status}
                  </span>
                </p>

              </div>

            </div>

          ))

        )}

      </div>

      <Footer />
    </>
  );
}