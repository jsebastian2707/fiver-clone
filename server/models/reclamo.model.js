const pool =require('../utils/db.js');

const getReclamo = async () => {
  const res = await pool.query('SELECT * FROM "reclamaciones"');
  return res.rows;
};

const getReclamoByIdPedido = async (id) => {
  const res = await pool.query(`SELECT * FROM public."reclamo" WHERE id_pedido = '${id}'`);
  return res.rows[0] || null;
};


const createReclamo = async ({ id_pedido, reclamo, resuelto}) => {
  const res = await pool.query(
    `INSERT INTO "reclamaciones"(id_pedido, reclamo, resuelto)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [id_pedido, reclamo, resuelto]
  );
  return res.rows[0];
};

const updateReclamo = async ({ id_pedido, reclamo, resuelto,id_reclamacion }) => {
  const res = await pool.query(
    `UPDATE "reclamo"
      SET id_pedido = $1,reclamo = $2,resuelto = $3,
      WHERE id_reclamacion = $4
      RETURNING *`,
    [id_pedido, reclamo, resuelto, id_reclamacion]
  );
  return res.rows[0];
};

const deleteReclamo = async (id_reclamacion) => {
  const res = await pool.query(
    `DELETE FROM "reclamo"
      WHERE id_reclamacion = $1
      RETURNING *`,
    [id_reclamacion]
  );
  return res.rows[0]; // Devuelve el servicio eliminado
};
  
module.exports = {
createReclamo,
updateReclamo,
deleteReclamo,
getReclamo,
getReclamoByIdPedido,
};  
