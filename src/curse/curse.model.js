import { Schema, model } from "mongoose";

const curseSchema = new Schema({
  nombreCurso: {
    type: String,
    required: [true, "El nombre del curso es necesario"],
    maxLength: [30, "El nombre no puede exceder los 30 caracteres"],
  },
  descripCurso: {
    type: String,
    required: [true, "Una descripción es requerida"],
    maxLength: [100, "La descripción no puede exceder los 100 caracteres"],
  },
  status: {
    type: Boolean,
    default: true,
  },
  cupoCurso: {
    type: Number,
    required: [true, "Capacidad de alumnos es requerida"],
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
}, 
{
  versionKey: false,
  timestamps: true,
});

export default model("Curso", curseSchema);
