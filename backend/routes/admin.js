const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { protect } = require("../middleware/authMiddleware");
const multer = require("multer");
const XLSX = require("xlsx");
const fs = require("fs");
const Student = require("../models/Student");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const upload = multer({ dest: "uploads/" });

// Default system settings
let systemSettings = {
  responseTimeout: 30,
  autoForwardEnabled: true,
  notificationEnabled: true,
};

// @desc    Get system settings
// @route   GET /api/admin/system-settings
// @access  Private/Admin
router.get(
  "/system-settings",
  protect,
  asyncHandler(async (req, res) => {
    if (req.user.role !== "admin") {
      res.status(401);
      throw new Error("Not authorized as admin");
    }
    res.json(systemSettings);
  })
);

// @desc    Update system settings
// @route   PUT /api/admin/system-settings
// @access  Private/Admin
router.put(
  "/system-settings",
  protect,
  asyncHandler(async (req, res) => {
    if (req.user.role !== "admin") {
      res.status(401);
      throw new Error("Not authorized as admin");
    }

    const { responseTimeout, autoForwardEnabled, notificationEnabled } =
      req.body;

    if (responseTimeout < 10 || responseTimeout > 300) {
      res.status(400);
      throw new Error("Response timeout must be between 10 and 300 seconds");
    }

    systemSettings = {
      responseTimeout,
      autoForwardEnabled,
      notificationEnabled,
    };

    res.json(systemSettings);
  })
);

// @desc    Bulk register students
// @route   POST /api/admin/bulk-register-students
// @access  Private/Admin
router.post(
  "/bulk-register-students",
  protect,
  upload.single("file"),
  asyncHandler(async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const workbook = XLSX.readFile(req.file.path);
      const sheetName = workbook.SheetNames[0];
      const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

      for (const row of data) {
        // Find faculty advisor
        const facultyAdvisorUser = await User.findOne({
          name: row.facultyAdvisor,
          role: "faculty",
        });

        if (!facultyAdvisorUser) {
          console.warn(`Faculty advisor not found: ${row.facultyAdvisor}`);
          continue;
        }

        // Check or create user
        let user = await User.findOne({ email: row.email });
        if (!user) {
          user = new User({
            name: row.name,
            email: row.email,
            password: row.password || "defaultpassword", // <-- Plain password
            role: "student",
            registerNo: row.registerNo,
            userId: new mongoose.Types.ObjectId().toString(),
          });

          await user.save();
        }

        if (!user || !user._id) {
          console.error(`User not created properly for email: ${row.email}`);
          continue;
        }

        // Check or create student
        let student = await Student.findOne({ registerNo: row.registerNo });
        if (!student) {
          student = new Student({
            name: row.name,
            registerNo: row.registerNo,
            yearOfJoin: row.yearOfJoin,
            department: row.department,
            facultyAdvisor: facultyAdvisorUser._id,
            userId: user._id,
          });

          try {
            await student.save();
          } catch (err) {
            console.error(`Error saving student ${row.name}:`, err.message);
            continue;
          }
        }
      }

      // Cleanup uploaded file
      fs.unlinkSync(req.file.path);

      res.json({ message: "Students registered successfully" });
    } catch (err) {
      console.error("Bulk registration error:", err.message);
      res.status(500).json({ message: "Bulk registration failed" });
    }
  })
);

module.exports = router;
