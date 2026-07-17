
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import API from "../services/api";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DoctorProfileCard from "../components/DoctorProfileCard";

export default function DoctorDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    loadDoctor();

  }, []);

  const loadDoctor = async () => {

    try {

      const res = await API.get(`/doctors/${id}`);

      setDoctor(res.data.doctor);

    } catch (error) {

      console.log(error);

      alert("Unable to load doctor");

    }

    setLoading(false);

  };

  if (loading) {

    return (
      <>
        <Navbar />
        <div className="container mt-5">
          <h3>Loading Doctor...</h3>
        </div>
      </>
    );

  }

  if (!doctor) {

    return (
      <>
        <Navbar />
        <div className="container mt-5">
          <h3>Doctor not found.</h3>
        </div>
      </>
    );

  }

  return (

    <>
      <Navbar />

      <div className="container py-5">

        {/* Doctor Profile */}

        <DoctorProfileCard doctor={doctor} />

        {/* About Doctor */}

        <div className="card shadow mt-4">

          <div className="card-body">

            <h3>About Doctor</h3>

            <hr />

            <p>
              {doctor.about}
            </p>

          </div>

        </div>

        {/* Professional Information */}

        <div className="card shadow mt-4">

          <div className="card-body">

            <h3>Professional Information</h3>

            <hr />

            <div className="row">

              <div className="col-md-6">

                <p>

                  <strong>Qualification :</strong>

                  {doctor.qualification}

                </p>

                <p>

                  <strong>Experience :</strong>

                  {doctor.experience} Years

                </p>

                <p>

                  <strong>Hospital :</strong>

                  {doctor.hospital}

                </p>

              </div>

              <div className="col-md-6">

                <p>

                  <strong>Consultation Fee :</strong>

                  ₹ {doctor.consultationFee}

                </p>

                <p>

                  <strong>Available Timings :</strong>

                  {doctor.timings}

                </p>

                <p>

                  <strong>Email :</strong>

                  {doctor.user.email}

                </p>

              </div>

            </div>

          </div>

        </div>

        {/* Appointment Card */}

        <div className="card shadow mt-4">

          <div className="card-body text-center">

            <h3>Book Appointment</h3>

            <p>

              Book your consultation with

              <strong>

                {" "}

                Dr. {doctor.user.name}

              </strong>

            </p>

            <button

              className="btn btn-primary btn-lg"

              onClick={() => navigate(`/book/${doctor._id}`)}

            >

              Book Appointment

            </button>

          </div>

        </div>

        {/* Reviews */}

        <div className="card shadow mt-4">

          <div className="card-body">

            <h3>Patient Reviews</h3>

            <hr />

            <div className="mb-3">

              ⭐⭐⭐⭐⭐

              <p>

                Excellent doctor. Very friendly and explains everything clearly.

              </p>

              <small>- Rahul</small>

            </div>

            <div className="mb-3">

              ⭐⭐⭐⭐⭐

              <p>

                Highly recommended for heart-related problems.

              </p>

              <small>- Priya</small>

            </div>

          </div>

        </div>

      </div>

      <Footer />

    </>

  );

}