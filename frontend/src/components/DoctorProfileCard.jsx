import { FaStar, FaCheckCircle, FaHospital, FaUserMd } from "react-icons/fa";

export default function DoctorProfileCard({ doctor }) {
  if (!doctor) return null;

  return (
    <div className="card shadow-lg border-0 mb-4">
      <div className="card-body p-4">

        <div className="row align-items-center">

          {/* Doctor Image */}
          <div className="col-md-3 text-center">

            <img
              src={
                doctor.image ||
                "https://via.placeholder.com/200x200?text=Doctor"
              }
              alt={doctor.user?.name}
              className="rounded-circle shadow"
              style={{
                width: "180px",
                height: "180px",
                objectFit: "cover",
              }}
            />

          </div>

          {/* Doctor Information */}
          <div className="col-md-9">

            <div className="d-flex align-items-center mb-2">

              <h2 className="me-2 mb-0">
                {doctor.user?.name}
              </h2>

              {doctor.verified && (
                <FaCheckCircle
                  className="text-primary"
                  size={22}
                />
              )}

            </div>

            <h5 className="text-success">
              {doctor.specialization}
            </h5>

            <p className="text-muted">
              {doctor.qualification}
            </p>

            <div className="d-flex align-items-center mb-3">

              <FaStar className="text-warning me-2" />

              <strong>
                {doctor.rating || 4.8}
              </strong>

              <span className="ms-2 text-muted">
                ({doctor.reviews || 0} Reviews)
              </span>

            </div>

            <div className="row">

              <div className="col-md-6">

                <p>
                  <FaUserMd className="me-2 text-primary" />
                  <strong>Experience :</strong>{" "}
                  {doctor.experience} Years
                </p>

                <p>
                  <FaHospital className="me-2 text-danger" />
                  <strong>Hospital :</strong>{" "}
                  {doctor.hospital}
                </p>

              </div>

              <div className="col-md-6">

                <p>
                  <strong>Consultation Fee :</strong>{" "}
                  ₹ {doctor.consultationFee}
                </p>

                <p>
                  <strong>Available :</strong>{" "}
                  {doctor.timings}
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}