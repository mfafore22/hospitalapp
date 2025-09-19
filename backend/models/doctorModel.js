import sql from '../db/index.js';

export const getDoctors = async () => {
  return await sql`SELECT * FROM doctors ORDER BY id`;
};

export const addDoctor = async (name, available) => {
  return await sql`INSERT INTO doctors (name, available) VALUES (${name}, ${available}) RETURNING *`;
};
