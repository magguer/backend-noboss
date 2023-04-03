const { Admin } = require("../models");
async function adminAuthenticated(req, res, next) {
  const admin = await Admin.findById(req.auth.adminId);

  if (admin) {
    return next();
  } else {
    // req.session.redirectTo = req.originalUrl;
    res.redirect("/login"); // Cambiar "/login" por la ruta a donde se quiere redirigir al usuario. También se puede dejar como está.
    res.json("Lo siento, no tienes credenciales de Administrador");
  }
}

module.exports = adminAuthenticated;
