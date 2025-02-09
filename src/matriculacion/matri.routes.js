import express from "express";
import {
  matricularse,
  desMatricularse,
  cursosPorAlumno,
} from "../matriculacion/matri.controller.js";
import { cantidadMatri, cursoExiste } from "../middlewares/matri-validators.js";

const router = express.Router();

router.post("/matricularse", cantidadMatri, cursoExiste, matricularse);
router.delete("/desmatricularse", desMatricularse);
router.get("/misCursos/:userId", cursosPorAlumno);
export default router;
