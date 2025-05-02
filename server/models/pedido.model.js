const pool = require('../utils/db.js');

const getPedidos = async () => {
  const res = await pool.query('SELECT * FROM "pedido"');
  return res.rows;
};

const getPedidoById = async (id_pedido) => {
  const res = await pool.query(
    `SELECT * FROM "pedido" WHERE id_pedido = $1`,
    [id_pedido]
  );
  return res.rows[0] || null;
};

const getPedidosByCliente = async (id_cliente) => {
  const res = await pool.query(
    `SELECT * FROM "pedido" WHERE id_cliente = $1`,
    [id_cliente]
  );
  return res.rows;
};

const createPedido = async ({ id_servicio, id_cliente, fecha_contratacion, estado, archivo_entrega }) => {
  const res = await pool.query(
    `INSERT INTO "pedido" (id_servicio, id_cliente, fecha_contratacion, estado, archivo_entrega)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [id_servicio, id_cliente, fecha_contratacion, estado, archivo_entrega]
  );
  return res.rows[0];
};

const updatePedido = async ({ id_pedido, id_servicio, id_cliente, fecha_contratacion, estado, archivo_entrega }) => {
  const res = await pool.query(
    `UPDATE "pedido"
     SET id_servicio = $1,
         id_cliente = $2,
         fecha_contratacion = $3,
         estado = $4,
         archivo_entrega = $5
     WHERE id_pedido = $6
     RETURNING *`,
    [id_servicio, id_cliente, fecha_contratacion, estado, archivo_entrega, id_pedido]
  );
  return res.rows[0];
};

const deletePedido = async (id_pedido) => {
  const res = await pool.query(
    `DELETE FROM "pedido"
     WHERE id_pedido = $1
     RETURNING *`,
    [id_pedido]
  );
  return res.rows[0]; // returns the deleted pedido
};

module.exports = {
  getPedidos,
  getPedidoById,
  getPedidosByCliente,
  createPedido,
  updatePedido,
  deletePedido,
};
