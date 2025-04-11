const express = require("express");

// 🚓 routes
const usuarioRoutes = require ("./routes/usuario.routes.js");
const servicioRoutes = require ("./routes/servicio.routes.js");

const app = express();
app.use(express.json());
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/servicios', servicioRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ API corriendo en http://localhost:${PORT}`);
});