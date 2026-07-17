import { useEffect, useState } from "react";
import API from "../../services/api";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function ManageAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await API.get("/appointments", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setAppointments(res.data.appointments);
    } catch (error) {
      console.log(error);
      alert("Unable to fetch appointments");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container py-5">
          <h3>Loading Appointments...</h3>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="container py-5">

        <h2 className="text-primary mb-4">
          Manage Appointments
        </h2>

        <div className="table-responsive">

          <table className="table table-bordered table-hover">

            <thead className="table-dark">

              <tr>
                <th>#</th>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Date</th>
                <th>Time</th>
                <th>Reason</th>
                <th>Status</th>
              </tr>

            </thead>

            <tbody>

              {appointments.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center">
                    No Appointments Found
                  </td>
                </tr>
              ) : (
                appointments.map((appointment, index) => (
                  <tr key={appointment._id}>

                    <td>{index + 1}</td>

                    <td>{appointment.patient?.name}</td>

                    <td>{appointment.doctor?.user?.name}</td>

                    <td>
                      {new Date(
                        appointment.appointmentDate
                      ).toLocaleDateString()}
                    </td>

                    <td>{appointment.appointmentTime}</td>

                    <td>{appointment.reason}</td>

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
                ))
              )}

            </tbody>

          </table>

        </div>

      </div>

      <Footer />
    </>
  );
}