import { useContext, useState, useEffect } from "react";
import Context from "../Context";
import axios from "axios";

export default function Perfil() {
   const { setUsuario: setUsuarioGlobal } = useContext(Context);
   const [usuario, setUsuarioLocal] = useState({});
   const getUsuarioData = async () => {
   const urlServer = "http://localhost:3000";
   const endpoint = "/usuarios";
   const token = localStorage.getItem("token");
   

   
     try { const { data } = await axios.get(urlServer + endpoint, {
        headers: { Authorization: "Bearer " + token },
      });
      setUsuarioGlobal(data);
      setUsuarioLocal(data);
    }catch (error) {
      console.error('Error en función asíncrona:', error);
    }}
    ;

  useEffect(() => {
    getUsuarioData();   
  },[]);

  useEffect(() => {
  }, [usuario]);
  
  return (
    <div className="py-5">
      <h1>
        
        Bienvenido <span className="fw-bold">{usuario[0]?.email}</span>
      </h1>
      <h3>
        {usuario[0]?.rol} en {usuario[0]?.lenguage}
      </h3>
    </div>
  );
}
