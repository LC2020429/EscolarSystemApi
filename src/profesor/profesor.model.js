import { Schema, model } from "mongoose";

const profesorSchema = Schema({
  profesorName: {
    type: String,
    required: [true, "Name collage is requierd"],
    maxLength: [30, "Name collage can not exced 30 characters"],
  },
  profesorEmail: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  profesorCurses: {
    type: String,
    required: [true, "Password is required"],
  },
  profesorPassword:{
    type: String,
    required: [true, "Passwoed is required"],
  }
});
