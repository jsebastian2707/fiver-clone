const { Router } = require("express");
const router = Router();
const ModeloProfesional = require('../models/profesional.model');
const authenticate = require("../utils/authenticate.js");

// Obtener todos los profesionales
router.get('/', authenticate, async (req, res) => {
  try {
    const profesionales = await ModeloProfesional.gets();
    res.json(profesionales);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los profesionales', error });
  }
});

// Obtener un profesional por ID
router.get('/:id', authenticate, async (req, res) => {
  try {
    const profesional = await ModeloProfesional.getById(req.params.id);
    if (!profesional) {
      return res.status(404).json({ message: 'Profesional no encontrado' });
    }
    res.json(profesional);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el profesional', error });
  }
});

// Crear un nuevo profesional
router.post('/', async (req, res) => {
  try {
    const profesional = await ModeloProfesional.create(req.body);
    res.json(profesional);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear el profesional', error });
  }
});

// Actualizar un profesional por ID
router.put('/:id', async (req, res) => {
  try {
    const profesional = await ModeloProfesional.update(req.params.id, req.body);
    if (!profesional) {
      return res.status(404).json({ message: 'Profesional no encontrado' });
    }
    res.json(profesional);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar el profesional', error });
  }
});

// Eliminar un profesional por ID
router.delete('/:id', async (req, res) => {
  try {
    const profesional = await ModeloProfesional.remove(req.params.id);
    if (!profesional) {
      return res.status(404).json({ message: 'Profesional no encontrado' });
    }
    res.json({ message: 'Profesional eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el profesional', error });
  }
});

module.exports = router;