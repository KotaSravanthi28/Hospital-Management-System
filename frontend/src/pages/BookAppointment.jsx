import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function BookAppointment() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    appointmentDate: "",
    appointmentTime: "",
    reason: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const res = await API.post(
        "/appointments/book",
        {
          doctorId: id,
          appointmentDate: form.appointmentDate,
          appointmentTime: form.appointmentTime,
          reason: form.reason,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data.message);
      navigate("/my-appointments");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to book appointment");
    }

    setLoading(false);
  };

  return (
    <>
      <Navbar />

      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">

            <div className="card shadow">

              <div className="card-header bg-primary text-white">
                <h3 className="mb-0">Book Appointment</h3>
              </div>

              <div className="card-body">

                <form onSubmit={handleSubmit}>

                  <div className="mb-3">
                    <label className="form-label">
                      Appointment Date
                    </label>

                    <input
                      type="date"
                      name="appointmentDate"
                      className="form-control"
                      value={form.appointmentDate}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">
                      Appointment Time
                    </label>

                    <input
                      type="time"
                      name="appointmentTime"
                      className="form-control"
                      value={form.appointmentTime}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">
                      Reason
                    </label>

                    <textarea
                      rows="4"
                      name="reason"
                      className="form-control"
                      placeholder="Describe your health problem"
                      value={form.reason}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={loading}
                  >
                    {loading ? "Booking..." : "Book Appointment"}
                  </button>

                </form>

              </div>

            </div>

          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}