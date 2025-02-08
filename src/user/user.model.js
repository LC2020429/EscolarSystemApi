import { Schema, model } from "mongoose";

const userSchema = Schema(
  {
    nombreUser: {
      type: String,
      required: [true, "El nombre es necesario"],
      maxLength: [30, "El nombre no puede exceder los 30 caracteres"],
    },
    apellidoUser: {
      type: String,
      required: [true, "Los apellidos son requeridos"],
      maxLength: [30, "Los apellidos no pueden exceder los 30 caracteres"],
    },
    userName: {
      type: String,
      required: [true, "UserName es obligatorio"],
    },
    correo: {
      type: String,
      required: [true, "El correo es obligatorio"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Se necesita una contraseña"],
    },
    tel: {
      type: String,
      minLength: 8,
      maxLength: 8,
      required: true,
    },
    profilePicture: {
      type: String,
    },
    role: {
      type: String,
      required: true,
      enum: ["Profesor", "Estudiante"],
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.methods.toJSON = function () {
  const { password, _id, ...usuario } = this.toObject();
  usuario.uid = _id;
  return usuario;
};

export default model("User", userSchema);
