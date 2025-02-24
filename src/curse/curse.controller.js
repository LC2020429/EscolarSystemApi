import Curso from "./curse.model.js";

export const getCursos = async (req, res) => {
  try {
    const { limite = 10, desde = 0 } = req.query;
    const query = { status: true };

    const [total, cursos] = await Promise.all([
      Curso.countDocuments(query),
      Curso.find(query).skip(Number(desde)).limit(Number(limite)),
    ]);

    return res.status(200).json({ success: true, total, cursos });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error al obtener los cursos",
      error: err.message,
    });
  }
};

export const getCursoById = async (req, res) => {
  try {
    const { uid } = req.params;
    const curso = await Curso.findById(uid);

    if (!curso || curso.status === false) {
      return res
        .status(404)
        .json({ success: false, message: "Curso no encontrado" });
    }

    return res.status(200).json({ success: true, curso });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error al obtener el curso",
      error: err.message,
    });
  }
};

export const createCurso = async (req, res) => {
  try {
    const { nombreCurso, descripCurso, cupoCurso } = req.body;
    const userId = req.user._id;

    if (!nombreCurso || !descripCurso || !cupoCurso) {
      return res.status(400).json({
        success: false,
        message: "Todos los campos son obligatorios",
      });
    }

    const nuevoCurso = new Curso({
      nombreCurso,
      descripCurso,
      cupoCurso,
      status: true,
      createdBy: userId,
    });

    await nuevoCurso.save();

    return res.status(201).json({
      success: true,
      message: "Curso creado exitosamente",
      curso: nuevoCurso,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error al crear el curso",
      error: err.message,
    });
  }
};

export const updateCurso = async (req, res) => {
  try {
    const { uid } = req.params;
    const { nombreCurso, descripCurso, cupoCurso } = req.body;

    if (!nombreCurso || !descripCurso || !cupoCurso) {
      return res.status(400).json({
        success: false,
        message: "Todos los campos son obligatorios",
      });
    }
    const cursoActual = await Curso.findById(uid);
    if (!cursoActual) {
      return res.status(404).json({
        success: false,
        message: "Curso no encontrado",
      });
    }
    if (cupoCurso < cursoActual.cupoCurso) {
      return res.status(400).json({
        success: false,
        message: "El cupo no puede ser reducido",
      });
    }
    const updatedCurso = await Curso.findByIdAndUpdate(
      uid,
      { nombreCurso, descripCurso, cupoCurso },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Curso actualizado exitosamente",
      curso: updatedCurso,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error al actualizar el curso",
      error: err.message,
    });
  }
};

export const deleteCurso = async (req, res) => {
  try {
    const { uid } = req.params;

    const curso = await Curso.findById(uid);

    if (!curso) {
      return res
        .status(404)
        .json({ success: false, message: "Curso no encontrado" });
    }

    curso.status = false;
    await curso.save();

    return res
      .status(200)
      .json({ success: true, message: "Curso eliminado correctamente", curso });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error al eliminar el curso",
      error: err.message,
    });
  }
};
