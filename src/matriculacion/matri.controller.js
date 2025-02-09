import Matricularse from '../matriculacion/matri.model.js';
import Curso from '../curse/curse.model.js';

export const matricularse = async (req, res) => {
  const { userId, courseId } = req.body;

  try {
    const matricularse = await Matricularse.find({ userId });
    if (matricularse.length >= 3) {
      return res.status(400).json({
        success: false,
        message: "No puedes matricularte en más de 3 cursos",
      });
    }

    const newMatriculacion = new Matricularse({ userId, courseId });
    await newMatriculacion.save();

    return res.status(201).json({
      success: true,
      message: "Matriculado en el curso exitosamente",
      matricularse: newMatriculacion,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error al matricularse",
      error: err.message,
    });
  }
};

export const desMatricularse = async (req, res) => {
  const { userId, courseId } = req.body;

  try {
    const matricularse = await Matricularse.findOneAndDelete({ userId, courseId });
    if (!matricularse) {
      return res.status(404).json({
        success: false,
        message: "No estás matriculado en este curso",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Desmatriculado del curso exitosamente",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error al desmatricularse",
      error: err.message,
    });
  }
};

export const cursosPorAlumno = async (req, res) => {
    const { userId } = req.params;  
    try {
      const matricularse = await Matricularse.find({ userId }).populate('courseId');
      
      if (!matricularse.length) {
        return res.status(404).json({
          success: false,
          message: "No tienes cursos matriculados",
        });
      }
  
      return res.status(200).json({
        success: true,
        message: "Cursos matriculados encontrados",
        courses: matricularse,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Error al recuperar los cursos matriculados",
        error: err.message,
      });
    }
  };