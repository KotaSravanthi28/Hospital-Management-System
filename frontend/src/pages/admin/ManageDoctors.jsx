import { useEffect, useState } from "react";
import API from "../../services/api";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function ManageDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDoctors();
  }, []);

  useEffect(() => {
    const result = doctors.filter((doctor) => {
      const name = doctor.user?.name?.toLowerCase() || "";
      const specialization = doctor.specialization?.toLowerCase() || "";

      return (
        name.includes(search.toLowerCase()) ||
        specialization.includes(search.toLowerCase())
      );
    });

    setFilteredDoctors(result);
  }, [search, doctors]);

  const fetchDoctors = async () => {
    try {
      const res = await API.get("/doctors", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setDoctors(res.data.doctors);
      setFilteredDoctors(res.data.doctors);
    } catch (err) {
      console.log(err);
      alert("Unable to load doctors");
    } finally {
      setLoading(false);
    }
  };

  const verifyDoctor = async (id) => {
    if (!window.confirm("Verify this doctor?")) return;

    try {
      await API.put(
        `/doctors/verify/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Doctor Verified");
      fetchDoctors();
    } catch (err) {
      console.log(err);
      alert("Verification Failed");
    }
  };

  const deleteDoctor = async (id) => {
    if (!window.confirm("Delete this doctor?")) return;

    try {
      await API.delete(`/doctors/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      alert("Doctor Deleted");
      fetchDoctors();
    } catch (err) {
      console.log(err);
      alert("Delete Failed");
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container py-5">
          <h3>Loading Doctors...</h3>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="container py-5">

        <h2 className="mb-4 text-primary">
          Manage Doctors
        </h2>

        <input
          className="form-control mb-4"
          placeholder="Search by name or specialization..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="table-responsive">

          <table className="table table-bordered table-hover align-middle">

            <thead className="table-dark">

              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Specialization</th>
                <th>Hospital</th>
                <th>Experience</th>
                <th>Fee</th>
                <th>Status</th>
                <th width="220">Actions</th>
              </tr>

            </thead>

            <tbody>

              {filteredDoctors.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center">
                    No Doctors Found
                  </td>
                </tr>
              ) : (
                filteredDoctors.map((doctor) => (
                  <tr key={doctor._id}>
                    <td>
                      <img
                        src={
                          doctor.image ||
                          "https://via.placeholder.com/60"
                        }
                        alt=""
                        width="60"
                        height="60"
                        className="rounded-circle"
                      />
                    </td>

                    <td>{doctor.user?.name}</td>

                    <td>{doctor.specialization}</td>

                    <td>{doctor.hospital}</td>

                    <td>{doctor.experience} Years</td>

                    <td>₹ {doctor.consultationFee}</td>

                    <td>
                      {doctor.verified ? (
                        <span className="badge bg-success">
                          Verified
                        </span>
                      ) : (
                        <span className="badge bg-warning text-dark">
                          Pending
                        </span>
                      )}
                    </td>

                    <td>

                      {!doctor.verified && (
                        <button
                          className="btn btn-success btn-sm me-2"
                          onClick={() => verifyDoctor(doctor._id)}
                        >
                          Verify
                        </button>
                      )}

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteDoctor(doctor._id)}
                      >
                        Delete
                      </button>

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