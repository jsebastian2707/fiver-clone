const express = require("express");

// 🚓 routes
const usuariosRoutes = require ("./routes/usuarios.routes.js");

const app = express();
app.use(express.json());
app.use('/api/usuarios', usuariosRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ API corriendo en http://localhost:${PORT}`);
});