import React, { useState, useEffect } from "react"
import { useForm } from "react-hook-form";
import axios from "axios"

function App() {
  const [Usuario, setUsuario] = useState([]);
  const { register, handleSubmit,reset  } = useForm();

  useEffect(() => {
    axios.get("http://localhost:3000/Usuario")
      .then(response => setUsuario(response.data))
  }, []);

  const onSubmit = data => {
    fetch('http://localhost:3000/Usuario2', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify(data),
    })
       .then(response => {
         if (!response.ok) {
           alert('La red no es adecuada');
         }
         return response.json();
       })
       .then(newUsuario => {
         setUsuario([...Usuario, newUsuario]);
         reset();
       })
       .catch((error) => {
         console.error('Error:', error);
       });
   };
  
  return (
    <>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Nombre:
          <input {...register("nombre", { required: true })} />
        </label>
        <label>
          Edad:
          <input {...register("edad", { required: true })} />
        </label>
        <input type="submit" value="Enviar" />
      </form>

      <div>
        <table>

          <thead>
            <tr>
              <th>Nombre</th>
              <th>edad</th>
            </tr>
          </thead>

          <tbody>
            {Usuario.map((item, key) => {
              return (
                <tr key={key}>
                  <td>{item.nombre}</td>
                  <td>{item.edad}</td>
                </tr>
              )
            })}
          </tbody>

        </table>

      </div>
    </>
  )
}

export default App
