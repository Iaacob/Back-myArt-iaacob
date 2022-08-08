import sql from 'mssql'

const dbSetting = {
        user: "Valenn",
        password: "Contraseña",
        server: "192.168.0.130",
        database: "MyArtBD",
        options: {
            encrypt: true, // for azure
            trustServerCertificate: true // change to true for local dev / self-signed certs
        }
    }
    //server: localhost
    //user de casa: Valen
    //contraseña de casa: contraseña
    //cambiar datos dependiendo de la compu ACORDATE DE PONER EL PORT EN 1433
    /*crear el usuario en la BD con los datos de arriba, entrar a server roles y darle a sysadmin para que este permitido. Por ultimo logearse desde 0 con ese usuario*/ 
export async function getConnection() {
    try {
        const pool = await sql.connect(dbSetting);
        return pool;
    } catch (error) {
        console.log(error)
    }
}

export { sql };