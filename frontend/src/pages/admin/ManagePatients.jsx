import { useEffect, useState } from "react";
import API from "../../services/api";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function ManagePatients() {

  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPatients();
  }, []);

  useEffect(() => {

    const result = patients.filter((patient) => {

      const name = patient.name?.toLowerCase() || "";
      const email = patient.email?.toLowerCase() || "";
      const phone = patient.phone?.toLowerCase() || "";

      return (
        name.includes(search.toLowerCase()) ||
        email.includes(search.toLowerCase()) ||
        phone.includes(search.toLowerCase())
      );

    });

    setFilteredPatients(result);

  }, [search, patients]);

  const fetchPatients = async () => {

    try {

      const res = await API.get("/admin/patients", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setPatients(res.data.patients);
      setFilteredPatients(res.data.patients);

    } catch (error) {

      console.log(error);
      alert("Unable to fetch patients");

    } finally {

      setLoading(false);

    }

  };

  const deletePatient = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this patient?"
    );

    if (!confirmDelete) return;

    try {

      await API.delete(`/admin/patients/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      alert("Patient deleted successfully");

      fetchPatients();

    } catch (error) {

      console.log(error);
      alert("Unable to delete patient");

    }

  };

  if (loading) {

    return (
      <>
        <Navbar />
        <div className="container py-5">
          <h3>Loading Patients...</h3>
        </div>
        <Footer />
      </>
    );

  }

  return (

    <>
      <Navbar />

      <div className="container py-5">

        <div className="d-flex justify-content-between align-items-center mb-4">

          <h2 className="text-primary">
            Manage Patients
          </h2>

          <span className="badge bg-primary fs-6">
            Total : {patients.length}
          </span>

        </div>

        <input
          type="text"
          className="form-control mb-4"
          placeholder="Search by Name / Email / Phone"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="table-responsive">

          <table className="table table-bordered table-hover align-middle">

            <thead className="table-dark">

              <tr>

                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Gender</th>
                <th>Age</th>
                <th>Registered</th>
                <th>Action</th>

              </tr>

            </thead>

            <tbody>

              {filteredPatients.length === 0 ? (

                <tr>

                  <td colSpan="8" className="text-center">

                    No Patients Found

                  </td>

                </tr>

              ) : (

                filteredPatients.map((patient, index) => (

                  <tr key={patient._id}>

                    <td>{index + 1}</td>

                    <td>{patient.name}</td>

                    <td>{patient.email}</td>

                    <td>{patient.phone}</td>

                    <td>{patient.gender}</td>

                    <td>{patient.age}</td>

                    <td>
                      {new Date(patient.createdAt).toLocaleDateString()}
                    </td>

                    <td>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deletePatient(patient._id)}
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