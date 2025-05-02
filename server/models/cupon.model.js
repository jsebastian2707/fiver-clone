const pool =require('../utils/db.js');

const getCupon = async () => {
  const res = await pool.query('SELECT * FROM "cupones"');
  return res.rows;
};

const getCanjeado = async (id_cupon) => {
  const res = await pool.query(`SELECT * FROM public."cupones" WHERE id_cupon = '${id}'`);
  return res.rows[0] || null;
};



const createCupon = async ({ id_cupon, canjeado }) => {
    const res = await pool.query(
      `INSERT INTO "cupon"(id_cupon, canjeado)
       VALUES ($1, $2)
       RETURNING *`,
      [id_cupon, canjeado]
    );
    return res.rows[0];
  };
  
  
  const updateCupon = async ({ id_cupon, canjeado }) => {
    const res = await pool.query(
      `UPDATE "cupon"
       SET canjeado = $2
       WHERE id_cupon = $1
       RETURNING *`,
      [id_cupon, canjeado]
    );
    return res.rows[0];
  };
  
  const deleteCupon = async (id_cupon) => {
    const res = await pool.query(
      `DELETE FROM "cupon"
       WHERE id_cupon = $1
       RETURNING *`,
      [id_cupon]
    );
    return res.rows[0];
  };
  
module.exports = {
createCupon,
deleteCupon,
updateCupon,
getCanjeado,
getCupon,
};  
