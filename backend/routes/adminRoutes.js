const express = require("express");
const router = express.Router();

const {
  getDashboard,
  getAllPatients,
  deletePatient,
} = require("../controllers/adminController");

const { verifyToken } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

router.get(
  "/dashboard",
  verifyToken,
  authorizeRoles("admin"),
  getDashboard
);

router.get(
  "/patients",
  verifyToken,
  authorizeRoles("admin"),
  getAllPatients
);

router.delete(
  "/patients/:id",
  verifyToken,
  authorizeRoles("admin"),
  deletePatient
);

module.exports = router;