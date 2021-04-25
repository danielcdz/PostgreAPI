const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./consultas')
const port = 5000


app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/', (request, response) => { 
    response.json({ info: 'Node.js, Express, and Postgres API' }) 
})


// Insertar
app.post('/Estudiantes',db.insertarEstudiante)
app.post('/Carreras',db.insertarCarrera)
app.post('/Citas',db.insertarCita)

//actualizar
app.post('/CitasUpdate',db.updateCita)

//Eliminar
app.post('/CitasDelete',db.deleteCitaMatricula)

//Informacion Estudiante
app.get('/GetEstudiante', db.getInformacionEstudiante)


app.listen(port, () => { 
    console.log(`App running on port ${port}.`)
})