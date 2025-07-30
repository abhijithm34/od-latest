const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    registerNo: {
      type: String,
      required: true,
      unique: true,
    },
    yearOfJoin: {
      type: Number,
      required: true,
    },
    department: {
      type: String,
      required: true,
      default: "CSE",
    },
    facultyAdvisor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Virtual field to calculate current year based on year of joining
studentSchema.virtual("currentYear").get(function () {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // January is 0

  // Calculate years since joining
  let yearsSinceJoining = currentYear - this.yearOfJoin;

  // If current month is before July (month 7), reduce by 1 year
  // This means students are still in the previous academic year until July
  if (currentMonth < 7) {
    yearsSinceJoining -= 1;
  }

  // Ensure minimum of 1st year and maximum of 4th year
  const currentYearOfStudy = Math.max(1, Math.min(4, yearsSinceJoining + 1));

  // Convert to ordinal format (1st, 2nd, 3rd, 4th)
  const ordinalSuffixes = ["", "st", "nd", "rd", "th"];
  return `${currentYearOfStudy}${ordinalSuffixes[currentYearOfStudy]}`;
});

// Ensure virtual fields are included when converting to JSON
studentSchema.set("toJSON", { virtuals: true });
studentSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("Student", studentSchema);
