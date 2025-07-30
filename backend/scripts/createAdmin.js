const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User"); // Adjust path as needed

const MONGO_URI = "mongodb://localhost:27017/odapplication"; // Change to your DB

async function createAdmin() {
  await mongoose.connect(MONGO_URI);

  const userId = "admin1@gmail.com"; // Unique identifier for the admin
  const name = "Admin1";
  const email = "admin1@gmail.com";
  const password = "admin1234";
  const role = "admin";

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Check if admin already exists
  const exists = await User.findOne({ email });
  if (exists) {
    console.log("Admin already exists!");
    process.exit(0);
  }

  const admin = new User({
    userId: "admin1", // <-- Add this line
    name,
    email,
    password: hashedPassword,
    role,
  });

  await admin.save();
  console.log("Admin user created!");
  process.exit(0);
}

createAdmin();
