const express = require("express");
const cors = require('cors');
// 🚓 routes
const usuarioRoutes = require ("./routes/usuario.routes.js");
const servicioRoutes = require ("./routes/servicio.routes.js");

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/servicios', servicioRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ API corriendo en http://localhost:${PORT}`);
});