import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <Navbar />

      <div className="container py-5">
        <div className="card shadow p-4">
          <h2>My Profile</h2>

          <hr />

          <p><strong>Name:</strong> {user?.name}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Phone:</strong> {user?.phone}</p>
          <p><strong>Role:</strong> {user?.role}</p>
        </div>
      </div>

      <Footer />
    </>
  );
}