const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Configurar la aplicación Express
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Importar y usar rutas
const productosRuta = require('./rutas/info');
app.use('/productos', productosRuta);

// Definir el puerto
const PORT = process.env.PORT || 3000;

// Crear y arrancar el servidor HTTP
app.listen(PORT, () => {
  console.log(`Servidor HTTP en ejecución en http://localhost:${PORT}`);
});
