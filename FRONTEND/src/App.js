import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import clienteAxios from "./config/Axios.js";

// Componentes
import Pacientes from "./components/Pacientes";
import NuevaCita from "./components/NuevaCita";
import Cita from "./components/Cita";

function App() {
	//  state de la app
	const [citas, guardarCitas] = useState([]);
	const [consultar, guardarConsulta] = useState(true);

	useEffect(() => {
		if(consultar) {
			const consultarAPI = () => {
				clienteAxios
					.get("/pacientes")
					.then((respuesta) => {
						// Colocar en el state del resultado
						guardarCitas(respuesta.data);

						// deshabilitar la consulta
						guardarConsulta(false);
					})
					.catch((e) => console.log(e));
			};
			consultarAPI();
		}
	}, [consultar ]);

	return (
		<Router>
			<Switch>
				<Route exact path="/" component={() => <Pacientes citas={citas} />} />
			</Switch>

			<Switch>
				<Route exact path="/nueva" component={() => <NuevaCita guardarConsulta={guardarConsulta}/>} />
			</Switch>

			<Switch>
				<Route 
					exact 
					path="/cita/:id" 
					render={(props)=> {
						const cita = citas.filter(cita => cita._id === props.match.params.id );
						console.log(cita);

						return (
							<Cita 
								cita={cita[0]}
								guardarConsulta={guardarConsulta}
							/>
						)
					}} />
			</Switch>
		</Router>
	);
}

export default App;
