const { Router } = require("express");
const router = Router();
const ModeloPedido = require("../models/pedido.model.js");

// Obtener todos los pedidos
router.get("/", async (req, res) => {
  try {
    const pedidos = await ModeloPedido.getPedidos();
    res.json(pedidos);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener los pedidos" });
  }
});

// Obtener un pedido por ID
router.get("/:id", async (req, res) => {
  try {
    const pedido = await ModeloPedido.getPedidoById(req.params.id);
    if (!pedido) return res.status(404).json({ error: "Pedido no encontrado" });
    res.json(pedido);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener el pedido" });
  }
});

// Obtener pedidos por cliente
router.get("/cliente/:id_cliente", async (req, res) => {
  try {
    const pedidos = await ModeloPedido.getPedidosByCliente(req.params.id_cliente);
    res.json(pedidos);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener pedidos del cliente" });
  }
});

// Crear un pedido
router.post("/", async (req, res) => {
  try {
    const nuevoPedido = await ModeloPedido.createPedido(req.body);
    res.status(201).json(nuevoPedido);
  } catch (err) {
    res.status(500).json({ error: "Error al crear el pedido" });
  }
});

// Actualizar un pedido
router.put("/:id", async (req, res) => {
  try {
    const pedidoActualizado = await ModeloPedido.updatePedido({
      ...req.body,
      id_pedido: req.params.id
    });
    if (!pedidoActualizado) return res.status(404).json({ error: "Pedido no encontrado" });
    res.json(pedidoActualizado);
  } catch (err) {
    res.status(500).json({ error: "Error al actualizar el pedido" });
  }
});

// Eliminar un pedido
router.delete("/:id", async (req, res) => {
  try {
    const pedidoEliminado = await ModeloPedido.deletePedido(req.params.id);
    if (!pedidoEliminado) return res.status(404).json({ error: "Pedido no encontrado" });
    res.json({ message: "Pedido eliminado", pedido: pedidoEliminado });
  } catch (err) {
    res.status(500).json({ error: "Error al eliminar el pedido" });
  }
});

module.exports = router;
