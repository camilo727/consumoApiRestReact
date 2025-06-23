import React, { useState } from "react";
import {
  getCategorias,
  addCategorias,
  deleteCategorias,
  editCategorias
} from "../service/ApiRestFestch";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
export async function loader() {
  let datos = await getCategorias();
  return datos;
}

const Home = () => {
  const navigate = useNavigate();
  const [descripcion, setDescripcion] = useState("");
  const [nombre, setNombre] = useState("");
  const [acciones, setAcciones] = useState(1);
  const [accionesId, setAccionesId] = useState();
  const datos = useLoaderData();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (nombre == 0 || nombre == "") {
      Swal.fire({
        icon: "error",
        title: "Ups",
        text: "El campo nombre está vacío",
      });
      setNombre("");
      return;
    }
    if (descripcion == 0 || descripcion == "") {
      Swal.fire({
        icon: "error",
        title: "Ups",
        text: "El campo nombre está vacío",
      });
      setDescripcion("");
      return;
    }
    if (acciones == 1) {
       await addCategorias({ nombre: nombre, descripcion: descripcion });
        Swal.fire({
          icon: "success",
          title: "Ok",
          text: "Se creó el registro exitosamente",
        });
        navigate();
    }
    if (acciones == 2) {
       await editCategorias({ nombre: nombre, descripcion: descripcion }, accionesId);
        Swal.fire({
          icon: 'info',
          title: 'Ok',
          text: "Se modificó el registro exitosamente"
        }); 
        navigate();
    }
  };

  const dentroEliminar = async (id) => {
    try {
      await deleteCategorias(id);
      Swal.fire({
        icon: "success",
        title: "Ok",
        text: "Se eliminó el registro exitosamente",
      });
      navigate();
    } catch (error) {
      return Swal.fire({
        icon: "error",
        title: "Ops",
        text: "No es posible eliminar el registro en este momento" + error,
      });
    }
  }
 
  const handleEditar=async (modulo)=>
    {
        setAcciones(2);
        setAccionesId(modulo.id);
        setNombre(modulo.nombre);
        setDescripcion(modulo.descripcion);
        document.getElementById("my_modal_3").showModal();
        
    }
  const handleEliminar = (id) => {
    Swal.fire({
      title: "¿Realmente desea eliminar este registro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "NO",
      confirmButtonText: "SI",
    }).then((result) => {
      if (result.isConfirmed) {
        dentroEliminar(id);
      }
    });
  };

  return (
    <>
      <center>
        {/* You can open the modal using document.getElementById('ID').showModal() method */}
        <button
          className="btn btn-primary"
          onClick={() => document.getElementById("my_modal_3").showModal()}
        >
          Agregar
        </button>
      </center>
      <br />
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        {Object.values(datos).length == 0 ? (
          <div className="table-responsive">
            <div className="alert alert-warning">No hay registros</div>
          </div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Modificar/Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {datos.map((dato) => (
                <tr key={dato.id}>
                  <td>{dato.id}</td>
                  <td>{dato.nombre}</td>
                  <td>{dato.descripcion}</td>
                  <td>
                    <Link
                      to="#"
                      className="btn btn-error"
                      onClick={() => {
                        handleEliminar(dato.id);
                      }}
                    >
                      Eliminar
                    </Link>
                    &nbsp;&nbsp;
                    <Link
                      to="#"
                      className="btn btn-success"
                      onClick={() => {
                       handleEditar(dato);
                      }}
                    >
                      Modificar
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Categoria</h3>
          <div className="flex w-full">
            <div className="card bg-base-300 rounded-box grid h-50 grow place-items-center">
              <form onSubmit={handleSubmit}>
                <label className="floating-label">
                  <input
                    type="text"
                    placeholder="Nombre"
                    className="input input-md"
                    value={nombre}
                    onChange={(e) => {
                      setNombre(e.target.value);
                    }}
                  />
                  <span>Nombre</span>
                </label>
                <br />
                <label className="floating-label">
                  <input
                    type="text"
                    placeholder="Descripcion"
                    className="input input-md"
                    value={descripcion}
                    onChange={(e) => {
                      setDescripcion(e.target.value);
                    }}
                  />
                  <span>Descripcion</span>
                </label>
                <br />
                <button type="submit" className="btn btn-accent">
                  Agregar
                </button>
              </form>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Home;
