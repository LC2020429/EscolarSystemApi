import User from "../models/user.model.js";

export const checkProfesorRoleById = async (req, res, next) => {
  try {
    const userId = req.params.uid;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "ID de usuario es requerido",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado",
      });
    }
    if (user.role !== "Profesor") {
      return res.status(403).json({
        success: false,
        message: "Acceso denegado, se requiere rol de Profesor",
      });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error al verificar el rol del usuario",
      error: err.message,
    });
  }
};
