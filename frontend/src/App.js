import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Doctors from "./pages/Doctors";
import DoctorDetails from "./pages/DoctorDetails";
import BookAppointment from "./pages/BookAppointment";
import PatientDashboard from "./pages/PatientDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import CreateDoctorProfile from "./pages/CreateDoctorProfile";
import MyAppointments from "./pages/MyAppointments";
import ManageDoctors from "./pages/admin/ManageDoctors";
import ManagePatients from "./pages/admin/ManagePatients";
import ManageAppointments from "./pages/admin/ManageAppointments";
import AdminProfile from "./pages/admin/AdminProfile";
import Profile from "./pages/Profile";


function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home/>}/>

        <Route path="/login" element={<Login/>}/>

        <Route path="/register" element={<Register/>}/>

        <Route path="/doctors" element={<Doctors/>}/>

        <Route path="/doctor/:id" element={<DoctorDetails/>}/>

        <Route path="/book/:id" element={<BookAppointment/>}/>

        <Route path="/patient" element={<PatientDashboard/>}/>

        <Route path="/doctor-dashboard" element={<DoctorDashboard/>}/>

        <Route path="/admin" element={<AdminDashboard/>}/>

        <Route path="*" element={<NotFound/>}/>

        <Route
         path="/doctor/profile"
         element={<CreateDoctorProfile />}
        />

        <Route path="/profile" element={<Profile />} />

        <Route path="/my-appointments" element={<MyAppointments />} />

        <Route path="/admin/doctors" element={<ManageDoctors />} />
        <Route path="/admin/patients" element={<ManagePatients />} />
        <Route path="/admin/appointments" element={<ManageAppointments />} />
        <Route path="/admin/profile" element={<AdminProfile />} />

       

      </Routes>

    </BrowserRouter>

  );

}

export default App;

