const express = require("express");
const router = express.Router();

const {
  createDoctor,
  getDoctors,
  getDoctor,
  updateDoctor,
  deleteDoctor,
  verifyDoctor,
  searchDoctors,
  filterDoctors,
  sortDoctors,
  getMyDoctorProfile,
  getDoctorDashboard,
} = require("../controllers/doctorController");

const { verifyToken } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

/*
==================================================
PUBLIC ROUTES
==================================================
*/

// Get all doctors
router.get("/", getDoctors);

// Search doctors
router.get("/search", searchDoctors);

// Filter doctors
router.get("/filter", filterDoctors);

// Sort doctors
router.get("/sort", sortDoctors);

/*
==================================================
DOCTOR ROUTES
==================================================
*/

// Get logged-in doctor's profile
router.get(
  "/my-profile",
  verifyToken,
  authorizeRoles("doctor"),
  getMyDoctorProfile
);

// Doctor Dashboard
router.get(
  "/dashboard",
  verifyToken,
  authorizeRoles("doctor"),
  getDoctorDashboard
);

// Create doctor profile
router.post(
  "/",
  verifyToken,
  authorizeRoles("doctor"),
  createDoctor
);

// Update doctor profile
router.put(
  "/:id",
  verifyToken,
  authorizeRoles("doctor"),
  updateDoctor
);

/*
==================================================
ADMIN ROUTES
==================================================
*/

// Verify doctor
router.put(
  "/verify/:id",
  verifyToken,
  authorizeRoles("admin"),
  verifyDoctor
);

// Delete doctor
router.delete(
  "/:id",
  verifyToken,
  authorizeRoles("admin"),
  deleteDoctor
);

/*
==================================================
KEEP THIS LAST
==================================================
*/

// Get doctor by id
router.get("/:id", getDoctor);

module.exports = router;