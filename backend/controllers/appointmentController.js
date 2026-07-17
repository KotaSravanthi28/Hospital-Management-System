const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");

/*
==========================================================
Book Appointment
POST /api/appointments
Private (Patient)
==========================================================
*/

exports.bookAppointment = async (req, res) => {
  try {
    const {
      doctorId,
      appointmentDate,
      appointmentTime,
      reason,
    } = req.body;

    const doctorExists = await Doctor.findById(doctorId);

    if (!doctorExists) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    const existingAppointment = await Appointment.findOne({
      doctor: doctorId,
      appointmentDate,
      appointmentTime,
      status: {
        $ne: "Cancelled",
      },
    });

    if (existingAppointment) {
      return res.status(400).json({
        success: false,
        message: "Selected time slot is already booked",
      });
    }

    const appointment = await Appointment.create({
      patient: req.user.id,
      doctor: doctorId,
      appointmentDate,
      appointmentTime,
      reason,
    });

    res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      appointment,
    });
    

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*exports.bookAppointment = async (req, res) => {
  try {
    const {
      doctor,
      appointmentDate,
      appointmentTime,
      reason,
    } = req.body;

    // Check doctor exists
    const doctorExists = await Doctor.findById(doctor);

    if (!doctorExists) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    // Prevent duplicate booking
    const existingAppointment = await Appointment.findOne({
      doctor,
      appointmentDate,
      appointmentTime,
      status: {
        $ne: "Cancelled",
      },
    });

    if (existingAppointment) {
      return res.status(400).json({
        success: false,
        message: "Selected time slot is already booked",
      });
    }

    const appointment = await Appointment.create({
      patient: req.user.id,
      doctor,
      appointmentDate,
      appointmentTime,
      reason,
    });

    res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      appointment,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};*/

/*
==========================================================
Patient Appointments
GET /api/appointments/my
Private (Patient)
==========================================================
*/

exports.getMyAppointments = async (req, res) => {

  try {

    const appointments = await Appointment.find({
      patient: req.user.id,
    })
      .populate({
        path: "doctor",
        populate: {
          path: "user",
          select: "-password",
        },
      })
      .sort({
        appointmentDate: -1,
      });

    res.status(200).json({

      success: true,

      count: appointments.length,

      appointments,

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
Doctor Appointments
GET /api/appointments/doctor
Private (Doctor)
==========================================================
*/

exports.getDoctorAppointments = async (req, res) => {

  try {

    const doctor = await Doctor.findOne({
      user: req.user.id,
    });

    if (!doctor) {

      return res.status(404).json({

        success: false,

        message: "Doctor profile not found",

      });

    }

    const appointments = await Appointment.find({

      doctor: doctor._id,

    })
      .populate("patient", "-password")
      .sort({
        appointmentDate: -1,
      });

    res.status(200).json({

      success: true,

      count: appointments.length,

      appointments,

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
Admin - All Appointments
GET /api/appointments
Private (Admin)
==========================================================
*/

exports.getAllAppointments = async (req, res) => {

  try {

    const appointments = await Appointment.find()
      .populate("patient", "-password")
      .populate({
        path: "doctor",
        populate: {
          path: "user",
          select: "-password",
        },
      })
      .sort({
        createdAt: -1,
      });

    res.status(200).json({

      success: true,

      count: appointments.length,

      appointments,

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
Get Appointment By ID
GET /api/appointments/:id
==========================================================
*/

exports.getAppointmentById = async (req, res) => {

  try {

    const appointment = await Appointment.findById(req.params.id)
      .populate("patient", "-password")
      .populate({
        path: "doctor",
        populate: {
          path: "user",
          select: "-password",
        },
      });

    if (!appointment) {

      return res.status(404).json({

        success: false,

        message: "Appointment not found",

      });

    }

    res.status(200).json({

      success: true,

      appointment,

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
Update Appointment Status
PUT /api/appointments/status/:id
Private (Doctor/Admin)
==========================================================
*/

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

/*
==========================================================
Cancel Appointment
PUT /api/appointments/cancel/:id
Private (Patient)
==========================================================
*/

exports.cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    if (appointment.patient.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    appointment.status = "Cancelled";

    await appointment.save();

    res.status(200).json({
      success: true,
      message: "Appointment cancelled successfully",
      appointment,
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
Upload Medical Report
PUT /api/appointments/report/:id
==========================================================
*/

exports.uploadReport = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a report",
      });
    }

    appointment.reportFile = req.file.filename;

    await appointment.save();

    res.status(200).json({
      success: true,
      message: "Medical report uploaded",
      appointment,
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
Upload Prescription
PUT /api/appointments/prescription/:id
==========================================================
*/

exports.uploadPrescription = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload prescription",
      });
    }

    appointment.prescription = req.file.filename;
    appointment.status = "Completed";

    await appointment.save();

    res.status(200).json({
      success: true,
      message: "Prescription uploaded successfully",
      appointment,
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
Dashboard Statistics
GET /api/appointments/dashboard
Private (Admin)
==========================================================
*/

exports.dashboardStats = async (req, res) => {
  try {
    const totalAppointments = await Appointment.countDocuments();

    const pendingAppointments = await Appointment.countDocuments({
      status: "Pending",
    });

    const confirmedAppointments = await Appointment.countDocuments({
      status: "Confirmed",
    });

    const completedAppointments = await Appointment.countDocuments({
      status: "Completed",
    });

    const cancelledAppointments = await Appointment.countDocuments({
      status: "Cancelled",
    });

    const totalDoctors = await Doctor.countDocuments();

    const totalPatients = await require("../models/User").countDocuments({
      role: "patient",
    });

    res.status(200).json({
      success: true,
      dashboard: {
        totalDoctors,
        totalPatients,
        totalAppointments,
        pendingAppointments,
        confirmedAppointments,
        completedAppointments,
        cancelledAppointments,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};