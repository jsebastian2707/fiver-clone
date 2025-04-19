const pool =require('../utils/db.js');

const getUsuarios = async () => {
  const res = await pool.query('SELECT * FROM "Usuario"');
  return res.rows;
};

const getUsuarioByName = async (nombre) => {
  const res = await pool.query(`SELECT * FROM public."Usuario" WHERE nombre = '${nombre}'`);
  return res.rows[0] || null;
};

const getUsuarioById = async (id) => {
  const res = await pool.query(`SELECT * FROM public."Usuario" WHERE id_usuario = '${id}'`);
  return res.rows[0] || null;
};

const createUsuario = async ({ nombre, apellido, email, password, pic_url, rol }) => {
  const res = await pool.query(
    `INSERT INTO "Usuario"(nombre, apellido, email, password, pic_url, rol)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [nombre, apellido, email, password, pic_url, rol]
  );
  return res.rows[0];
};

module.exports = {
  getUsuarios,
  getUsuarioById,
  getUsuarioByName,
  createUsuario,
};