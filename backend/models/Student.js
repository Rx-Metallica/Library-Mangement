import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    studentId: {
      type: String,
      required: true,
      unique: true
    },
    fullName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    phone: {
      type: String
    },
    department: {
      type: String,
      required: true
    },
    yearOfStudy: {
      type: Number,
      required: true,
      min: 1,
      max: 6
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

const StudentModel = mongoose.models.Student || mongoose.model("Student", studentSchema);
export default StudentModel;
