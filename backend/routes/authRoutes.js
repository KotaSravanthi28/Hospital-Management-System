const express = require("express");
const router = express.Router();

const {
  register,
  login,
} = require("../controllers/authController");

const {
  verifyToken,
} = require("../middleware/authMiddleware");

const { authorizeRoles } = require("../middleware/roleMiddleware");

router.post("/register", register);

router.post("/login", login);

router.get("/profile", verifyToken, (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});

router.get(
  "/patient",
  verifyToken,
  authorizeRoles("patient"),
  (req, res) => {
    res.json({
      success: true,
      message: "Welcome Patient",
    });
  }
);

router.get(
  "/doctor",
  verifyToken,
  authorizeRoles("doctor"),
  (req, res) => {
    res.json({
      success: true,
      message: "Welcome Doctor",
    });
  }
);

router.get(
  "/admin",
  verifyToken,
  authorizeRoles("admin"),
  (req, res) => {
    res.json({
      success: true,
      message: "Welcome Admin",
    });
  }
);



module.exports = router;