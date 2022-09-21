import { getConnection, sql, queries } from "../database";

//Traer todos los comentarios

export const getAllComments = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(queries.getComments);
    console.log(result);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    console.log(error);
    res.send("Error en el servidor");
  }
};

//traer un comentario por id del usuario

export const getCommentByUserId = async (req, res) => {
  const { fkUser } = req.params;

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("fkUser", fkUser)
      .query(queries.getCommentsByUserId);
    res.send(result.recordset);
  } catch (error) {
    res.status(500);
    console.log(error);
  }
};

//traer comentarios por id de la publicacion

export const getCommentsByPublicationId = async (req, res) => {
  const { fkPublication } = req.params;

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("fkPublication", fkPublication)
      .query(queries.getCommentsByPublicationId);
    res.send(result.recordset);
  } catch (error) {
    res.status(500);
    console.log(error);
  }
};

//crear un comentario

export const createComment = async (req, res) => {
  const { fkUser, fkPublication, text } = req.body;

  let created_at = null;

  let fecha = new Date();
  fecha =
    fecha.getUTCFullYear() +
    "-" +
    ("00" + (fecha.getUTCMonth() + 1)).slice(-2) +
    "-" +
    ("00" + fecha.getUTCDate()).slice(-2) +
    " " +
    ("00" + (fecha.getUTCHours() - 6)).slice(-2) +
    ":" +
    ("00" + fecha.getUTCMinutes()).slice(-2) +
    ":" +
    ("00" + fecha.getUTCSeconds()).slice(-2);

  created_at = fecha;

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("text", text)
      .input("fkUser", fkUser)
      .input("fkPublication", fkPublication)
      .input("created_at", created_at)
      .query(queries.createComment);
    res.json({ text, fkUser, fkPublication, created_at });
  } catch (error) {
    res.status(500);
    console.log(error);
  }
};

export const deleteComment = async (req, res) => {
  const { Id } = req.params;

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("Id", Id)
      .query(queries.deleteComment);
    res.send("Comentario eliminado correctamente");
  } catch (error) {
    res.status(500);
    console.log(error);
  }
};

export const deleteCommentsByUserId = async (req, res) => {
  const { fkUser } = req.params;

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("fkUser", fkUser)
      .query(queries.deleteCommentsByUserId);
    res.send("Comentario/s eliminados correctamente");
  } catch (error) {
    res.status(500);
    console.log(error);
  }
};

export const deleteCommentsByPublicationId = async (req, res) => {
  const { fkPublication } = req.params;

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("fkPublication", fkPublication)
      .query(queries.deleteCommentsByPublicationId);
    res.send("Comentario/s eliminados correctamente");
  } catch (error) {
    res.status(500);
    console.log(error);
  }
};
