const { Pool } = require("pg");
const bcrypt = require('bcryptjs')


const pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "Postgres1234",
    database: "softjobs",
    port: 5432,
    allowExitOnIdle: true
});
const verificarCredenciales = async (email, password) => {
    const values = [email]
    const consulta = "SELECT * FROM usuarios WHERE email = $1"
    try {const { rows: [usuario], rowCount } = await pool.query(consulta, values)
    const { password: passwordEncriptada } = usuario
    const passwordEsCorrecta = bcrypt.compareSync(password, passwordEncriptada)
    if (!passwordEsCorrecta || !rowCount)
    throw { code: 401, message: "Email o contraseña incorrecta" }}
    catch (error) {
        console.error('Error consulta', error)

    }
}

const registrarUsuario = async (usuario) => {
    let {email, password,rol,lenguage } = usuario
    try{ const passwordEncriptada = bcrypt.hashSync(password)
     password = passwordEncriptada
     const values = [email, password,rol,lenguage]
     const consulta = "INSERT INTO usuarios values (DEFAULT, $1, $2, $3, $4)"
     await pool.query(consulta, values)
    }
    catch (error) {
        console.error('Error consulta', error)}
   

    }
    



const deleteUsuario = async (id) => {
    const consulta = "DELETE FROM eventos WHERE id = $1"
    const values = [id]
    const { rowCount } = await pool.query(consulta, values)
    if (!rowCount) throw { code: 404, message: "No se encontró ningún usuario con ese id" }
}

const getUsuario = async(email)=>{
    const values = [email]
     try {const consulta= "SELECT * FROM usuarios WHERE email = $1"
     const {rows:usuario} = await pool.query(consulta,values );
     return (usuario);
}  catch (error) {
    console.error('Error consulta', error)}

}
module.exports={verificarCredenciales,registrarUsuario, deleteUsuario,getUsuario}