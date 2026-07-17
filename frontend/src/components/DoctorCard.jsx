import { Link } from "react-router-dom";

export default function DoctorCard({ doctor }) {
  const user = doctor.user || {};

  return (
    <div className="col-md-4 mb-4">
      <div className="card shadow-sm border-0 h-100">

        <img
          src={
            doctor.image && doctor.image !== ""
              ? doctor.image
              : "https://via.placeholder.com/300x220?text=Doctor"
          }
          className="card-img-top"
          alt="Doctor"
          style={{ height: "220px", objectFit: "cover" }}
        />

        <div className="card-body">

          <h4>{user.name}</h4>

          <h6 className="text-primary">
            {doctor.specialization}
          </h6>

          <p>
            <strong>Experience:</strong> {doctor.experience} Years
          </p>

          <p>
            <strong>Hospital:</strong> {doctor.hospital}
          </p>

          <p>
            <strong>Fee:</strong> ₹{doctor.consultationFee}
          </p>

          <div className="d-flex justify-content-between">

            <Link
              className="btn btn-outline-primary"
              to={`/doctor/${doctor._id}`}
            >
              View details
            </Link>

            <Link
              className="btn btn-success"
              to={`/book/${doctor._id}`}
            >
              Book
            </Link>

          </div>

        </div>

      </div>
    </div>
  );
}