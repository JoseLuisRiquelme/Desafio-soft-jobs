import { useState, useContext } from "react";
import Context from "../Context";
import { useNavigate } from "react-router-dom";

import axios from "axios";

export default function RegistroForm() {
  const { setUsuario } = useContext(Context);
  const navigate = useNavigate();
  const [usuario, setUsuarioLocal] = useState({
    email:"",
    password:""
  });

  const handleSetUsuario = ({ target: { value, name } }) => {
    const field = {};
    field[name] = value;
    setUsuarioLocal({ ...usuario, ...field });
  };

  const iniciarSesion = async () => {
    try {const urlServer = "http://localhost:3000";
    const endpoint = "/login";
    const { email, password } = usuario;
      if (!usuario.email || !usuario.password) return alert("Email y password obligatorias");
      const { data: token } = await axios.post(urlServer + endpoint, usuario);
      alert("Usuario identificado con éxito 😀");
      localStorage.setItem("token", token);
      setUsuario(usuario)
      navigate("/perfil")}
      catch (error) {
        console.error('Error en la solicitud HTTP:', error.message);;
   
  }};

  return (
    <div className="col-10 col-sm-6 col-md-3 m-auto mt-5">
      <h1>Iniciar Sesión</h1>
      <hr />
      <div className="form-group mt-1 ">
        <label>Email address</label>
        <input
          value={usuario.email}
          onChange={handleSetUsuario}
          type="email"
          name="email"
          className="form-control"
          placeholder="Enter email"
        />
      </div>
      <div className="form-group mt-1 ">
        <label>Password</label>
        <input
          value={usuario.password}
          onChange={handleSetUsuario}
          type="password"
          name="password"
          className="form-control"
          placeholder="Password"
        />
      </div>

      <button onClick={iniciarSesion} className="btn btn-light mt-3">
        Iniciar Sesión
      </button>
    </div>
  );
}
