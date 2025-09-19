import sql from "../db";

export const getPatients = async () => {
    return await sql`SELECT * FROM patients ORDER BY id`;

};

export const addPatient = async(name) => {
    return await sql`INSERT INTO patients (name) VALUES (${name}) RETURNING *`;
}