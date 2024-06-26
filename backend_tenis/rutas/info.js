const express = require('express');
const router = express.Router();
const db = require('./db'); // Importa tu configuración de la base de datos

router.get('/productos', (req, res) => {
    const query = 'SELECT * FROM PRODUCTOS';
    db.query(query, (error, results) => {
        if (error) {
            console.error('Error al ejecutar la consulta:', error);
            res.status(500).send('Error en el servidor');
        } else {
            res.json(results);
        }
    });
});

module.exports = router;
