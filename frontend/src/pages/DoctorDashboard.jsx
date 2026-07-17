import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function DoctorDashboard() {

    const [dashboard,setDashboard]=useState(null);

    useEffect(()=>{

        loadDashboard();

    },[]);

    const loadDashboard=async()=>{

        try{

            const res=await API.get("/doctors/dashboard",{

                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }

            });

            setDashboard(res.data.dashboard);

        }

        catch(err){

            console.log(err);

        }

    }

    const updateStatus = async (id, status) => {
        try {
            await API.put(
                `/appointments/status/${id}`,
                { status },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            
            loadDashboard();
        
        } catch (err) {
            console.log(err);
            alert("Failed to update status");
        }
    };

    if(!dashboard){

        return(
            <>
            <Navbar/>
            <div className="container mt-5">
            <h2>Loading...</h2>
            </div>
            <Footer/>
            </>
        )

    }

    return(

<>
<Navbar/>

<div className="container py-5">

<h2 className="mb-4">

Welcome Dr. {dashboard.doctor.user.name}

</h2>

<div className="row">

<div className="col-md-3">

<div className="card shadow text-center">

<div className="card-body">

<h5>Total</h5>

<h2>{dashboard.totalAppointments}</h2>

</div>

</div>

</div>

<div className="col-md-3">

<div className="card shadow text-center">

<div className="card-body">

<h5>Pending</h5>

<h2>{dashboard.pending}</h2>

</div>

</div>

</div>

<div className="col-md-3">

<div className="card shadow text-center">

<div className="card-body">

<h5>Confirmed</h5>

<h2>{dashboard.confirmed}</h2>

</div>

</div>

</div>

<div className="col-md-3">

<div className="card shadow text-center">

<div className="card-body">

<h5>Completed</h5>

<h2>{dashboard.completed}</h2>

</div>

</div>

</div>

</div>

<hr className="my-5"/>

<h3>Appointments</h3>

<table className="table table-bordered">

<thead>

<tr>

<th>Patient</th>

<th>Date</th>

<th>Time</th>

<th>Reason</th>

<th>Status</th>

<th>Action</th>

</tr>

</thead>

<tbody>

{dashboard.appointments.map((a)=>(

<tr key={a._id}>

<td>{a.patient.name}</td>

<td>{new Date(a.appointmentDate).toLocaleDateString()}</td>

<td>{a.appointmentTime}</td>

<td>{a.reason}</td>



<td>
  <span
    className={`badge ${
      a.status === "Pending"
        ? "bg-warning"
        : a.status === "Confirmed"
        ? "bg-success"
        : a.status === "Completed"
        ? "bg-primary"
        : "bg-danger"
    }`}
  >
    {a.status}
  </span>
</td>

<td>
  {a.status === "Pending" && (
    <>
      <button
        className="btn btn-success btn-sm me-2"
        onClick={() => updateStatus(a._id, "Confirmed")}
      >
        Confirm
      </button>

      <button
        className="btn btn-danger btn-sm"
        onClick={() => updateStatus(a._id, "Cancelled")}
      >
        Reject
      </button>
    </>
  )}

  {a.status === "Confirmed" && (
    <button
      className="btn btn-primary btn-sm"
      onClick={() => updateStatus(a._id, "Completed")}
    >
      Complete
    </button>
  )}
</td>

</tr>

))}

</tbody>

</table>

</div>

<Footer/>

</>

)

}