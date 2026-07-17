const Doctor = require("../models/Doctor");
const User = require("../models/User");
const Appointment = require("../models/Appointment");

exports.getDashboard = async (req, res) => {
  try {

    const totalDoctors = await Doctor.countDocuments();

    const totalPatients = await User.countDocuments({
      role: "patient",
    });

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

    const recentAppointments = await Appointment.find()
      .populate("patient", "name")
      .populate({
        path: "doctor",
        populate: {
          path: "user",
          select: "name",
        },
      })
      .sort({ createdAt: -1 })
      .limit(10);

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
        recentAppointments,
      },
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

exports.getAllPatients = async (req, res) => {
    try {

        const patients = await User.find({ role: "patient" })
            .select("-password")
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            count: patients.length,
            patients
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

exports.deletePatient = async (req, res) => {

    try {

        const patient = await User.findById(req.params.id);

        if (!patient)
            return res.status(404).json({
                success:false,
                message:"Patient not found"
            });

        await patient.deleteOne();

        res.json({
            success:true,
            message:"Patient deleted"
        });

    } catch (error) {

        res.status(500).json({
            success:false,
            message:error.message
        });

    }

};