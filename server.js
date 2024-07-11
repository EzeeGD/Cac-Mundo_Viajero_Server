// server.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const serverRouter = require('./routes/serverRouter'); // Importa las rutas de serverRouter.js

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Rutas
app.use('/api/paquetes', serverRouter); // Define las rutas en /api/destinos

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto http://localhost:${PORT}`);
});
