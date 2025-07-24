const express = require('express');
const { ref, set, push, get, update, remove, child } = require('firebase/database');
const database = require('../config/firebase');

const router = express.Router();

// Ruta de prueba para comprobar que el backend está activo
router.get('/status', (req, res) => {
    res.json({ message: 'TPV Backend activo' });
});

// Obtener todos los productos
router.get('/', async (req, res) => {
    try {
        // Usando child para acceder a la ruta 'productos'
        // const productosRef = ref(database, 'productos');
        // const snapshot = await get(productosRef);

        // Alternativamente, puedes usar get(child(ref(database), 'productos'))
        const snapshot = await get(child(ref(database), 'productos'));

        if (snapshot.exists()) {
            const data = snapshot.val();
            // Convertir el objeto a un array
            const productos = Object.entries(data).map(([id, value]) => ({
                id,
                ...value,
            }));
            res.json(productos);
        } else {
            res.json([]);
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});

// Agregar un nuevo producto
router.post('/', async (req, res) => {
    try{
        const nuevoProducto = req.body;

        const productosRef = ref(database, 'productos');
        const nuevoRef = await push(productosRef, nuevoProducto);
        
        res.status(201).json({ id: nuevoRef.key, ...nuevoProducto });
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar el producto' });
    }
})

// Actualizar un producto existente
router.put('/:id', async (req, res) => {
    const productoId = req.params.id;
    const productoActualizado = req.body;

    try {
        const productoRef = ref(database, `productos/${productoId}`);
        await update(productoRef, productoActualizado);
        res.json({ message: 'Producto actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el producto' });
    }
})

// Eliminar un producto
router.delete('/:id', async (req, res) => {
    const productoId = req.params.id;

    try {
        const productoRef = ref(database, `productos/${productoId}`);
        await remove(productoRef);
        res.json({ message: 'Producto eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el producto' });
    }
})

module.exports = router;
// Este código define las rutas para manejar productos en una aplicación Express.