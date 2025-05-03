const { Router } = require("express");
const ModeloReseña = require('../models/reseña.model.js');
const authenticate = require("../utils/authenticate.js");

const router = Router();

// Obtener todas las reseñas (solo para admins, si deseas)
router.get("/", authenticate, async (req, res) => {
  try {
    const reseñas = await ModeloReseña.getReseñas();
    res.json(reseñas);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener reseñas" });
  }
});

// Obtener una reseña por ID
router.get("/:id", authenticate, async (req, res) => {
  try {
    const reseña = await ModeloReseña.getReseñaById(req.params.id);
    if (!reseña) return res.status(404).json({ error: "Reseña no encontrada" });
    res.json(reseña);
  } catch (err) {
    res.status(500).json({ error: "Error al buscar reseña" });
  }
});

// Crear una nueva reseña
router.post("/", authenticate, async (req, res) => {
  try {
    const { id_pedido, calificacion, comentario, fecha } = req.body;
    const id_cliente = req.user.id_usuario;

    const nuevaReseña = await ModeloReseña.createReseña({
      id_pedido,
      id_cliente,
      calificacion,
      comentario,
      fecha
    });

    res.status(201).json(nuevaReseña);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al crear reseña" });
  }
});

// Actualizar una reseña
router.put("/:id", authenticate, async (req, res) => {
  try {
    const { calificacion, comentario, fecha } = req.body;
    const reseñaActualizada = await ModeloReseña.updateReseña(req.params.id, {
      calificacion,
      comentario,
      fecha
    });

    if (!reseñaActualizada) {
      return res.status(404).json({ error: "Reseña no encontrada" });
    }

    res.json(reseñaActualizada);
  } catch (err) {
    res.status(500).json({ error: "Error al actualizar reseña" });
  }
});

// Eliminar una reseña
router.delete("/:id", authenticate, async (req, res) => {
  try {
    const reseñaEliminada = await ModeloReseña.deleteReseña(req.params.id);

    if (!reseñaEliminada) {
      return res.status(404).json({ error: "Reseña no encontrada" });
    }

    res.json({ message: "Reseña eliminada", reseña: reseñaEliminada });
  } catch (err) {
    res.status(500).json({ error: "Error al eliminar reseña" });
  }
});

module.exports = router;
