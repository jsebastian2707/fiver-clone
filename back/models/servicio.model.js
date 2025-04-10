const pool =require('../utils/db.js');

const getServicio = async () => {
  const res = await pool.query('SELECT * FROM "servicio"');
  return res.rows;
};

const getServicioById = async (id) => {
  const res = await pool.query(`SELECT * FROM public."servicio" WHERE id_servicio = '${id}'`);
  return res.rows[0] || null;
};

const getServiciosByUsuario = async (id) => {
  const res = await pool.query(`SELECT * FROM public."servicio" WHERE id_usuario = '${id}'`);
  return res.rows;
};

const createServicio = async ({ id_profesional, titulo, descripcion, precio, tiempo_entrega, estado, destacado }) => {
  const res = await pool.query(
    `INSERT INTO "servicio"(id_profesional, titulo, descripcion, precio, tiempo_entrega, estado, destacado)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [id_profesional, titulo, descripcion, precio, tiempo_entrega, estado, destacado]
  );
  return res.rows[0];
};

const updateServicio = async ({ id_servicio, id_profesional, titulo, descripcion, precio, tiempo_entrega, estado, destacado }) => {
  const res = await pool.query(
    `UPDATE "servicio"
      SET id_profesional = $1,titulo = $2,descripcion = $3,precio = $4,tiempo_entrega = $5,estado = $6,destacado = $7
      WHERE id_servicio = $8
      RETURNING *`,
    [id_profesional, titulo, descripcion, precio, tiempo_entrega, estado, destacado, id_servicio]
  );
  return res.rows[0];
};

const deleteServicio = async (id_servicio) => {
  const res = await pool.query(
    `DELETE FROM "servicio"
      WHERE id_servicio = $1
      RETURNING *`,
    [id_servicio]
  );
  return res.rows[0]; // Devuelve el servicio eliminado
};
  
module.exports = {
  getServicio,
  getServicioById,
  getServiciosByUsuario,
  createServicio,
  updateServicio,
  deleteServicio,
};