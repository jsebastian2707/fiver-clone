const { Router } = require("express");
const ModeloServicio = require("../models/servicio.model.js");
const router = Router();
const authenticate = require("../utils/authenticate.js");


router.get("/", async (req, res) => {
  try {
    const servicios = await ModeloServicio.getServicios();
    const serviciosFiltrados = servicios
      .filter((s) => s.estado === "activo")
      .sort((a, b) => (b.destacado === a.destacado ? 0 : b.destacado ? 1 : -1))
      .map(({ estado, ...rest }) => rest);
    res.json(serviciosFiltrados);
  } catch (err) {
    console.error("Error al obtener servicios:", err);
    res.status(500).json({ error: "Error al obtener servicios" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const servicio = await ModeloServicio.getServicioById(req.params.id); // Esta función debe existir
    if (!servicio) {
      return res.status(404).json({ error: "Servicio no encontrado" });
    }
    res.json(servicio);
  } catch (err) {
    console.error("Error al obtener servicio:", err);
    res.status(500).json({ error: "Error al obtener servicio" });
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