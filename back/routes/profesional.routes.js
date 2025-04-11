const { Router } = require("express");
const router = Router();
const ModeloProfesional = require('../models/profesional.model');
const authenticate = require("../utils/authenticate.js");

// Obtener todos los profesionales
router.get('/', authenticate, async (req, res) => {
  try {
    const profesionales = await ModeloProfesional.find();
    res.json(profesionales);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los profesionales', error });
  }
});

// Obtener un profesional por ID
router.get('/:id', authenticate, async (req, res) => {
  try {
    const profesional = await ModeloProfesional.findById(req.params.id);
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
    const nuevoProfesional = new Profesional(req.body);
    const profesionalGuardado = await nuevoProfesional.save();
    res.status(201).json(profesionalGuardado);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear el profesional', error });
  }
});

// Actualizar un profesional por ID
router.put('/:id', async (req, res) => {
  try {
    const profesionalActualizado = await Profesional.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!profesionalActualizado) {
      return res.status(404).json({ message: 'Profesional no encontrado' });
    }
    res.json(profesionalActualizado);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar el profesional', error });
  }
});

// Eliminar un profesional por ID
router.delete('/:id', async (req, res) => {
  try {
    const profesionalEliminado = await Profesional.findByIdAndDelete(req.params.id);
    if (!profesionalEliminado) {
      return res.status(404).json({ message: 'Profesional no encontrado' });
    }
    res.json({ message: 'Profesional eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el profesional', error });
  }
});

module.exports = router;