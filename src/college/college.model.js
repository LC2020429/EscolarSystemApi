import { Schema, model } from "mongoose";

const collegeSchema = Schema({
  collegeName: {
    type: String,
    required: [true, "Name collage is requierd"],
    maxLength: [30, "Name collage can not exced 30 characters"],
  },
  collegeEmail: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  AdminCollegePassword: {
    type: String,
    required: [true, "Password is required"],
  },
  collegeStatus: {
    type: Boolean,
    default: true,
  }
});
