const userSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      maxLength: [25, "Name cannot exceed 25 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    profilePicture: {
      type: String,
    },
    role: {
      type: String,
      required: true,
      enum: ["ADMIN_ROLE", "USER_ROLE"],
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
  const { __v, password, _id, ...usuario } = this.toObject();
  usuario.uid = _id;
  return usuario;
};

export default model("User", userSchema);
