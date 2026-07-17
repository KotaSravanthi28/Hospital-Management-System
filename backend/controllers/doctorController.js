const Doctor = require("../models/Doctor");
const Appointment = require("../models/Appointment");
const User = require("../models/User");


/*
==========================================================
Create Doctor Profile
POST /api/doctors
Private (Doctor)
==========================================================
*/

exports.createDoctor = async (req, res) => {
  try {
    const {
      specialization,
      qualification,
      experience,
      hospital,
      consultationFee,
      timings,
      about,
      image,
    } = req.body;

    // Check whether doctor profile already exists
    const doctorExists = await Doctor.findOne({
      user: req.user.id,
    });

    if (doctorExists) {
      return res.status(400).json({
        success: false,
        message: "Doctor profile already exists",
      });
    }

    const doctor = await Doctor.create({
      user: req.user.id,
      specialization,
      qualification,
      experience,
      hospital,
      consultationFee,
      timings,
      about,
      image,
    });

    res.status(201).json({
      success: true,
      message: "Doctor profile created successfully",
      doctor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
==========================================================
Get All Doctors
GET /api/doctors
Public
==========================================================
*/

exports.getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find()
      .populate("user", "-password")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: doctors.length,
      doctors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
==========================================================
Get Doctor By ID
GET /api/doctors/:id
Public
==========================================================
*/

exports.getDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).populate(
      "user",
      "-password"
    );

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    res.status(200).json({
      success: true,
      doctor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
==========================================================
Update Doctor
PUT /api/doctors/:id
Private (Doctor)
==========================================================
*/

exports.updateDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    if (doctor.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const updatedDoctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Doctor profile updated",
      doctor: updatedDoctor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
==========================================================
Delete Doctor
DELETE /api/doctors/:id
Private (Admin)
==========================================================
*/

exports.deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    await doctor.deleteOne();

    res.status(200).json({
      success: true,
      message: "Doctor deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
==========================================================
Verify Doctor
PUT /api/doctors/verify/:id
Private (Admin)
==========================================================
*/

exports.verifyDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    doctor.verified = true;

    await doctor.save();

    res.status(200).json({
      success: true,
      message: "Doctor verified successfully",
      doctor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
==========================================================
Search Doctors
GET /api/doctors/search?keyword=
==========================================================
*/

exports.searchDoctors = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";

    const doctors = await Doctor.find({
      specialization: {
        $regex: keyword,
        $options: "i",
      },
    }).populate("user", "-password");

    res.status(200).json({
      success: true,
      count: doctors.length,
      doctors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
==========================================================
Filter Doctors
GET /api/doctors/filter
==========================================================
*/

exports.filterDoctors = async (req, res) => {
  try {
    const { specialization, minFee, maxFee } = req.query;

    const filter = {};

    if (specialization) {
      filter.specialization = specialization;
    }

    if (minFee || maxFee) {
      filter.consultationFee = {};

      if (minFee) {
        filter.consultationFee.$gte = Number(minFee);
      }

      if (maxFee) {
        filter.consultationFee.$lte = Number(maxFee);
      }
    }

    const doctors = await Doctor.find(filter).populate(
      "user",
      "-password"
    );

    res.status(200).json({
      success: true,
      count: doctors.length,
      doctors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
==========================================================
Sort Doctors
GET /api/doctors/sort
==========================================================
*/

exports.sortDoctors = async (req, res) => {
  try {
    const sortBy = req.query.sort;

    let sortOption = {};

    switch (sortBy) {
      case "fee":
        sortOption = { consultationFee: 1 };
        break;

      case "experience":
        sortOption = { experience: -1 };
        break;

      case "latest":
        sortOption = { createdAt: -1 };
        break;

      default:
        sortOption = { createdAt: -1 };
    }

    const doctors = await Doctor.find()
      .populate("user", "-password")
      .sort(sortOption);

    res.status(200).json({
      success: true,
      doctors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getMyDoctorProfile = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({
      user: req.user.id,
    }).populate("user", "-password");

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor profile not found",
      });
    }

    res.status(200).json({
      success: true,
      doctor,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getDoctorDashboard = async (req, res) => {
  try {
    console.log("Logged In User:", req.user);

    const doctor = await Doctor.findOne({
      user: req.user.id,
    }).populate("user", "-password");

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor profile not found",
      });
    }

    const appointments = await Appointment.find({
      doctor: doctor._id,
    })
      .populate("patient", "name email phone")
      .sort({ appointmentDate: -1 });

    const dashboard = {
      doctor,
      appointments,
      totalAppointments: appointments.length,
      pending: appointments.filter(
        (a) => a.status === "Pending"
      ).length,
      confirmed: appointments.filter(
        (a) => a.status === "Confirmed"
      ).length,
      completed: appointments.filter(
        (a) => a.status === "Completed"
      ).length,
      cancelled: appointments.filter(
        (a) => a.status === "Cancelled"
      ).length,
    };

    res.status(200).json({
      success: true,
      dashboard,
    });
  } catch (error) {
    console.error("Dashboard Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    appointment.status = status;

    await appointment.save();

    res.status(200).json({
      success: true,
      message: "Appointment status updated",
      appointment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};