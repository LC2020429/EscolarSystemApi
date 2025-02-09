import { body, param } from "express-validator";
import {
  correoExist,
  userExists,
  usernameExists,
} from "../helpers/db-validators.js";
import { validarCampos } from "./validate-fields.js";
import { deleteFileOnError } from "./delete-file-on-error.js";
import { handleErrors } from "./handle-errors.js";

export const registerValidatorAdmin = [
  body("nombreUser").notEmpty().withMessage("El nombre es requerido"),
  body("apellidoUser").notEmpty().withMessage("El username es requerido"),
  body("correo").notEmpty().withMessage("El email es requerido"),
  body("correo").isEmail().withMessage("No es un email válido"),
  body("correo").custom(correoExist),
  body("username").custom(usernameExists),
  body("password")
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      "La contrasena necesita min 8 caracteres 1 mayuscula y 1 caracter especial"
    ),
  validarCampos,
  deleteFileOnError,
  handleErrors,
];

export const registerValidator = [
  body("nombreUser").notEmpty().withMessage("El nombre es requerido"),
  body("apellidoUser").notEmpty().withMessage("El username es requerido"),
  body("correo").notEmpty().withMessage("El email es requerido"),
  body("correo").isEmail().withMessage("No es un email válido"),
  body("correo").custom(correoExist),
  body("role").default("Estudiante"),
  body("username").custom(usernameExists),
  body("password")
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      "La contrasena necesita min 8 caracteres 1 mayuscula y 1 caracter especial"
    ),
  (req, res, next) => {
    // Elimina el campo role si existe en la solicitud
    if (req.body.role) {
      delete req.body.role;
    }
    req.body.role = "Estudiante";
    next();
  },
  validarCampos,
  deleteFileOnError,
  handleErrors,
];

export const loginValidator = [
  body("email").optional().isEmail().withMessage("No es un email válido"),
  body("username")
    .optional()
    .isString()
    .withMessage("Username es en formáto erróneo"),
  body("password")
    .isLength({ min: 4 })
    .withMessage("El password debe contener al menos 8 caracteres"),
  validarCampos,
  handleErrors,
];

export const getUserByIdValidator = [
  param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
  param("uid").custom(userExists),
  validarCampos,
  handleErrors,
];

export const deleteUserValidator = [
  param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
  param("uid").custom(userExists),
  validarCampos,
  handleErrors,
];

export const updatePasswordValidator = [
  param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
  param("uid").custom(userExists),
  body("newPassword")
    .isLength({ min: 8 })
    .withMessage("El password debe contener al menos 8 caracteres"),
  validarCampos,
  handleErrors,
];

export const updateUserValidator = [
  param("uid", "No es un ID válido").isMongoId(),
  param("uid").custom(userExists),
  validarCampos,
  handleErrors,
];
