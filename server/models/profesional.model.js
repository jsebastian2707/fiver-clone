const pool = require('../utils/db.js');

// id_profesinal  es el mismo id_usuario estas relacianadas 1 a 1
const gets = async () => {
  const res = await pool.query('SELECT * FROM profesional');
  return res.rows;
};

const getById = async (id) => {
  const res = await pool.query(`SELECT * FROM profesional WHERE id_profesional = '${id}'`);
  return res.rows[0] || null;
};

const create = async ({id_profesional, descripcion, experiencia, habilidades, calificacion_promedio, suscripcion_premium }) => {
  const res = await pool.query(
    `INSERT INTO profesional (id_profesional, descripcion, experiencia, habilidades, calificacion_promedio, suscripcion_premium)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [id_profesional, descripcion, experiencia, habilidades, calificacion_promedio, suscripcion_premium]
  );
  return res.rows[0];
};

const update = async (id_profesional,{descripcion, experiencia, habilidades, calificacion_promedio, suscripcion_premium }) => {
  const res = await pool.query(
    `UPDATE profesional
     SET descripcion = $1,
         experiencia = $2,
         habilidades = $3,
         calificacion_promedio = $4,
         suscripcion_premium = $5
     WHERE id_profesional = $6
     RETURNING *`,
    [descripcion, experiencia, habilidades, calificacion_promedio, suscripcion_premium, id_profesional]
  );
  return res.rows[0];
};

const remove = async (id_profesional) => {
  const res = await pool.query(
    `DELETE FROM profesional
     WHERE id_profesional = $1
     RETURNING *`,
    [id_profesional]
  );
  return res.rows[0];
};

module.exports = {
  gets,
  getById,
  create,
  update,
  remove
};
