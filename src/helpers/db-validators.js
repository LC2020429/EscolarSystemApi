import User from "../user/user.model.js";

export const correoExist = async (correo = "") => {
  const existe = await User.findOne({ correo });
  if (existe) {
    throw new Error(`El correo ${correo} ya esta registrado`);
  }
};
export const userExists = async (uid = " ") => {
  const existe = await User.findById(uid);
  if (!existe) {
    throw new Error("No existe el usuario con el ID proporcionado");
  }
};

export const usernameExists = async (username = "") => {
  const existe = await User.findOne({ username });
  if (existe) {
    throw new Error(`The username ${username} is already registered`);
  }
};
