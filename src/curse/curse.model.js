import { Schema, model } from "mongoose";
const userSchema = Schema({
  nombreCurso: {
    type: String,
    required: [true, "El nombre del curso es necesario"],
    maxLength: [30, "El nombre no puede exceder los 30 caracteres"],
  },
  descripCurso: {
    type: String,
    required: [true, "Una descripcion es requerida"],
    maxLength: [100, "Los apellidos no pueden exceder los 100 caracteres"],
  },
  status: {
    type: Boolean,
    default: true,
  },
  cupoCurso: {
    type: Number,
    required: [true, "Capacidad de alumnos"],
  },
});
