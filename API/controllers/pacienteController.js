// Importamos el modelo paciente para guardar los datos la database
const Paciente = require("../models/Paciente");

// Cuando se crea un nuevo cliente
exports.nuevoCliente = async (req, res, next) => {
	// Creamos un nuevo objeto paciente con los datos de la consulta
	const paciente = new Paciente(req.body);

	try {
		await paciente.save();
		res.json({ mensaje: "El paciente se agrego correctamente" });
	} catch (error) {
		// Mostramos el error por consola y luego saltamos a la siguiente funcion
		console.log(error);
		next();
	}
};

// Obtener pacientes
exports.obtenerPacientes = async (req, res, next) => {
	try {
		const pacientes = await Paciente.find({});
		res.json(pacientes);
	} catch (error) {
		console.log(error);
		next();
	}
};

// Obtener paciente por id
exports.obtenerPaciente = async (req, res, next) => {
	try {
		const paciente = await Paciente.findById(req.params.id);
		res.json(paciente);
	} catch (error) {
		console.log(error);
		next();
	}
};

// Actualizar paciente
exports.actualizarPaciente = async (req, res, next) => {
	try {
		const paciente = await Paciente.findOneAndUpdate(
			{ _id: req.params.id },
			req.body,
			{
				new: true,
			}
		);
		res.json(paciente);
	} catch (error) {
		console.log(error);
		next();
	}
};

// Eliminar paciente
exports.eliminarPaciente = async (req, res, next) => {
	try {
		await Paciente.findOneAndDelete({ _id: req.params.id });
		res.json({ mensaje: "El paciente fue eliminado correctamente" });
	} catch (error) {
		console.log(error);
		next();
	}
};
