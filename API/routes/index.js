// Importarmos express para usar su metodo Router
const express = require('express');
const router = express.Router();

// controladores
const pacienteController = require('../controllers/pacienteController');

// Lo exportamos para importarlo dentro de nuestro archivo principal
module.exports = function () {
    // Agrega nuevos pacientes via POST
    router.post('/pacientes', pacienteController.nuevoCliente);

    // Obtener todas las entradas guardadas en paciente
    router.get('/pacientes', pacienteController.obtenerPacientes);

    // Obtener un paciente en especifico por id
    router.get('/pacientes/:id', pacienteController.obtenerPaciente);

    // actualizar paciente por id
    router.put('/pacientes/:id', pacienteController.actualizarPaciente);

    // Eliminar un paciente por su id
    router.delete('/pacientes/:id', pacienteController.eliminarPaciente);
    
    // Retornamos router para poder usar todos las rutas en otros archivos
    return router;
};
