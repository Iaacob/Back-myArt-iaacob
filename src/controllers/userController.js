import { getConnection, sql, queries } from "../database";

//Traer todos los usuarios

export const getUsers = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(queries.getUsers);
    console.log(result);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.msg("Error en el servidor"));
  }
};

//Crear un usuario (register)
export const createUser = async (req, res) => {
  const { name, username, password, mail, premium } = req.body;

  let { lastName, cellphone, description, profilePicture, occupation } =
    req.body;

  let created_at = null;

  let fecha = new Date();
  fecha =
    fecha.getUTCFullYear() +
    "-" +
    ("00" + (fecha.getUTCMonth() + 1)).slice(-2) +
    "-" +
    ("00" + fecha.getUTCDate()).slice(-2) +
    " " +
    ("00" + fecha.getHours()).slice(-2) +
    ":" +
    ("00" + fecha.getUTCMinutes()).slice(-2) +
    ":" +
    ("00" + fecha.getUTCSeconds()).slice(-2);
  created_at = fecha;

  if (lastName == null) {
    lastName = "";
  }
  if (cellphone == null) {
    cellphone = "";
  }

  if (description == null) {
    description = "";
  }
  if (profilePicture == null) {
    profilePicture = "";
  }
  if (occupation == null) {
    occupation = "";
  } else if (
    name == null ||
    username == null ||
    password == null ||
    mail == null ||
    premium == null
  ) {
    return res.status(400).json({ msg: "faltan datos" });
  }

  console.log("estoy aca");

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("name", sql.VarChar(50), name)
      .input("lastName", sql.VarChar(50), lastName)
      .input("username", sql.VarChar(50), username)
      .input("password", sql.VarChar(50), password)
      .input("cellphone", sql.VarChar(50), cellphone)
      .input("mail", sql.VarChar(50), mail)
      .input("description", sql.Text, description)
      .input("profilePicture", sql.VarChar(255), profilePicture)
      .input("created_at", sql.DateTime, created_at)
      .input("premium", sql.Bit, premium)
      .input("occupation", sql.VarChar(50), occupation)
      .query(queries.createUser);
    res.json({
      name,
      lastName,
      username,
      password,
      cellphone,
      mail,
      description,
      profilePicture,
      created_at,
      premium,
      occupation,
    });
  } catch (error) {
    res.status(500);
    res.send(error.msg("Erridor"));
  }
};

//Obtener un usuario

export const getUserById = async (req, res) => {
  const { Id } = req.params;

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("Id", Id)
      .query(queries.getUserById);
    res.send(result.recordset[0]);
  } catch (error) {
    res.status(500);
    console.log(error);
  }
};

//Obtener un usuario por su username

export const getUserByUsername = async (req, res) => {
  const { username } = req.body;

  try {
    const pool = await getConnection();
    console.log("lo que me llego", username);
    const result = await pool
      .request()
      .input("username", sql.VarChar(50), username)
      .query(queries.getUserByUsername);
    res.send(result.recordset[0]);
  } catch (error) {
    res.status(500);
    console.log(error);
  }
};

//Borrar un usuario

export const deleteUser = async (req, res) => {
  const { Id } = req.params;

  try {
    const pool = await getConnection();
    console.log("Estoy en deleteUser");
    const result = await pool
      .request()
      .input("Id", Id)
      .query(queries.deleteUser);

    res.send("Usuario eliminado correctamente");
  } catch (error) {
    res.status(500);
    res.send(error.msg("Error en el servidor"));
  }
};

// Actualizar un Usuario

export const updateUser = async (req, res) => {
  const {
    name,
    lastName,
    username,
    password,
    cellphone,
    mail,
    description,
    profilePicture,
    premium,
    occupation,
  } = req.body;

  const { Id } = req.params;

  if (
    name == null ||
    username == null ||
    password == null ||
    mail == null ||
    premium == null
  ) {
    return res.status(400).json({ msg: "faltan datos" });
  }

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("Id", Id)
      .input("name", sql.VarChar(50), name)
      .input("lastName", sql.VarChar(50), lastName)
      .input("username", sql.VarChar(50), username)
      .input("password", sql.VarChar(50), password)
      .input("cellphone", sql.VarChar(50), cellphone)
      .input("mail", sql.VarChar(50), mail)
      .input("description", sql.Text, description)
      .input("profilePicture", sql.VarChar(255), profilePicture)
      .input("premium", sql.Bit, premium)
      .input("occupation", sql.VarChar(50), occupation)
      .query(queries.updateUser);
    res.json({
      name,
      lastName,
      username,
      password,
      cellphone,
      mail,
      description,
      profilePicture,
      premium,
      occupation,
    });
  } catch (error) {
    res.status(500);
    res.send(error.msg("Error en el servidor"));
  }
};

//login

export const login = async (username, password, res) => {
  let user = null;

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("pUsername", sql.VarChar(50), username)
      .input("pPassword", sql.VarChar(50), password)
      .query(queries.login);
    if (result.recordsets[0].length > 0) {
      user = result.recordsets[0][0];
    } else {
      user = null;
    }
    return user;
  } catch (error) {
    res.status(500);
    console.log(error);
  }
};
