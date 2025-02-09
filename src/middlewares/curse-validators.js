import User from "../user/user.model.js";
import Curso from "../curse/curse.model.js";

export const checkProfesorRoleById = async (req, res, next) => {
  try {
    const { userId } = req.body;
    console.log("userId recibido:", userId); // Para depuración

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "ID de usuario es requerido" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Usuario no encontrado" });
    }

    if (user.role !== "Profesor") {
      return res.status(403).json({
        success: false,
        message: "Acceso denegado, solo profesores pueden realizar esta acción",
      });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error en la autenticación",
      error: err.message,
    });
  }
};

export const checkCursoOwnership = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const { uid } = req.params;

    const curso = await Curso.findById(uid);

    if (!curso) {
      return res
        .status(404)
        .json({ success: false, message: "Curso no encontrado" });
    }

    if (curso.createdBy.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "No tienes permisos para modificar este curso",
      });
    }

    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error en la validación",
      error: err.message,
    });
  }
};
