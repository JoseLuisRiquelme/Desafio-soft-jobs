const express=require('express')
const app = express()
const cors = require('cors')
const jwt = require("jsonwebtoken")
const {verificarCredenciales,registrarUsuario,deleteUsuario,getUsuario} = require('./consultas')

app.listen(3000, console.log('SERVER ON'))
app.use(cors())
app.use(express.json())

app.post("/login", async (req, res) => {
    try {
    const { email, password } = req.body
    await verificarCredenciales(email, password)
    const token = jwt.sign({ email }, "az_AZ", {expiresIn: "7d"})
    res.send(token)
    } catch (error) {
    console.log(error)
    res.status(error.code || 500).send(error)
    }
    })
 app.post("/usuarios", async (req, res) => {
      
     const usuario = req.body
     await registrarUsuario(usuario)
     res.send("Usuario creado con éxito")
 })

app.delete("/usuarios/:id", async (req, res) => {
    try {
    const{id}= req.params
    const Authorization = req.header("Authorization")
    const token = Authorization.split("Bearer ")[1]
    jwt.verify(token, "az_AZ")
   const { email } = jwt.decode(token)
   await deleteUsuario(id)
   res.send(`El usuario ${email} ha eliminado al usuario de ID ${id}`)
     } catch (error) {
     res.status(error.code || 500).send(error)
     }
    })
  app.get("/usuarios", async (req, res) => {
      const Authorization = req.header("Authorization")
      const token = Authorization.split(" ")[1];
      console.log(token)
      if (!token) {
          return res.status(401).json({ error: "Token no proporcionado" });
        }
      
      try {
        jwt.verify(token, "az_AZ"); 
        const { email } = jwt.decode(token);
        const usuario =await getUsuario(email)
        res.json(usuario) 
      }catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener los datos del usuario" });
        }
      });

        

