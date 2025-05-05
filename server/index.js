const express = require("express");
const cors = require('cors');
const apiRouter = express.Router();
// 🚓 routes
const usuarioRoutes = require ("./routes/usuario.routes.js");
const profesionalRoutes = require ("./routes/profesional.routes.js");
const servicioRoutes = require ("./routes/servicio.routes.js");
const reseñaRoutes = require ("./routes/reseña.routes.js");
const pedidoRoutes = require ("./routes/pedido.routes.js");
const app = express();
app.use(cors());
app.use(express.json());

apiRouter.use('/usuarios', usuarioRoutes);
apiRouter.use('/profesional', profesionalRoutes);
apiRouter.use('/servicios', servicioRoutes);
apiRouter.use('/reseña', reseñaRoutes);
apiRouter.use('/pedido', pedidoRoutes);

app.use('/api', apiRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ API corriendo en http://localhost:${PORT}`);
});