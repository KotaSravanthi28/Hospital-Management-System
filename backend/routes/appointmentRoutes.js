const express = require("express");
const router = express.Router();

const {
  bookAppointment,
  getMyAppointments,
  getDoctorAppointments,
  getAllAppointments,
  getAppointmentById,
  updateAppointmentStatus,
  cancelAppointment,
  uploadReport,
  uploadPrescription,
  dashboardStats,
} = require("../controllers/appointmentController");

const { verifyToken } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

const upload = require("../middleware/uploadMiddleware");

/*
=====================================================
Patient Routes
=====================================================
*/

// Book Appointment
router.post(
  "/book",
  verifyToken,
  authorizeRoles("patient"),
  bookAppointment
);

// My Appointments
router.get(
  "/my",
  verifyToken,
  authorizeRoles("patient"),
  getMyAppointments
);

// Cancel Appointment
router.put(
  "/cancel/:id",
  verifyToken,
  authorizeRoles("patient"),
  cancelAppointment
);

/*
=====================================================
Doctor Routes
=====================================================
*/

// Doctor Appointments
router.get(
  "/doctor",
  verifyToken,
  authorizeRoles("doctor"),
  getDoctorAppointments
);

// Update Appointment Status
router.put(
  "/status/:id",
  verifyToken,
  authorizeRoles("doctor", "admin"),
  updateAppointmentStatus
);

// Upload Medical Report
router.put(
  "/report/:id",
  verifyToken,
  authorizeRoles("doctor"),
  upload.single("report"),
  uploadReport
);

// Upload Prescription
router.put(
  "/prescription/:id",
  verifyToken,
  authorizeRoles("doctor"),
  upload.single("prescription"),
  uploadPrescription
);

/*
=====================================================
Admin Routes
=====================================================
*/

// Dashboard Statistics
router.get(
  "/dashboard",
  verifyToken,
  authorizeRoles("admin"),
  dashboardStats
);

// All Appointments
router.get(
  "/",
  verifyToken,
  authorizeRoles("admin"),
  getAllAppointments
);

/*
=====================================================
Common Route
=====================================================
*/

// Appointment By ID
router.get(
  "/:id",
  verifyToken,
  getAppointmentById
);

module.exports = router;