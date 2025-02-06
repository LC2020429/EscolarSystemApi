import { body, check } from "express-validator";
import { emailExists, userExists } from "../helpers/userDB-validators.js|s";
import { validarCampos } from "./validar-campos.js";
import { deleteFileOnError } from "./delete-file-on-error.js";

export const registerValidator = [
    body("name").not().isEmpty().withMessage("Name is required"),
    body("email").not().isEmpty().withMessage("Email is required"),
    body("email").isEmail().withMessage("Invalid email"),
    body("email").custom(emailExists),
    body("password").isStrongPassword({
        minLength: 8,
        minLowercase:1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }),
    validarCampos
]

export const loginValidator = [
    body("email").optional().isEmail().withMessage("Invalid email"),
    body("password").isLength({min: 4}).withMessage("El password debe contener al menos 8 caracteres"),
    validarCampos
]

export const getUserByIdValidator = [
    check("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    check("uid").custom(userExists),
    validarCampos,
    deleteFileOnError
]

export const deleteUserValidator = [
    check("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    check("uid").custom(userExists),
    validarCampos,
    deleteFileOnError
]

export const updatePasswordValidator = [
    check("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    check("uid").custom(userExists),
    body("newPassword").isLength({min: 8}).withMessage("El password debe contener al menos 8 caracteres"),
    validarCampos,
    deleteFileOnError
]