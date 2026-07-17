import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function AdminProfile() {
  const admin = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <Navbar />

      <div className="container py-5">

        <div className="row justify-content-center">

          <div className="col-md-6">

            <div className="card shadow">

              <div className="card-header bg-dark text-white">
                <h3 className="mb-0">Admin Profile</h3>
              </div>

              <div className="card-body">

                <div className="text-center mb-4">

                  <img
                    src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                    alt="Admin"
                    width="120"
                    height="120"
                    className="rounded-circle border"
                  />

                </div>

                <table className="table">

                  <tbody>

                    <tr>
                      <th>Name</th>
                      <td>{admin?.name}</td>
                    </tr>

                    <tr>
                      <th>Email</th>
                      <td>{admin?.email}</td>
                    </tr>

                    <tr>
                      <th>Phone</th>
                      <td>{admin?.phone}</td>
                    </tr>

                    <tr>
                      <th>Gender</th>
                      <td>{admin?.gender}</td>
                    </tr>

                    <tr>
                      <th>Age</th>
                      <td>{admin?.age}</td>
                    </tr>

                    <tr>
                      <th>Role</th>
                      <td>
                        <span className="badge bg-danger">
                          {admin?.role}
                        </span>
                      </td>
                    </tr>

                  </tbody>

                </table>

              </div>

            </div>

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
}