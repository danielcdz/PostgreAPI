const dbconfig = require('./dbconfig')
const Pool = require('pg').Pool
const pool = new Pool(dbconfig.dbconfig)


// INSERTAR ESTUDIANTE
const insertarEstudiante = (request, response) => {
    const { idEstudiante, nombre, apellidos, fechaNacimiento,telefono, correoElectronico} = request.body
    console.log("entra",request.body);
    pool.query('INSERT INTO estudiantes ("idEstudiante", nombre, apellidos, "fechaNacimiento",telefono, "correoElectronico") VALUES ($1, $2, $3,$4, $5, $6)',
    [idEstudiante, nombre, apellidos, fechaNacimiento,telefono, correoElectronico],
      (error, results) => {
      if (error) {
         response.json({ info: 'Error al insertar Estudiante' })
         console.log(error);
      }
      else{
        response.status(201).send(`Estudiante agregado correctamente`)
      }
    })
  }


// INSERTAR CARRERA
const insertarCarrera = (request, response) => {
  const { idCarrera, carrera } = request.body

  pool.query('INSERT INTO public.carrera ("idCarrera", carrera) VALUES ($1, $2)',
  [ idCarrera, carrera],
    (error, results) => {
    if (error) {
       response.json({ info: 'Error al insertar Carrera' })
       console.log(error)
    }
    else{
      response.status(201).send(`Carrera agregada correctamente`)
    }
  })
}

// INSERTAR CITAMATRICULA
const insertarCita = (request, response) => {
  const { idCita,idEstudiante,idCarrera,cita, tiempoSesion} = request.body

  pool.query('INSERT INTO "citaMatricula" ("idCita","idEstudiante","idCarrera",cita, "tiempoSesion") VALUES ($1, $2, $3, $4, $5)',
  [  idCita,idEstudiante,idCarrera,cita, tiempoSesion],
    (error, results) => {
    if (error) {
       response.json({ info: 'Error al insertar Cita de Matricula' })
       console.log(error);
    }
    else{
      response.status(201).send(`Cita de matricula agregada correctamente`)
    }
  })
}

// UPDATE CITAMATRICULA
const updateCita = (request, response) => {
  const { idCita,idEstudiante,idCarrera,cita, tiempoSesion} = request.body

  pool.query('UPDATE  "citaMatricula" SET "idEstudiante"=$1,"idCarrera"=$2,cita=$3, "tiempoSesion"=$4 where "idCita"=$5',
  [  idEstudiante,idCarrera,cita, tiempoSesion,idCita],
    (error, results) => {
    if (error) {
       response.json({ info: 'Error al actualizar Cita de Matricula' })
       console.log(error);
    }
    else{
      response.status(201).send(`Cita de matricula actualizada correctamente`)
    }
  })
}

//DELETE CITAMATRICULA
const deleteCitaMatricula = (request, response) => {
  const {idCita} = request.body

  pool.query('DELETE FROM "citaMatricula" WHERE "idCita" = $1', 
    [parseInt(idCita)], 
    (error, results) => {
    if (error) {
       response.json({ info: 'Error al eliminar Cita' })
    }
    else{
      response.status(200).send(`Cita eliminada. idCita: ${idCita}`)
    }
  })
}

//SELECT Informacion Estudiante
const getInformacionEstudiante = (request, response) => {
  pool.query('SELECT estudiantes."idEstudiante",estudiantes.nombre || estudiantes.apellidos as nombreCompleto, estudiantes."correoElectronico", carrera.carrera,"citaMatricula".cita,"citaMatricula"."tiempoSesion"  FROM estudiantes inner join "citaMatricula" on estudiantes."idEstudiante"="citaMatricula"."idEstudiante" inner join carrera on carrera."idCarrera"="citaMatricula"."idCarrera"',
  (error, results) => {
    if (error) {
       response.json({ info: 'Error: No se encontraron sucursales' })
    }
    else{
        response.status(200).json(results.rows)
    }
  })
}

  module.exports = {
    insertarEstudiante,
    insertarCarrera,
    insertarCita,
    updateCita,
    deleteCitaMatricula,
    getInformacionEstudiante,

  }