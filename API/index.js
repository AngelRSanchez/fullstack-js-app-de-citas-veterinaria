// Importar express
const express = require('express');
// importar mongoose
const mongoose = require('mongoose');
// Importamos las rutas
const routes = require('./routes');
// Importar body-parser
const bodyParser = require('body-parser');
// CORS
const cors = require('cors');
// Puerto || port
const port = process.env.PORT || 4000;

// Inicializar express
const app = express();

// Hablitar cors (Acess-control-allow-origin)
const whiteList = ['http://localhost:3000'];
const corsOptions = {
    origin: (origin, callback) => {
        const existe = whiteList.some(dominio => dominio === origin);
        if(existe) {
            callback(null, true);
        } else {
            callback(new Error('No puede acceder por cors'));
        }
    }
}

// app.use(cors(corsOptions));
app.use(cors());

// Conectar con la database
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/veterinaria', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});

// Habilitar body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Habilitar routing
app.use('/', routes());

// Establecer servidor
app.listen(port, () => console.log(`Corriendo servidor en el puerto ${port}`));
