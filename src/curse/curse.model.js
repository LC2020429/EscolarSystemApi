import { Schema } from "mongoose";
const curseSchema = Schema({
    curseName: {
      type: String,
      required: [true, "Name collage is requierd"],
      maxLength: [30, "Name collage can not exced 30 characters"],
    },
    curseDescription: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    curseTeacher: {
      type: String,
      required: [true, "Password is required"],
    },
    curseStatus: {
      type: Boolean,
      default: true,
    }
  });
  