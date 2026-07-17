import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DoctorCard from "../components/DoctorCard";

export default function Doctors() {

  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const loadDoctors = async () => {
    try {
      const res = await API.get("/doctors");

      setDoctors(res.data.doctors || []);
    } catch (err) {
      console.log(err);
      alert("Unable to fetch doctors");
    }

    setLoading(false);
  };

  useEffect(() => {
    loadDoctors();
  }, []);

  const filteredDoctors = doctors.filter((doctor) => {
    const user = doctor.user || {};

    return (
      doctor.specialization
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      user.name
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );
  });

  return (
    <>
      <Navbar />

      <div className="container py-5">

        <h2 className="mb-4">
          Find Your Doctor
        </h2>

        <input
          type="text"
          className="form-control mb-4"
          placeholder="Search doctor or specialization..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {loading ? (
          <h3>Loading...</h3>
        ) : (
          <div className="row">
            {filteredDoctors.length === 0 ? (
              <h4>No doctors found.</h4>
            ) : (
              filteredDoctors.map((doctor) => (
                <DoctorCard
                  key={doctor._id}
                  doctor={doctor}
                />
              ))
            )}
          </div>
        )}

      </div>

      <Footer />
    </>
  );
}