import { Schema, model } from "moongose";

const userSchema = Schema(
  {
    nombreUser: {
      type: String,
      requiered: [true, "El nombre es necesario"],
      maxLength: [30, "El nombre no puede exceder los 30 caracteres"],
    },
    apellidoUser: {
      type: String,
      requiered: [true, "Los apellido son requeridos"],
      maxLength: [30, "Los apellidos no pueden exceder los 30 caracteres"],
    },
    userName: {
      typre: String,
      require: [true, "UserName es obligatorios"],
    },
    correo: {
      type: String,
      required: [true, "El correo es obligatorio"],
      unique: true,
    },
    password: {
      type: String,
      requiered: [true, "Se necesita una contraseña"],
    },
    tel: {
      type: String,
      minLength: 8,
      maxLength: 8,
      requiered: true,
    },
    profilePicture: {
      type: String,
    },
    role: {
      type: String,
      requiered: true,
      enum: ["Profesor", "Estudent"],
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    versionKey: false,
    timeStamps: true,
  }
);

userSchema.methods.toJSON = function () {
  const { password, _id, ...usuario } = this.toObject();
  usuario.uid = _id;
  return usuario;
};

export default model("User", userSchema);
