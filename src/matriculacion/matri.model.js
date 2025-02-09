import mongoose from "mongoose";

const matricularseEschema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Curso",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Matricularse = mongoose.model("Matricularse", matricularseEschema);
export default Matricularse;
