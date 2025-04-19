const { Router } = require("express");
const ModeloServicio = require("../models/servicio.model.js");
const router = Router();
const authenticate = require("../utils/authenticate.js");

//obtener todos los servicios de un usuario ,
router.get("/", async (req, res) => {
  try {
    const servicios = await ModeloServicio.getServicios();
    res.json(servicios);
  } catch (err) {
    console.error("Error al obtener servicios:", err);
    res.status(500).json({ error: "Error al obtener servicios" });
  }
});

router.get("/id", authenticate, async (req, res) => {
  try {
    const servicios = await ModeloServicio.getServiciosByUsuario(req.user.id_usuario);
    res.json(servicios);
  } catch (err) {
    console.error("Error al obtener servicios:", err);
    res.status(500).json({ error: "Error al obtener servicios" });
  }
});

// Publicar servicio (POST)
router.post("/", authenticate, async (req, res) => {
  try {
    const { id_profesional, titulo, descripcion, precio, tiempo_entrega, estado, destacado } = req.body;
    const nuevoServicio = await ModeloServicio.createServicio({ id_profesional, titulo, descripcion, precio, tiempo_entrega, estado, destacado });
    res.status(201).json(nuevoServicio);
  } catch (err) {
    console.error("Error al crear servicio:", err);
    res.status(500).json({ error: "Error al crear servicio" });
  }
});
// Editar servicio (PUT)
router.put("/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { id_profesional, titulo, descripcion, precio, tiempo_entrega, estado, destacado } = req.body;
    const servicioActualizado = await ModeloServicio.updateServicio({ id_servicio: id, id_profesional, titulo, descripcion, precio, tiempo_entrega, estado, destacado });
    res.json(servicioActualizado);
  } catch (err) {
    console.error("Error al actualizar servicio:", err);
    res.status(500).json({ error: "Error al actualizar servicio" });
  }
});

// Eliminar servicio (DELETE)
router.delete("/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const servicioEliminado = await ModeloServicio.deleteServicio(id);
    if (!servicioEliminado) {
      return res.status(404).json({ error: "Servicio no encontrado" });
    }
    res.json(servicioEliminado);
  } catch (err) {
    console.error("Error al eliminar servicio:", err);
    res.status(500).json({ error: "Error al eliminar servicio" });
  }
});

module.exports = router;