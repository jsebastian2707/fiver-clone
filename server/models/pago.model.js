const pool = require('../utils/db.js');


const getPagos = async () => {
  const res = await pool.query('SELECT * FROM "pago"');
  return res.rows;
};


const getPagoByIdPedido = async (id) => {
  const res = await pool.query(`SELECT * FROM public."pago" WHERE id_pedido = $1`, [id]);
  return res.rows[0] || null;
};


const createPago = async ({ id_pedido, monto, fecha_pago, metodo_pago, estado }) => {
  const res = await pool.query(
    `INSERT INTO "pago" (id_pedido, monto, fecha_pago, metodo_pago, estado)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [id_pedido, monto, fecha_pago, metodo_pago, estado]
  );
  return res.rows[0];
};


const updatePago = async ({ id_pago, id_pedido, monto, fecha_pago, metodo_pago, estado }) => {
  const res = await pool.query(
    `UPDATE "pago"
      SET id_pedido = $1, monto = $2, fecha_pago = $3, metodo_pago = $4, estado = $5
      WHERE id_pago = $6
      RETURNING *`,
    [id_pedido, monto, fecha_pago, metodo_pago, estado, id_pago]
  );
  return res.rows[0];
};

const deletePago = async (id_pago) => {
  const res = await pool.query(
    `DELETE FROM "pago"
      WHERE id_pago = $1
      RETURNING *`,
    [id_pago]
  );
  return res.rows[0]; // Devuelve el pago eliminado
};

module.exports = {
  getPagos,
  getPagoByIdPedido,
  createPago,
  updatePago,
  deletePago,
};
