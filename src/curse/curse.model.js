import { Schema } from "mongoose";
const curseSchema = Schema({
  curseName: {
    type: String,
    required: [true, "Name curse is requierd"],
    maxLength: [30, "Name curse can not exced 30 characters"],
  },
  curseDescription: {
    type: String,
    required: [true, "curse description is required"],
    maxLength: [30, "description can not exced 30 characters"],
    unique: true,
  },
  curseTeacher: {
    type: String,
    required: [true, "Password is required"],
  },
  fullQuota: {
    type: Number,
    required: [true, "This course need a max of students"]
  },
  curseStatus: {
    type: Boolean,
    default: true,
  }  
});
