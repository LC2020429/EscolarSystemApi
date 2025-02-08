import { hash, verify } from "argon2";
import User from "../user/user.model.js";
import { generateJWT } from "../helpers/generate-jwt.js";

export const register = async (req, res) => {
  try {
    const data = req.body;
    let profilePicture = req.file ? req.file.filename : null;
    const encryptedPassword = await hash(data.password);
    data.password = encryptedPassword;
    data.profilePicture = profilePicture;

    const user = await User.create(data);

    return res.status(201).json({
      message: "User has been created",
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    return res.status(500).json({
      message: "User registration failed",
      error: err.message,
    });
  }
};

export const login = async (req, res) => {
  console.log("Request body:", req.body); // Verifica qué datos llegan

  const { email, username, password } = req.body;

  if (!password) {
    return res.status(400).json({
      message: "El password no fue enviado",
    });
  }

  try {
    const user = await User.findOne({
      $or: [{ correo: email }, { userName: username }],
    });

    if (!user) {
      return res.status(400).json({
        message: "Credenciales inválidas",
        error: "No existe el usuario o correo ingresado",
      });
    }

    console.log("User found:", user); // Verifica si el usuario existe

    // Asegúrate de que el valor de user.password sea correcto
    console.log("Password in DB (encrypted):", user.password);

    const validPassword = await verify(user.password, password);

    console.log("Password received:", password); // Verifica la contraseña que llega
    console.log("Password valid:", validPassword); // Verifica si la contraseña es correcta

    if (!validPassword) {
      return res.status(400).json({
        message: "Credenciales inválidas",
        error: "Contraseña incorrecta",
      });
    }

    const token = await generateJWT(user.id);

    return res.status(200).json({
      message: "Login successful",
      username: user.userName, 
    });
  } catch (err) {
    return res.status(500).json({
      message: "Login failed, server error",
      error: err.message,
    });
  }
};