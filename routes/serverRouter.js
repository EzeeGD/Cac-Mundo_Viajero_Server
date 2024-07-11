const express = require('express');
const router = express.Router();
const db = require('../db/db'); // Importa la conexión a MySQL desde db.js

// Middleware para procesar JSON
router.use(express.json());

// GET /api/paquetes/saludo
router.get("/saludo", (req, res) => {
    res.json({ mensaje: "Hola mundo!" });
});

// GET /api/paquetes/list
router.get("/list", (req, res) => {
    const sql = `
        SELECT paquete.idPaquete, destinos.nameDestino, destinos.descripcionDestino, destinos.imagen, hoteles.nombreHoteles, hoteles.estrellas, paquete.precioPaquete, paquete.cantDias
        FROM paquete
        JOIN destinos ON paquete.destino_ID = destinos.iddestinos
        JOIN hoteles ON paquete.hotel_ID = hoteles.idHoteles
    `;
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error al obtener paquetes de la base de datos" });
        }
        res.json(results);
    });
});

// GET /api/paquetes/:idPaquete
router.get("/:idPaquete", (req, res) => {
    const paqueteId = req.params.idPaquete;
    const sql = `
        SELECT paquete.idPaquete, destinos.nameDestino, destinos.descripcionDestino, destinos.imagen, hoteles.nombreHoteles, hoteles.estrellas, paquete.precioPaquete, paquete.cantDias
        FROM paquete
        JOIN destinos ON paquete.Destino_ID = destinos.iddestinos
        JOIN hoteles ON paquete.hotel_ID = hoteles.idHoteles
        WHERE paquete.idPaquete = ?
    `;
    db.query(sql, [paqueteId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error al obtener paquete de la base de datos" });
        }
        if (results.length === 0) {
            return res.status(404).json({ mensaje: "Paquete no encontrado" });
        }
        res.json(results[0]);
    });
});

// POST /api/paquetes
router.post("/", (req, res) => {
    const { destino_ID, hotel_ID, precioPaquete, cantDias } = req.body;
    const sql = 'INSERT INTO paquete (destino_ID, hotel_ID, precioPaquete, cantDias) VALUES (?, ?, ?, ?)';
    db.query(sql, [destino_ID, hotel_ID, precioPaquete, cantDias], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error al crear nuevo paquete en la base de datos" });
        }
        const nuevoPaquete = {
            idPaquete: results.insertId,
            destino_ID,
            hotel_ID,
            precioPaquete,
            cantDias
        };
        res.status(201).json({
            mensaje: "Paquete creado correctamente",
            paquete: nuevoPaquete
        });
    })
});

// PUT /api/paquetes/:idPaquete
router.put("/:idPaquete", (req, res) => {
    const paqueteId = req.params.idPaquete;
    const { Destino_ID, hotel_ID, precioPaquete, cantDias } = req.body;
    const sql = 'UPDATE paquete SET Destino_ID=?, hotel_ID=?, precioPaquete=?, cantDias=? WHERE idPaquete=?';
    db.query(sql, [Destino_ID, hotel_ID, precioPaquete, cantDias, paqueteId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error al actualizar paquete en la base de datos" });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ mensaje: "Paquete no encontrado" });
        }
        res.json({
            mensaje: "Paquete actualizado correctamente",
            paquete: {
                idPaquete: paqueteId,
                Destino_ID,
                hotel_ID,
                precioPaquete,
                cantDias
            }
        });
    });
});

// DELETE /api/paquetes/:idPaquete
router.delete("/:idPaquete", (req, res) => {
    const paqueteId = req.params.idPaquete;
    const sql = 'DELETE FROM paquete WHERE idPaquete = ?';
    db.query(sql, [paqueteId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error al eliminar paquete de la base de datos" });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ mensaje: "Paquete no encontrado" });
        }
        res.json({
            mensaje: "Paquete eliminado correctamente",
            paquete: { idPaquete: paqueteId }
        });
    });
});

module.exports = router;



// const express = require('express');
// const router = express.Router();
// const db = require('../db/db'); // Importa la conexión a MySQL desde db.js

// // Middleware para procesar JSON
// router.use(express.json());

// // GET /api/destinos/saludo
// router.get("/saludo", (req, res) => {
//     res.json({ mensaje: "Hola mundo!" });
// });

// // GET /api/destinos/list
// router.get("/list", (req, res) => {
//     const sql = 'SELECT * FROM destinos';
//     db.query(sql, (err, results) => {
//         if (err) {
//             return res.status(500).json({ error: "Error al obtener destinos de la base de datos" });
//         }
//         res.json(results);
//     });
// });

// // GET /api/destinos/:iddestinos
// router.get("/:iddestinos", (req, res) => {
//     const destinoId = req.params.iddestinos;
//     const sql = 'SELECT * FROM destinos WHERE iddestinos = ?';
//     db.query(sql, [destinoId], (err, results) => {
//         if (err) {
//             return res.status(500).json({ error: "Error al obtener destino de la base de datos" });
//         }
//         if (results.length === 0) {
//             return res.status(404).json({ mensaje: "Destino no encontrado" });
//         }
//         res.json(results[0]);
//     });
// });

// // POST /api/destinos
// router.post("/", (req, res) => {
//     const { nameDestino, descripcionDestino, imagen } = req.body;
//     const sql = 'INSERT INTO destinos (nameDestino, descripcionDestino, imagen) VALUES (?, ?, ?)';
//     db.query(sql, [nameDestino, descripcionDestino, imagen], (err, results) => {
//         if (err) {
//             return res.status(500).json({ error: "Error al crear nuevo destino en la base de datos" });
//         }
//         const nuevoDestino = {
//             iddestinos: results.insertId,
//             nameDestino,
//             descripcionDestino,
//             imagen
//         };
//         res.status(201).json({
//             mensaje: "Destino creado correctamente",
//             destino: nuevoDestino
//         });
//     });
// });

// // PUT /api/destinos/:id
// router.put("/:id", (req, res) => {
//     const destinoId = req.params.id;
//     const { nameDestino, descripcionDestino, imagen } = req.body;
//     const sql = 'UPDATE destinos SET nameDestino=?, descripcionDestino=?, imagen=? WHERE iddestinos=?';
//     db.query(sql, [nameDestino, descripcionDestino, imagen, destinoId], (err, results) => {
//         if (err) {
//             return res.status(500).json({ error: "Error al actualizar destino en la base de datos" });
//         }
//         if (results.affectedRows === 0) {
//             return res.status(404).json({ mensaje: "Destino no encontrado" });
//         }
//         res.json({
//             mensaje: "Destino actualizado correctamente",
//             destino: {
//                 iddestinos: destinoId,
//                 nameDestino,
//                 descripcionDestino,
//                 imagen
//             }
//         });
//     });
// });

// // DELETE /api/destinos/:id
// router.delete("/:id", (req, res) => {
//     const destinoId = req.params.id;
//     const sql = 'DELETE FROM destinos WHERE iddestinos = ?';
//     db.query(sql, [destinoId], (err, results) => {
//         if (err) {
//             return res.status(500).json({ error: "Error al eliminar destino de la base de datos" });
//         }
//         if (results.affectedRows === 0) {
//             return res.status(404).json({ mensaje: "Destino no encontrado" });
//         }
//         res.json({
//             mensaje: "Destino eliminado correctamente",
//             destino: { iddestinos: destinoId }
//         });
//     });
// });

// module.exports = router;
