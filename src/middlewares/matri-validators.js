import Matricularse from '../matriculacion/matri.model.js';
import Curso from '../curse/curse.model.js';

export const cantidadMatri = async (req, res, next) => {
  const { userId } = req.body;

  const matricularse = await Matricularse.find({ userId });
  if (matricularse.length >= 3) {
    return res.status(400).json({
      success: false,
      message: "No puedes matricularte en más de 3 cursos",
    });
  }
  next();
};

export const cursoExiste = async (req, res, next) => {
  const { courseId } = req.body;

  const course = await Curso.findById(courseId);
  if (!course) {
    return res.status(404).json({
      success: false,
      message: "Curso no encontrado",
    });
  }
  next();
};