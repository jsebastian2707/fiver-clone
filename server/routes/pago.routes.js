const { Router } = require("express");
const router = Router();
const ModeloPago = require("../models/pago.model");

// Obtener todos los pagos
router.get("/", async (req, res) => {
  try {
    const pagos = await ModeloPago.getPagos();
    res.json(pagos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los pagos" });
  }
});

// Obtener un pago por ID
router.get("/:id", async (req, res) => {
  try {
    const pago = await ModeloPago.getPagoById(req.params.id);
    if (!pago) return res.status(404).json({ error: "Pago no encontrado" });
    res.json(pago);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el pago" });
  }
});

// Crear un nuevo pago
router.post("/", async (req, res) => {
  try {
    const nuevoPago = await ModeloPago.createPago(req.body);
    res.status(201).json(nuevoPago);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el pago" });
  }
});

// Actualizar un pago
router.put("/:id", async (req, res) => {
  try {
    const pagoActualizado = await ModeloPago.updatePago(req.params.id, req.body);
    res.json(pagoActualizado);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el pago" });
  }
});

// Eliminar un pago
router.delete("/:id", async (req, res) => {
  try {
    await ModeloPago.deletePago(req.params.id);
    res.json({ message: "Pago eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el pago" });
  }
});

module.exports = router;
