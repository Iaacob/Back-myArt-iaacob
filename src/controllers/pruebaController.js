import { getConnection, sql, queries } from '../database';


//modularizar para insert Like/Dislike y para update Like/Dislike

export const prueba = async(req, res) => {

    const {Id} = req.params;
    
    try {
        const pool = await getConnection();
        const result = await pool
        .request()
        .input('publicationId', sql.Int, Id)
        .query(queries.prueba)
        res.json(result.recordsets[0]);
    } catch (error) {
        res.status(500);
        res.send(error.msg('Error en el servidor'));
    }

}