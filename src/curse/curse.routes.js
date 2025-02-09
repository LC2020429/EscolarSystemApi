import { Router } from "express";
import {
  checkProfesorRoleById,
  checkCursoOwnership,
} from "../middlewares/curse-validators.js";
import {
  createCurso,
  updateCurso,
  deleteCurso,
  getCursos,
  getCursoById,
} from "./curse.controller.js";

const router = Router();

router.get("/", getCursos);

router.get("/:uid", getCursoById);

router.post(
  "/create",
  (req, res, next) => {
    console.log("Body de la solicitud:", req.body); // Para ver qué se está enviando
    next();
  },  checkProfesorRoleById,  createCurso
);

router.put(
  "/update/:uid",
  checkProfesorRoleById,
  checkCursoOwnership,
  updateCurso
);

router.delete(
  "/delete/:uid",
  checkProfesorRoleById,
  checkCursoOwnership,
  deleteCurso
);

export default router;
