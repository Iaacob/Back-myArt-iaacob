import { getConnection, sql, queries } from '../database';


//modularizar para insert Like/Dislike y para update Like/Dislike

export const getLikes = async(req, res) => {
    
    try {
        const pool = await getConnection();
        const result = await pool.request().query(queries.getLikes);
        return res.json(result.recordset);
    } catch (error) {
        return res.send(error.msg('Error en el servidor')).status(500);
    }

}

export const getDislikes = async(req, res) => {

    try {
        const pool = await getConnection();
        const result = await pool.request().query(queries.getDislikes);
        return res.json(result.recordset);
    } catch (error) {
        return res.send(error.msg('Error en el servidor')).status(500);
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
        return res.json(result.recordset);
    } catch (error) {
        return res.send(error.msg('Error en el servidor')).status(500);
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
        return res.json(result.recordset);
    } catch (error) {
        return res.send(error.msg('Error en el servidor')).status(500);
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
        console.log('estoy aca')
        const result = await pool.request()
            .input('fkUser', sql.Int, fkUser)
            .input('fkPublication', sql.Int, fkPublication)
            .input('stateLike', sql.Bit, stateLike)
            .input('stateDislike', sql.Bit, stateDislike)
            .query(queries.insertLikeOrDislike);
        return res.send(`El usuario ${fkUser} le dio like a la publicación ${fkPublication}`);
    } catch (error) {
        return res.send(error.msg(error)).status(500);
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
        return res.send(`El usuario ${fkUser} le dio dislike a la publicación ${fkPublication}`);
    } catch (error) {
        return res.send(error.msg('Error en el servidor')).status(500);
    }
}

export const updateToLike = async(req, res) => {

    const {
        fkUser,
        fkPublication,
    } = req.body;

    const stateLike = true;
    const stateDislike = false;

    console.log('lo que me llego: ',fkUser , fkPublication)

    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('fkUser', sql.Int, fkUser)
            .input('fkPublication', sql.Int, fkPublication)
            .input('stateLike', sql.Bit, stateLike)
            .input('stateDislike', sql.Bit, stateDislike)
            .query(queries.updateLikeOrDislike);
        return res.send(`El usuario ${fkUser} le dio like a la publicación ${fkPublication}`);
    } catch (error) {
        return res.send(error.msg('Error en el servidor')).status(500);
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
        return res.send(`El usuario ${fkUser} le dio dislike a la publicación ${fkPublication}`);
    } catch (error) {
        return res.send(error.msg('Error en el servidor')).status(500);
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
        return res.send(`se elimino la relación de like o dislike del usuario ${fkUser} con la publicación ${fkPublication}`);
    }catch(error){
        return res.send(error.msg('Error en el servidor')).status(500);
    }
}