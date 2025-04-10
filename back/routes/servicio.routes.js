const { Router } = require("express");
const ModeloServicio = require("../models/servicio.model.js");
const router = Router();
const authenticate = require("../utils/authenticate.js");


// Listar servicios (GET)
//obtener todos los servicios ,
router.get("/", authenticate, async (req, res) => {
  try {
    const usuario = await ModeloUsuario.getUsuarioById(req.user.id_usuario);

    if (usuario.rol !== "admin") {
      return res.status(403).json({ error: "Acceso denegado: no eres administrador" });
    }

    const usuarios = await ModeloUsuario.getUsuarios();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
});

router.get("/", authenticate, async (req, res) => {
  try {
    const servicios = await ModeloServicio.getServiciosByUsuario(req.user.id_usuario);
    res.json(servicios);
  } catch (err) {
    console.error("Error al obtener servicios:", err);
    res.status(500).json({ error: "Error al obtener servicios" });
  }
});

// Publicar servicio (POST)
// Editar servicio (PUT)
// Eliminar servicio (DELETE)

// router.post("/registrar", async (req, res) => {
//   const { nombre,apellido,email, password ,pic_url,rol} = req.body;
//   const hashedPassword = await bcrypt.hash(password, 10);
//   console.log("contraseña hasheada", hashedPassword);
//   ModeloUsuario.createUsuario({ nombre, apellido, email,  password: hashedPassword , pic_url, rol });
//   res.json({ message: "Usuario registrado" });
// });

// router.post("/login", async (req, res) => {
//   const { nombre, password } = req.body;
//   const usuario = await ModeloUsuario.getUsuarioByName(nombre);
//   if (!usuario || !(await bcrypt.compare(password, usuario.password))) {
//     return res.status(401).json({ message: "Credenciales incorrectas" });
//   }
//   const token = jwt.sign(  { id_usuario: usuario.id_usuario }, SECRET_KEY, { expiresIn: "1h" });
//   return res.json({ token });
// });

// router.get("/profile", authenticate, (req, res) => {
//   console.log("req.user", req.user); 
//   res.json({ message: `Hola ${req.user.id_usuario}, esta es tu info secreta` });
// });

module.exports = router;