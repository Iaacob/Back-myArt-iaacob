import { getConnection, sql, queries } from '../database';


//modularizar para insert Like/Dislike y para update Like/Dislike

export const getLikes = async(req, res) => {
    
    try {
        const pool = await getConnection();
        const result = await pool.request().query(queries.getLikes);
        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.msg('Error en el servidor'));
    }

}

export const getDislikes = async(req, res) => {

    try {
        const pool = await getConnection();
        const result = await pool.request().query(queries.getDislikes);
        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.msg('Error en el servidor'));
    }

}

//obtener likes del usuario

export const getLikesfromUser = async(req, res) => {

    const {username, password} = req.body
    
    try {
        const pool = await getConnection();
        const result = await pool.request()
                        .input('username',sql.VarChar(50), username)
                        .input('password',sql.VarChar(50), password)
                        .query(queries.getLikesFromUser);
        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.msg('Easgfasdfl servidor'));
    }
}

//obtener dislikes del usuario

export const getDislikesfromUser = async(req, res) => {

    const {username, password} = req.body
    
    try {
        const pool = await getConnection();
        const result = await pool.request()
                        .input('username',sql.VarChar(50), username)
                        .input('password',sql.VarChar(50), password)
                        .query(queries.getDislikesFromUser);
        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.msg('Easgfasdfl servidor'));
    }
}

export const insertLike = async(req, res) => {

    const {
        fkUser,
        fkPublication,
    } = req.body;

    const stateLike = true;
    const stateDislike = false;
    
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('fkUser', sql.Int, fkUser)
            .input('fkPublication', sql.Int, fkPublication)
            .input('stateLike', sql.Bit, stateLike)
            .input('stateDislike', sql.Bit, stateDislike)
            .query(queries.insertLikeOrDislike);
        res.send(`El usuario ${fkUser} le dio like a la publicación ${fkPublication}`);
    } catch (error) {
        res.status(500);
        res.send(error.msg('Error en el servidor'));
    }
}

export const insertDisLike = async(req, res) => {

    const {
        fkUser,
        fkPublication,
    } = req.body;

    const stateLike = false;
    const stateDislike = true;
    
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('fkUser', sql.Int, fkUser)
            .input('fkPublication', sql.Int, fkPublication)
            .input('stateLike', sql.Bit, stateLike)
            .input('stateDislike', sql.Bit, stateDislike)
            .query(queries.insertLikeOrDislike);
        res.send(`El usuario ${fkUser} le dio dislike a la publicación ${fkPublication}`);
    } catch (error) {
        res.status(500);
        res.send(error.msg('Error en el servidor'));
    }
}

export const updateToLike = async(req, res) => {

    const {
        fkUser,
        fkPublication,
    } = req.body;

    const stateLike = true;
    const stateDislike = false;

    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('fkUser', sql.Int, fkUser)
            .input('fkPublication', sql.Int, fkPublication)
            .input('stateLike', sql.Bit, stateLike)
            .input('stateDislike', sql.Bit, stateDislike)
            .query(queries.updateLikeOrDislike);
        res.send(`El usuario ${fkUser} le dio like a la publicación ${fkPublication}`);
    } catch (error) {
        res.status(500);
        res.send(error.msg('Error en el servidor'));
    }
}

export const updateToDislike = async(req, res) => {

    const {
        fkUser,
        fkPublication,
    } = req.body;

    const stateLike = false;
    const stateDislike = true;

    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('fkUser', sql.Int, fkUser)
            .input('fkPublication', sql.Int, fkPublication)
            .input('stateLike', sql.Bit, stateLike)
            .input('stateDislike', sql.Bit, stateDislike)
            .query(queries.updateLikeOrDislike);
        res.send(`El usuario ${fkUser} le dio dislike a la publicación ${fkPublication}`);
    } catch (error) {
        res.status(500);
        res.send(error.msg('Error en el servidor'));
    }
}

export const deleteLike = async(req, res) => {
    
    const {
        fkUser,
        fkPublication
    } = req.body;

    try{
        const pool = await getConnection();
        const result = await pool.request()
            .input('fkUser', sql.Int, fkUser)
            .input('fkPublication', sql.Int, fkPublication)
            .query(queries.deleteLikeOrDislike);
        res.send(`se elimino la relación de like o dislike del usuario ${fkUser} con la publicación ${fkPublication}`);
    }catch(error){
        res.status(500);
        res.send(error.msg('Error en el servidor'));
    }
}