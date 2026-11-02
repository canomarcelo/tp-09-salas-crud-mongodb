const mongoose = require("mongoose");
const { Reserva } = require("../modelos/reserva");

function representarReserva(documento) {
  const reserva = {
    id: documento._id.toString(),
    estudiante: documento.estudiante,
    email: documento.email,
    sala: documento.sala,
    fecha: documento.fecha,
    turno: documento.turno,
    personas: documento.personas,
    estado: documento.estado,
  };

  return reserva;
}

function comprobarId(id) { // nuevo TP9
  
  if (!mongoose.isObjectIdOrHexString(id)) {
    const error = new Error("Identificador inválido");
    error.codigo = "ID_INVALIDO";
    throw error;
  }
}

function CrearServicioReservasMongo() {
  async function listar(sala) {
    const filtro = {};
    if (sala !== undefined) {
      if (typeof sala !== "string" || !sala.trim()) {
        const error = new Error("Sala inválida");
        error.codigo = "FILTRO_INVALIDO";
        throw error;
      }

      filtro.sala = sala.trim();
    }

    const documentos = await Reserva.find(filtro).lean();
    return documentos.map(representarReserva);
  } // Fin de listar

  async function obtenerReservaPorId(id) {
    if (!mongoose.isObjectIdOrHexString(id)) {
      const error = new Error("Identificador inválido");
      error.codigo = "ID_INVALIDO";
      throw error;
    }
    const documento = await Reserva.findById(id).lean();
    return documento ? representarReserva(documento) : null;
  } // fin de obtenerReservaPorId

  async function crear(datos) {
    const newDocumento = await Reserva.create({
      estudiante: datos.estudiante,
      email: datos.email,
      sala: datos.sala,
      fecha: datos.fecha,
      turno: datos.turno,
      personas: datos.personas,
    });
    return representarReserva(newDocumento);
  } // fin de crear



async function reemplazar(id, datos) { // nuevo TP9
  
  comprobarId(id);

  const reemplazo = {

    estudiante: datos.estudiante,
    email: datos.email,
    sala: datos.sala,
    fecha: datos.fecha,
    turno: datos.turno,
    personas: datos.personas,
    estado: datos.estado
  
  };
  
  const documento = await Reserva.findOneAndReplace({ _id: id }, reemplazo, { runValidators: true, returnDocument: "after", upsert: false });

  return documento ? representarReserva(documento) : null;
  
} // fin de reemplazar



async function actualizar(id, datos) { // nuevo TP9
 
  comprobarId(id);
  const cambios = {};
 
  for (const campo of ["personas", "estado"]) {
    if (Object.hasOwn(datos, campo)) cambios[campo] = datos[campo];
  }

  if (Object.keys(cambios).length === 0) {
    const error = new Error("Actualización vacía");
    error.codigo = "ENTRADA_INVALIDA";
    throw error;
  }

  const documento = await Reserva.findOneAndUpdate({ _id: id }, { $set: cambios }, { runValidators: true, returnDocument: "after", upsert: false },);
  return documento ? representarReserva(documento) : null;
}// fin de actualizar 


async function eliminar(id) { // nuevo TP9
  comprobarId(id);
  const resultado = await Reserva.deleteOne({ _id: id });
  return resultado.deletedCount === 1;
}





  return { listar, obtenerReservaPorId, crear, eliminar, reemplazar, actualizar };
}

module.exports = { CrearServicioReservasMongo };
